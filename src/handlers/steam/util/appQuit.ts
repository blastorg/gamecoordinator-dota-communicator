import { GCConnectionStatus } from "../../../../protobufs/generated/protoc";
import { Dota } from "../../../Dota";
import { StateTracking } from "../../../StateTracking";

export function appQuit(instance: Dota, state: StateTracking, emitDisconnectEvent: boolean): void {
  state.clearHelloTimer();

  if (instance.haveGCSession && emitDisconnectEvent) {
    instance.customEvents.emit("disconnectedFromGC", GCConnectionStatus.GCConnectionStatus_NO_SESSION);
  }

  instance.inGame = false;
  instance.haveGCSession = false;
}
