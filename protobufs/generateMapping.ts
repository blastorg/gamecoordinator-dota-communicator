 import fs from "fs";
import * as protobufs from "./generated/protoc";
import { makeFirstLetterLower } from "./util/makeFirstLetterLower";

// Constants
const ENUMS_TO_SEARCH = ["EDOTAGCMsg", "EGCBaseClientMsg", "ESOMsg", "EGCBaseMsg"];
const SPACING = "  ";

// Enum for message sender
enum MessageSender {
  UNSUPPORTED,
  CLIENT,
  GC,
}

// Interface for overrides
interface Overrides {
  [key: string]: {
    CMsg?: string;
    sender?: MessageSender;
  };
}

// Overrides map
const OVERRIDES: Overrides = {
  "ESOMsg.k_ESOMsg_Create": { CMsg: "CMsgSOSingleObject" },
  "ESOMsg.k_ESOMsg_Destroy": { CMsg: "CMsgSOSingleObject" },
  "ESOMsg.k_ESOMsg_UpdateMultiple": { CMsg: "CMsgSOMultipleObjects" },
  "EGCBaseClientMsg.k_EMsgGCClientConnectionStatus": { sender: MessageSender.GC },
  "EGCBaseClientMsg.k_EMsgGCClientWelcome": { sender: MessageSender.GC },
  "EDOTAGCMsg.k_EMsgClientToGCGetProfileCardResponse": { CMsg: "CMsgDOTAProfileCard" },
};

type MatchingProtobuf = {
  kMsg: string;
  CMsg?: string;
  sender: MessageSender;
  isBuffer?: boolean;
};

// Function to determine message sender
export const getMessageSender = (messageName: string): MessageSender => {
  const name = messageName.replace(/^k_EMsg/, "").replace(/^DOTA/, "");

  if (name.startsWith("SQL")) return MessageSender.UNSUPPORTED;
  if (name.includes("ClientToGC")) return name.endsWith("Response") ? MessageSender.GC : MessageSender.CLIENT;
  if (/GCResponseTo|GCRequestTo|GCToGC|^Server|^Gameserver|ServerToGC|GCToServer|GC_GameServer/.test(name))
    return MessageSender.UNSUPPORTED;
  if (name.includes("GCToClient")) return MessageSender.GC;
  if (name.includes("SignOut")) return MessageSender.UNSUPPORTED;
  if (name.endsWith("Request")) return MessageSender.CLIENT;
  if (name.endsWith("Response")) return MessageSender.GC;
  if (name.startsWith("GC")) return MessageSender.CLIENT;
  return MessageSender.CLIENT;
};

// Generator function to guess CMsg names
export const guessCMsg = function* (protobufName: string, messageName: string) {
  const _guessCMsg = function* (messageName: string): Generator<string> {
    const name = messageName.replace(/^k_EMsg/, "").replace(/^GC/, "");
    yield name;
    yield name.replace(/^k_ESOMsg_/, "");
    yield "GC" + name;
    const responseToResult = name.replace(/Response/g, "Result");
    yield responseToResult;
    yield "GC" + responseToResult;
    yield name.replace(/DOTA/g, "");
    yield name.replace(/GCToClient|ClientToGC/g, "DOTA");
    yield name.replace(/GCToClient/g, "").replace(/ClientToGC/g, "");
    yield "DOTA" + name;
    yield name.replace(/Client/, "");
    yield name.replace(/Server/, "");
  };

  for (const message of _guessCMsg(messageName)) {
    yield "CMsg" + message;
    if (protobufName === "EGCBaseClientMessage") yield "CGCMsg" + message;
    if (protobufName === "ESOMsg") yield "CMsgSO" + message;
  }
};
export const createConst = (output: string[], name: string, toWrite: string[], typeSuffix?: string) => {
  output.push(`export const ${name}${typeSuffix ? `: ${typeSuffix}` : ""} = {`);
  output.push(...toWrite.map((line, idx) => `${SPACING + line}${idx === toWrite.length - 1 ? "" : ","}`));
  output.push("};");
  output.push(`Object.freeze(${name});`);
  output.push(""); // Add a newline after each constant for clarity
};

