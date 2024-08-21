import { Dota } from "../../Dota";
import { StateTracking } from "../../StateTracking";
import { config } from "../../config";
import { appQuit } from "./util/appQuit";

export function handleAppQuit(this: Dota, state: StateTracking): void {
  this.steam.on("appQuit", (appid) => {
    if (!this.inGame || appid !== config.appId) {
      return;
    }
    appQuit(this, state, false);
  });
}
