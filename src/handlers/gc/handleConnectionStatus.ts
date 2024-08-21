import { GCConnectionStatus } from "../../../protobufs/generated/protoc";
import { Dota } from "../../Dota";
import { StateTracking } from "../../StateTracking";
import { connectToGc } from "../steam/util/connectToGc";

export function handleConnectionStatus(this: Dota, state: StateTracking): void {
  this.gcEvents.on("clientConnectionStatus", ({ data }) => {
    if (data.status !== GCConnectionStatus.GCConnectionStatus_HAVE_SESSION && this.haveGCSession) {
      this.customEvents.emit("debug", `Connection status: ${data.status}; have session: ${this.haveGCSession}`);
      this.customEvents.emit("disconnectedFromGC", data.status);
      this.haveGCSession = false;
      connectToGc(this, state); // Try to reconnect
    }
  });
}