// Function to find CMsg
export const findCMsg = (protobufName: string, messageName: string) => {
  let sender: MessageSender | undefined;
  let CMsg: unknown;
  const override = OVERRIDES[protobufName + "." + messageName];

  if (override) {
    if (override.CMsg) CMsg = protobufs[override.CMsg as keyof typeof protobufs];
    if (override.sender) sender = override.sender;
    if (override.CMsg && !CMsg)
      throw new Error(`Invalid override for message: ${messageName}. ${override.CMsg} does not exist`);
  }

  if (!sender) sender = getMessageSender(messageName);
  if (sender === MessageSender.UNSUPPORTED) {
    console.debug("Skipping message %s as message sender is UNSUPPORTED", messageName);
    return;
  }

  if (override?.CMsg) return { CMsg, CMsgName: override.CMsg, sender };

  for (const CMsgName of guessCMsg(protobufName, messageName)) {
    // console.debug("Searching protos for %s", CMsgName);
    CMsg = protobufs[CMsgName as keyof typeof protobufs];
    if (CMsg) return { CMsg, CMsgName, sender };
  }
  return { sender };
};

// Generator function to find matching protos
export const findMatchingProtos = function* (): Generator<MatchingProtobuf> {
  for (const protobufName of ENUMS_TO_SEARCH) {
    const protobuf = protobufs[protobufName as keyof typeof protobufs];
    for (const messageName of Object.keys(protobuf).splice(Object.keys(protobuf).length / 2)) {
      const CMsg = findCMsg(protobufName, messageName);
      if (CMsg) {
        console.debug("Found CMsg %s for %s", CMsg.CMsgName, messageName);
        yield { kMsg: protobufName + "." + messageName, CMsg: CMsg.CMsgName, sender: CMsg.sender };
      } else {
        console.debug("No CMsg found for %s", messageName);
      }
    }
  }
};

function getCleanedProtos(protos: MatchingProtobuf[], sender: MessageSender) {
  return Object.values(
    protos
      .filter((proto) => proto.sender === sender && (proto.sender === MessageSender.GC || !!proto.CMsg))
      .reduce(
        (acc, curr) => {
          const kmsgParsed = makeFirstLetterLower(
            curr.kMsg.split(".")[1]?.replace(/k_EMsg(GC)?|ClientToGC/g, "") || "",
          );

          const body = { ...curr, kmsgParsed };

          if (!acc[curr.kMsg] || curr.CMsg) {
            acc[curr.kMsg] = body;
          }

          return acc;
        },
        {} as Record<string, MatchingProtobuf & { kmsgParsed: string }>,
      ),
  ).sort((a, b) => a.kmsgParsed.localeCompare(b.kmsgParsed));
}

function writeProtobufExports(
  protobufs: MatchingProtobuf[],
  sender: MessageSender,
  filePath: string,
  objectName: string,
) {
  const toRunThrough = getCleanedProtos(protobufs, sender);
  fs.writeFileSync(
    filePath,
    "/* eslint-disable @typescript-eslint/no-unused-vars */\n import * as protobufs from './protoc';\n",
    "utf8",
  ); // Start with a clean file
  const output: string[] = [];

  if (sender === MessageSender.GC) {
    output.push(`const EmptyProtobuf = {
      encode(_: null) {
        return null;
      },
    };`);
  }
  createConst(
    output,
    objectName,
    toRunThrough.map(({ kMsg, CMsg }) => `[protobufs.${kMsg}]: ${CMsg ? `protobufs.${CMsg}` : "EmptyProtobuf"}`),
  );
  createConst(
    output,
    `${objectName}Names`,
    toRunThrough.map(({ kmsgParsed, CMsg }) => `${kmsgParsed}: ${CMsg ? `protobufs.${CMsg}` : "EmptyProtobuf"}`),
  );
  createConst(
    output,
    `${objectName}Mapping`,
    toRunThrough.map(({ kMsg, kmsgParsed }) => `${kmsgParsed}: protobufs.${kMsg}`),
  );
  createConst(
    output,
    `${objectName}ReversedMapping`,
    toRunThrough.map(({ kMsg, kmsgParsed }) => `[protobufs.${kMsg}]: '${kmsgParsed}'`),
    `Record<number, keyof typeof ${objectName}Mapping>`,
  );

  fs.appendFileSync(filePath, output.join("\n") + "\n", "utf8");

  fs.close;
}

// Main function
const main = async () => {
  const protos = [...findMatchingProtos()];
  writeProtobufExports(protos, MessageSender.CLIENT, __dirname + "/generated/ClientProtobufs.ts", "ClientProtobufs");
  writeProtobufExports(protos, MessageSender.GC, __dirname + "/generated/GCProtobufs.ts", "GCProtobufs");
};

if (require.main === module) {
  main();
}
