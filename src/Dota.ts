import ByteBuffer from "bytebuffer";
import EventEmitter from "events";
import SteamUser from "steam-user";
import TypedEmitter from "typed-emitter";
import { ClientProtobufs, ClientProtobufsMapping } from "../protobufs/generated/ClientProtobufs";
import { StateTracking } from "./StateTracking";
import { config } from "./config";
import { handleClientWelcome } from "./handlers/gc/handleClientWelcome";
import { handleConnectionStatus } from "./handlers/gc/handleConnectionStatus";
import { handleAppLaunched } from "./handlers/steam/handleAppLaunched";
import { handleAppQuit } from "./handlers/steam/handleAppQuit";
import { handleDisconnected } from "./handlers/steam/handleDisconnected";
import { handleError } from "./handlers/steam/handleError";
import { handleReceivedFromGc } from "./handlers/steam/handleReceivedFromGc";
import { getMatchDetails } from "./methods/getMatchDetails";
import { getProfileCard } from "./methods/getProfileCard";
import {
  ClientProtobufsEventType,
  ClientProtobufsNamedEventType,
  ClientProtobufsNamedType,
} from "./types/ClientProtobufsType";
import { CustomEvents } from "./types/CustomEvents";
import { HandlerRoutes } from "./types/GcProtobufsType";
import { DeepPartial } from "./types/deepPartial";

export class Dota {
  // Instances
  public steam: SteamUser;
  private state = new StateTracking();

  // Events
  public gcEvents = new EventEmitter() as TypedEmitter<HandlerRoutes>;
  public customEvents = new EventEmitter() as TypedEmitter<CustomEvents>;

  // Custom methods
  public getMatchDetails = getMatchDetails;
  public getProfileCard = getProfileCard;

  // State
  public haveGCSession = false;
  public inGame = false;

  constructor(steam: SteamUser) {
    if (steam.packageName !== "steam-user" || !("packageVersion" in steam) || !steam.constructor) {
      throw new Error("Dota2 requires an instance of steam-user");
    } else {
      const [major, minor] = steam.packageVersion.split(".");
      if (Number(major) < 5 || Number(minor) < 0) {
        throw new Error(
          `Please use steam-user version 5 or higher. ${steam.constructor.name} v${steam.packageVersion} given.`,
        );
      }
    }

    this.steam = steam;

    this.startSteamEvents();
    this.startGcEvents();
  }

  private startGcEvents() {
    handleClientWelcome.call(this, this.state);
    handleConnectionStatus.call(this, this.state);
  }
  private startSteamEvents() {
    handleReceivedFromGc.call(this);
    handleAppQuit.call(this, this.state);
    handleAppLaunched.call(this, this.state);
    handleDisconnected.call(this, this.state);
    handleError.call(this, this.state);
  }

  // Send a message to the Game Coordinator
  public send<T extends ClientProtobufsNamedEventType>(
    messageId: T,
    body: Parameters<ClientProtobufsNamedType[T]["encode"]>[0],
  ): void {
    const message = ClientProtobufsMapping[messageId];
    const protobuf = ClientProtobufs[message as keyof typeof ClientProtobufs];

    if (!protobuf) {
      throw new Error(`Unable to find protobuf for message: ${messageId}`);
    }

    // @ts-expect-error - Typescript doesn't like this, but it's correct
    const buffer = Buffer.from(protobuf.encode(body).finish());
    return this.sendRawBuffer(message, buffer);
  }

  // Send a partial message to the Game Coordinator
  public sendPartial<T extends ClientProtobufsNamedEventType>(
    messageId: T,
    body: DeepPartial<Parameters<ClientProtobufsNamedType[T]["encode"]>[0]>,
  ): void {
    const message = ClientProtobufsMapping[messageId] as ClientProtobufsEventType;

    const protobuf = ClientProtobufs[message];
    if (!protobuf) {
      throw new Error(`Unable to find protobuf for message: ${messageId}`);
    }
    // @ts-expect-error - Typescript doesn't like this, but it's correct
    const buffer = Buffer.from(protobuf.encode(protobuf.fromPartial(body)).finish());
    return this.sendRawBuffer(message, buffer);
  }

  // Send a raw buffer to the Game Coordinator
  public sendRawBuffer(messageId: number, body: Buffer | ByteBuffer): void {
    if (!this) {
      throw new Error("Not connected to Steam network");
    }
    this.customEvents.emit("debug", `Sending GC message ${messageId}`);
    if (body instanceof ByteBuffer) {
      body = body.flip().toBuffer();
    }
    this.steam.sendToGC(config.appId, messageId, {}, body);
  }
}
