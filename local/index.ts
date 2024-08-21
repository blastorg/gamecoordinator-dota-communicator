import dotenv from "dotenv";
import steamUser from "steam-user";
import { Dota } from "../src";
dotenv.config();

// Define clients
const client = new steamUser();
const dota = new Dota(client);

// Log on to Steam using the refresh token
client.logOn({
  refreshToken: process.env.STEAM_REFRESH_TOKEN as string,
});

// On successful logon, set the persona state to online and play Dota 2
client.on("loggedOn", () => {
  console.log("Logged on");

  client.setPersona(steamUser.EPersonaState.Online);

  client.gamesPlayed([570], true);
});

// Log the app ID when the app is launched
client.on("appLaunched", (appId) => {
  console.log("App launched", appId);
});

// When the client is connected to the Game Coordinator, get match details for a match and the profile card for an account
dota.customEvents.on("connectedToGc", async () => {
  console.log("Connected to GC");
  const data = await dota.getMatchDetails("7735807633");

  console.log(data);

  const profileCard = await dota.getProfileCard(92307178);

  console.log(profileCard);
});

// When the client is disconnected from the Game Coordinator, log the status
dota.customEvents.on("debug", (message) => {
  console.log(message);
});
