// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.1
//   protoc               v5.26.1
// source: steammessages_oauth.steamworkssdk.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface COAuthTokenImplicitGrantNoPromptRequest {
  clientid?: string | undefined;
}

export interface COAuthTokenImplicitGrantNoPromptResponse {
  accessToken?: string | undefined;
  redirectUri?: string | undefined;
}

function createBaseCOAuthTokenImplicitGrantNoPromptRequest(): COAuthTokenImplicitGrantNoPromptRequest {
  return { clientid: "" };
}

export const COAuthTokenImplicitGrantNoPromptRequest = {
  encode(message: COAuthTokenImplicitGrantNoPromptRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientid !== undefined && message.clientid !== "") {
      writer.uint32(10).string(message.clientid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): COAuthTokenImplicitGrantNoPromptRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCOAuthTokenImplicitGrantNoPromptRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): COAuthTokenImplicitGrantNoPromptRequest {
    return { clientid: isSet(object.clientid) ? globalThis.String(object.clientid) : "" };
  },

  toJSON(message: COAuthTokenImplicitGrantNoPromptRequest): unknown {
    const obj: any = {};
    if (message.clientid !== undefined && message.clientid !== "") {
      obj.clientid = message.clientid;
    }
    return obj;
  },

  create(base?: DeepPartial<COAuthTokenImplicitGrantNoPromptRequest>): COAuthTokenImplicitGrantNoPromptRequest {
    return COAuthTokenImplicitGrantNoPromptRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<COAuthTokenImplicitGrantNoPromptRequest>): COAuthTokenImplicitGrantNoPromptRequest {
    const message = createBaseCOAuthTokenImplicitGrantNoPromptRequest();
    message.clientid = object.clientid ?? "";
    return message;
  },
};

function createBaseCOAuthTokenImplicitGrantNoPromptResponse(): COAuthTokenImplicitGrantNoPromptResponse {
  return { accessToken: "", redirectUri: "" };
}

export const COAuthTokenImplicitGrantNoPromptResponse = {
  encode(message: COAuthTokenImplicitGrantNoPromptResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== undefined && message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.redirectUri !== undefined && message.redirectUri !== "") {
      writer.uint32(18).string(message.redirectUri);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): COAuthTokenImplicitGrantNoPromptResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCOAuthTokenImplicitGrantNoPromptResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.redirectUri = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): COAuthTokenImplicitGrantNoPromptResponse {
    return {
      accessToken: isSet(object.accessToken) ? globalThis.String(object.accessToken) : "",
      redirectUri: isSet(object.redirectUri) ? globalThis.String(object.redirectUri) : "",
    };
  },

  toJSON(message: COAuthTokenImplicitGrantNoPromptResponse): unknown {
    const obj: any = {};
    if (message.accessToken !== undefined && message.accessToken !== "") {
      obj.accessToken = message.accessToken;
    }
    if (message.redirectUri !== undefined && message.redirectUri !== "") {
      obj.redirectUri = message.redirectUri;
    }
    return obj;
  },

  create(base?: DeepPartial<COAuthTokenImplicitGrantNoPromptResponse>): COAuthTokenImplicitGrantNoPromptResponse {
    return COAuthTokenImplicitGrantNoPromptResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<COAuthTokenImplicitGrantNoPromptResponse>): COAuthTokenImplicitGrantNoPromptResponse {
    const message = createBaseCOAuthTokenImplicitGrantNoPromptResponse();
    message.accessToken = object.accessToken ?? "";
    message.redirectUri = object.redirectUri ?? "";
    return message;
  },
};

export interface OAuthToken {
  ImplicitGrantNoPrompt(
    request: COAuthTokenImplicitGrantNoPromptRequest,
  ): Promise<COAuthTokenImplicitGrantNoPromptResponse>;
}

export const OAuthTokenServiceName = "OAuthToken";
export class OAuthTokenClientImpl implements OAuthToken {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || OAuthTokenServiceName;
    this.rpc = rpc;
    this.ImplicitGrantNoPrompt = this.ImplicitGrantNoPrompt.bind(this);
  }
  ImplicitGrantNoPrompt(
    request: COAuthTokenImplicitGrantNoPromptRequest,
  ): Promise<COAuthTokenImplicitGrantNoPromptResponse> {
    const data = COAuthTokenImplicitGrantNoPromptRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ImplicitGrantNoPrompt", data);
    return promise.then((data) => COAuthTokenImplicitGrantNoPromptResponse.decode(_m0.Reader.create(data)));
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
