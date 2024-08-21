import { Dota } from "../../Dota";
import { StateTracking } from "../../StateTracking";
import { appQuit } from "./util/appQuit";

export function handleDisconnected(this: Dota, state: StateTracking): void {
  this.steam.on("disconnected", () => {
    appQuit(this, state, true);
  });
}
