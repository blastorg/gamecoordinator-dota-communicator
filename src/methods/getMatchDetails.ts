import { Dota } from "../Dota";
import { CMsgDOTAMatch } from "../../protobufs/generated/protoc";

export function getMatchDetails(
  this: Dota,
  matchId: string,
): Promise<{ matchDetails: CMsgDOTAMatch; replayUrl: string }> {
  // Send a message to the Game Coordinator requesting match details
  this.send("matchDetailsRequest", {
    matchId: matchId,
  });

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Timeout waiting for match details"));
    }, 5000);

    this.gcEvents.once("matchDetailsResponse", ({ data }) => {
      clearTimeout(timer);
      if (!data.match) {
        reject(new Error("No match data"));
        return;
      }
      const url = `http://replay${data.match.cluster}.valve.net/570/${
        data.match.matchId
      }_${data.match.replaySalt}.dem.bz2`;

      resolve({ matchDetails: data.match, replayUrl: url });
    });
  });
}
