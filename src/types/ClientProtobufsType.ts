import { ClientProtobufs, ClientProtobufsNames } from "../../protobufs/generated/ClientProtobufs";

export type ClientProtobufsType = typeof ClientProtobufs;
export type ClientProtobufsEventType = keyof ClientProtobufsType;
export type ClientProtobufsPayloadType<T extends ClientProtobufsEventType> = ClientProtobufsType[T];

export type ClientProtobufsNamedType = typeof ClientProtobufsNames;
export type ClientProtobufsNamedEventType = keyof ClientProtobufsNamedType;
export type ClientProtobufsNamedPayloadType<T extends ClientProtobufsNamedEventType> = ClientProtobufsNamedType[T];
