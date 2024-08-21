import { config } from "../../config";
import { Dota } from "../../Dota";
import { StateTracking } from "../../StateTracking";
import { connectToGc } from "./util/connectToGc";

export function handleAppLaunched(this: Dota, state: StateTracking): void {
  this.steam.on("appLaunched", (appid) => {
    this.customEvents.emit("debug", `App launched: ${appid}`);
    if (this.inGame || appid !== config.appId) {
      return;
    }

    this.inGame = true;
    if (!this.haveGCSession) {
      connectToGc(this, state);
    }
  });
}
