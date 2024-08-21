import { Dota } from "../../Dota";
import { StateTracking } from "../../StateTracking";

export function handleClientWelcome(this: Dota, state: StateTracking): void {
  this.gcEvents.on("clientWelcome", () => {
    this.haveGCSession = true;
    state.clearHelloTimer();
    this.customEvents.emit("connectedToGc");
  });
}
