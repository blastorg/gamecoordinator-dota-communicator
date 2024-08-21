import { Dota } from "../../../Dota";
import { StateTracking } from "../../../StateTracking";

export function connectToGc(dota: Dota, state: StateTracking): void {
  if (!dota.inGame || state.helloTimer) {
    dota.customEvents.emit(
      "debug",
      "Not trying to connect due to " + (!dota.inGame ? "not in Dota" : "has helloTimer"),
    );
    return;
  }

  const sendHello = () => {
    if (!dota.inGame || dota.haveGCSession) {
      dota.customEvents.emit(
        "debug",
        "Not sending hello because " + (!dota.inGame ? "we're no longer in Dota 2" : "we have a session"),
      );
      state.clearHelloTimer();
      return;
    }

    dota.sendPartial("clientHello", {});

    state.setHelloTimer(sendHello, "running");
    dota.customEvents.emit("debug", "Sending hello, setting timer for next attempt to %s ms", state.helloTimerMs);
  };

  state.setHelloTimer(sendHello, "initial");
}
