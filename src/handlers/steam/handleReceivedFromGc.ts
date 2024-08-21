import ByteBuffer from "bytebuffer";
import { GCProtobufs, GCProtobufsReversedMapping } from "../../../protobufs/generated/GCProtobufs";
import { Dota } from "../../Dota";
import { config } from "../../config";

export function handleReceivedFromGc(this: Dota) {
  this.steam.on("receivedFromGC", (appid, msgType: number, payload) => {
    if (appid !== config.appId) {
      return;
    }
    const convertedToName = GCProtobufsReversedMapping[msgType];
    const protobuf = GCProtobufs[msgType as keyof typeof GCProtobufs];
    if (!protobuf || !convertedToName) {
      this.customEvents.emit("debug", `No route available for GC message: ${msgType}`);
      return;
    }
    if ("decode" in protobuf === false) {
      this.gcEvents.emit(convertedToName, {
        data: null,
        buffer: ByteBuffer.wrap(payload, ByteBuffer.LITTLE_ENDIAN),
      });
      this.customEvents.emit("debug", `No route available for GC message: ${msgType}`);
      return;
    }
    this.customEvents.emit("debug", `Received GC message ${msgType} (${convertedToName})`);
    const data = protobuf.decode(payload);
    this.gcEvents.emit(convertedToName, {
      data,
      buffer: ByteBuffer.wrap(payload, ByteBuffer.LITTLE_ENDIAN),
    });
  });
}
