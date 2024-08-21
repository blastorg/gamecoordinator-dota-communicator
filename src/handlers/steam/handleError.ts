import { Dota } from "../../Dota";
import { StateTracking } from "../../StateTracking";
import { appQuit } from "./util/appQuit";

export function handleError(this: Dota, state: StateTracking): void {
  this.steam.on("error", () => {
    appQuit(this, state, true);
  });
}
