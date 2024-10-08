import { Dota } from "../Dota";
import { CMsgDOTAProfileCard } from "../../protobufs/generated/protoc";

export function getProfileCard(this: Dota, accountId: number): Promise<CMsgDOTAProfileCard> {
  // Send a message to the Game Coordinator requesting the profile card
  this.send("getProfileCard", {
    accountId,
  });

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout waiting for profile card for account: ${accountId}`));
    }, 5000);

    this.gcEvents.once("getProfileCardResponse", ({ data }) => {
      clearTimeout(timer);
      resolve(data);
    });
  });
}
