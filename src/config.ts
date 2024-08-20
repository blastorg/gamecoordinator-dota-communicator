const INITIAL_HELLO_DELAY = 500;
const DEFAULT_HELLO_DELAY = 1000;
const EXPONENTIAL_HELLO_BACKOFF_MAX = 60000;
const APPID = 570;

export const config = {
  initialHelloDelay: INITIAL_HELLO_DELAY,
  defaultHelloDelay: DEFAULT_HELLO_DELAY,
  exponentialHelloBackoffMax: EXPONENTIAL_HELLO_BACKOFF_MAX,
  appId: APPID,
};
