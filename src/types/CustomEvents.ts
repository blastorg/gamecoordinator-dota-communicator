import { GCConnectionStatus } from "../../protobufs/generated/protoc";

export type CustomEvents = {
  connectedToGc: () => void;
  disconnectedFromGC: (status?: GCConnectionStatus) => void;
  debug: (message: string, ...args: unknown[]) => void;
};
