# Gamecoordinator Dota Communicator Typescript library

This Typescript library interacts with the Dota Game Coordinator. It has prebuilt methods that allows you to easily get specific information and it also provides you with a fully typed and comprehensive toolset that you can use to implement your own methods.

It requires the use of [steam-user](https://github.com/DoctorMcKay/node-steam-user) to interact with the current steam session. You should familiarize yourself with this library.

# Custom methods

The following functions act as an example of how to implement your own functions, and allows you to interact with the Game Coordinator.

### `getMatchDetails`

Input the match ID and get information about the specific match in return. The return data matches the `CMsgDOTAMatch` protobuf.

### `getProfileCard`

Input the account id of a user and get their profile card back in return. The return data matches the `CMsgDOTAProfileCard` protobuf.

**Example**

```

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

// When the client is connected to the Game Coordinator, get match details for a match and the profile card for an account

dota.customEvents.on("connectedToGc", async () => {
  console.log("Connected to GC");
  const data = await dota.getMatchDetails("7735807633");

  console.log(data);

  const profileCard = await dota.getProfileCard(92307178);

  console.log(profileCard);
});

```

# Running locally

Run the following commands in the following order. It installs, gets the most recent protobufs and generates types.

1. `pnpm install`
2. `pnpm run protos:sync`
3. `pnpm run protos:generate`
4. `pnpm run protos:mappings`

**ENV**

```
STEAM_REFRESH_TOKEN=YOUR_REFRESH_TOKEN
```
