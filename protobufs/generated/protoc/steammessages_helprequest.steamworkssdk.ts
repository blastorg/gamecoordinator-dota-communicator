// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.1
//   protoc               v5.26.1
// source: steammessages_helprequest.steamworkssdk.proto

/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export interface CHelpRequestLogsUploadUserApplicationLogRequest {
  appid?: number | undefined;
  logType?: string | undefined;
  versionString?: string | undefined;
  logContents?: string | undefined;
}

export interface CHelpRequestLogsUploadUserApplicationLogResponse {
  id?: string | undefined;
}

function createBaseCHelpRequestLogsUploadUserApplicationLogRequest(): CHelpRequestLogsUploadUserApplicationLogRequest {
  return { appid: 0, logType: "", versionString: "", logContents: "" };
}

export const CHelpRequestLogsUploadUserApplicationLogRequest = {
  encode(
    message: CHelpRequestLogsUploadUserApplicationLogRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.appid !== undefined && message.appid !== 0) {
      writer.uint32(8).uint32(message.appid);
    }
    if (message.logType !== undefined && message.logType !== "") {
      writer.uint32(18).string(message.logType);
    }
    if (message.versionString !== undefined && message.versionString !== "") {
      writer.uint32(26).string(message.versionString);
    }
    if (message.logContents !== undefined && message.logContents !== "") {
      writer.uint32(34).string(message.logContents);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CHelpRequestLogsUploadUserApplicationLogRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCHelpRequestLogsUploadUserApplicationLogRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.appid = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.logType = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.versionString = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.logContents = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CHelpRequestLogsUploadUserApplicationLogRequest {
    return {
      appid: isSet(object.appid) ? globalThis.Number(object.appid) : 0,
      logType: isSet(object.logType) ? globalThis.String(object.logType) : "",
      versionString: isSet(object.versionString) ? globalThis.String(object.versionString) : "",
      logContents: isSet(object.logContents) ? globalThis.String(object.logContents) : "",
    };
  },

  toJSON(message: CHelpRequestLogsUploadUserApplicationLogRequest): unknown {
    const obj: any = {};
    if (message.appid !== undefined && message.appid !== 0) {
      obj.appid = Math.round(message.appid);
    }
    if (message.logType !== undefined && message.logType !== "") {
      obj.logType = message.logType;
    }
    if (message.versionString !== undefined && message.versionString !== "") {
      obj.versionString = message.versionString;
    }
    if (message.logContents !== undefined && message.logContents !== "") {
      obj.logContents = message.logContents;
    }
    return obj;
  },

  create(
    base?: DeepPartial<CHelpRequestLogsUploadUserApplicationLogRequest>,
  ): CHelpRequestLogsUploadUserApplicationLogRequest {
    return CHelpRequestLogsUploadUserApplicationLogRequest.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<CHelpRequestLogsUploadUserApplicationLogRequest>,
  ): CHelpRequestLogsUploadUserApplicationLogRequest {
    const message = createBaseCHelpRequestLogsUploadUserApplicationLogRequest();
    message.appid = object.appid ?? 0;
    message.logType = object.logType ?? "";
    message.versionString = object.versionString ?? "";
    message.logContents = object.logContents ?? "";
    return message;
  },
};

function createBaseCHelpRequestLogsUploadUserApplicationLogResponse(): CHelpRequestLogsUploadUserApplicationLogResponse {
  return { id: "0" };
}

export const CHelpRequestLogsUploadUserApplicationLogResponse = {
  encode(
    message: CHelpRequestLogsUploadUserApplicationLogResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== undefined && message.id !== "0") {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CHelpRequestLogsUploadUserApplicationLogResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCHelpRequestLogsUploadUserApplicationLogResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = longToString(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CHelpRequestLogsUploadUserApplicationLogResponse {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "0" };
  },

  toJSON(message: CHelpRequestLogsUploadUserApplicationLogResponse): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "0") {
      obj.id = message.id;
    }
    return obj;
  },

  create(
    base?: DeepPartial<CHelpRequestLogsUploadUserApplicationLogResponse>,
  ): CHelpRequestLogsUploadUserApplicationLogResponse {
    return CHelpRequestLogsUploadUserApplicationLogResponse.fromPartial(base ?? {});
  },
  fromPartial(
    object: DeepPartial<CHelpRequestLogsUploadUserApplicationLogResponse>,
  ): CHelpRequestLogsUploadUserApplicationLogResponse {
    const message = createBaseCHelpRequestLogsUploadUserApplicationLogResponse();
    message.id = object.id ?? "0";
    return message;
  },
};

export interface HelpRequestLogs {
  UploadUserApplicationLog(
    request: CHelpRequestLogsUploadUserApplicationLogRequest,
  ): Promise<CHelpRequestLogsUploadUserApplicationLogResponse>;
}

export const HelpRequestLogsServiceName = "HelpRequestLogs";
export class HelpRequestLogsClientImpl implements HelpRequestLogs {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || HelpRequestLogsServiceName;
    this.rpc = rpc;
    this.UploadUserApplicationLog = this.UploadUserApplicationLog.bind(this);
  }
  UploadUserApplicationLog(
    request: CHelpRequestLogsUploadUserApplicationLogRequest,
  ): Promise<CHelpRequestLogsUploadUserApplicationLogResponse> {
    const data = CHelpRequestLogsUploadUserApplicationLogRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UploadUserApplicationLog", data);
    return promise.then((data) => CHelpRequestLogsUploadUserApplicationLogResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
