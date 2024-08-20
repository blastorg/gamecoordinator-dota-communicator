/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */

import dotenv from "dotenv";
import steamUser from "steam-user";
import { Dota } from "../src";
dotenv.config();

const client = new steamUser();

const dota = new Dota(client);

client.logOn({
  refreshToken: process.env.STEAM_REFRESH_TOKEN as string,
});

client.on("loggedOn", () => {
  console.log("Logged on");

  client.setPersona(steamUser.EPersonaState.Online);

  client.gamesPlayed([570], true);
});

client.on("appLaunched", (appId) => {
  console.log("App launched", appId);
});

dota.customEvents.on("connectedToGc", async () => {
  console.log("Connected to GC");
  const data = await dota.getMatchDetails("7735807633");

  console.log(data);

  const profileCard = await dota.getProfileCard(92307178);

  console.log(profileCard);
});

dota.customEvents.on("debug", (message) => {
  console.log(message);
});
