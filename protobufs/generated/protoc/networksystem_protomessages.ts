// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.1
//   protoc               v5.26.1
// source: networksystem_protomessages.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface NetMessageSplitscreenUserChanged {
  slot?: number | undefined;
}

export interface NetMessageConnectionClosed {
  reason?: number | undefined;
  message?: string | undefined;
}

export interface NetMessageConnectionCrashed {
  reason?: number | undefined;
  message?: string | undefined;
}

export interface NetMessagePacketStart {
}

export interface NetMessagePacketEnd {
}

function createBaseNetMessageSplitscreenUserChanged(): NetMessageSplitscreenUserChanged {
  return { slot: 0 };
}

export const NetMessageSplitscreenUserChanged = {
  encode(message: NetMessageSplitscreenUserChanged, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slot !== undefined && message.slot !== 0) {
      writer.uint32(8).uint32(message.slot);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetMessageSplitscreenUserChanged {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetMessageSplitscreenUserChanged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.slot = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NetMessageSplitscreenUserChanged {
    return { slot: isSet(object.slot) ? globalThis.Number(object.slot) : 0 };
  },

  toJSON(message: NetMessageSplitscreenUserChanged): unknown {
    const obj: any = {};
    if (message.slot !== undefined && message.slot !== 0) {
      obj.slot = Math.round(message.slot);
    }
    return obj;
  },

  create(base?: DeepPartial<NetMessageSplitscreenUserChanged>): NetMessageSplitscreenUserChanged {
    return NetMessageSplitscreenUserChanged.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NetMessageSplitscreenUserChanged>): NetMessageSplitscreenUserChanged {
    const message = createBaseNetMessageSplitscreenUserChanged();
    message.slot = object.slot ?? 0;
    return message;
  },
};

function createBaseNetMessageConnectionClosed(): NetMessageConnectionClosed {
  return { reason: 0, message: "" };
}

export const NetMessageConnectionClosed = {
  encode(message: NetMessageConnectionClosed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reason !== undefined && message.reason !== 0) {
      writer.uint32(8).uint32(message.reason);
    }
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetMessageConnectionClosed {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetMessageConnectionClosed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.reason = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NetMessageConnectionClosed {
    return {
      reason: isSet(object.reason) ? globalThis.Number(object.reason) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: NetMessageConnectionClosed): unknown {
    const obj: any = {};
    if (message.reason !== undefined && message.reason !== 0) {
      obj.reason = Math.round(message.reason);
    }
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create(base?: DeepPartial<NetMessageConnectionClosed>): NetMessageConnectionClosed {
    return NetMessageConnectionClosed.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NetMessageConnectionClosed>): NetMessageConnectionClosed {
    const message = createBaseNetMessageConnectionClosed();
    message.reason = object.reason ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseNetMessageConnectionCrashed(): NetMessageConnectionCrashed {
  return { reason: 0, message: "" };
}

export const NetMessageConnectionCrashed = {
  encode(message: NetMessageConnectionCrashed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reason !== undefined && message.reason !== 0) {
      writer.uint32(8).uint32(message.reason);
    }
    if (message.message !== undefined && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetMessageConnectionCrashed {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetMessageConnectionCrashed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.reason = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NetMessageConnectionCrashed {
    return {
      reason: isSet(object.reason) ? globalThis.Number(object.reason) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: NetMessageConnectionCrashed): unknown {
    const obj: any = {};
    if (message.reason !== undefined && message.reason !== 0) {
      obj.reason = Math.round(message.reason);
    }
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create(base?: DeepPartial<NetMessageConnectionCrashed>): NetMessageConnectionCrashed {
    return NetMessageConnectionCrashed.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<NetMessageConnectionCrashed>): NetMessageConnectionCrashed {
    const message = createBaseNetMessageConnectionCrashed();
    message.reason = object.reason ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseNetMessagePacketStart(): NetMessagePacketStart {
  return {};
}

export const NetMessagePacketStart = {
  encode(_: NetMessagePacketStart, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetMessagePacketStart {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetMessagePacketStart();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): NetMessagePacketStart {
    return {};
  },

  toJSON(_: NetMessagePacketStart): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<NetMessagePacketStart>): NetMessagePacketStart {
    return NetMessagePacketStart.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<NetMessagePacketStart>): NetMessagePacketStart {
    const message = createBaseNetMessagePacketStart();
    return message;
  },
};

function createBaseNetMessagePacketEnd(): NetMessagePacketEnd {
  return {};
}

export const NetMessagePacketEnd = {
  encode(_: NetMessagePacketEnd, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NetMessagePacketEnd {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetMessagePacketEnd();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): NetMessagePacketEnd {
    return {};
  },

  toJSON(_: NetMessagePacketEnd): unknown {
    const obj: any = {};
    return obj;
  },

  create(base?: DeepPartial<NetMessagePacketEnd>): NetMessagePacketEnd {
    return NetMessagePacketEnd.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<NetMessagePacketEnd>): NetMessagePacketEnd {
    const message = createBaseNetMessagePacketEnd();
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
