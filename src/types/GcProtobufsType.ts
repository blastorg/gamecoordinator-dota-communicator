import { GCProtobufs, GCProtobufsNames } from "../../protobufs/generated/GCProtobufs";
import ByteBuffer from "bytebuffer";

export type GcToClientProtobufsType = typeof GCProtobufs;
export type GcToClientEventType = keyof GcToClientProtobufsType;
export type GcToClientProtobufsPayloadType<T extends GcToClientEventType> = GcToClientProtobufsType[T];

export type GcToClientProtobufsNames = typeof GCProtobufsNames;
export type GcToClientProtobufsNamedEventType = keyof GcToClientProtobufsNames;
export type GcToClientProtobufsNamedPayloadType<T extends GcToClientProtobufsNamedEventType> =
  GcToClientProtobufsNames[T];

export type HandlerRoutes = {
  [K in GcToClientProtobufsNamedEventType]?: (payload: {
    data: Parameters<GcToClientProtobufsNames[K]["encode"]>[0];
    buffer: ByteBuffer;
  }) => void;
};
