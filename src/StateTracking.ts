import { config } from "./config";

export class StateTracking {
  public helloTimerMs?: number | undefined;
  public helloTimer: NodeJS.Timeout | null = null;

  clearHelloTimer(): void {
    if (this.helloTimer) {
      clearTimeout(this.helloTimer);
      this.helloTimer = null;
      delete this.helloTimerMs;
    }
  }

  setHelloTimer(callback: () => void, type: "initial" | "running"): void {
    this.helloTimerMs =
      type === "initial"
        ? config.initialHelloDelay
        : Math.min(config.exponentialHelloBackoffMax, (this.helloTimerMs || config.defaultHelloDelay) * 2);
    this.helloTimer = setTimeout(callback, this.helloTimerMs);
  }
}
