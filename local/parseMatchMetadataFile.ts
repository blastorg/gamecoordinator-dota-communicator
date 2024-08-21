import { readFile, writeFile } from "fs/promises";
import { CDOTAMatchMetadataFile } from "../protobufs/generated/protoc";

async function main() {
  const data = await readFile("local/output/7864659476.meta");
  const matchMetadata = CDOTAMatchMetadataFile.decode(Buffer.from(data));

  await writeFile("local/output/matchMetadata.json", JSON.stringify(matchMetadata, null, 2));
}

main().catch((err) => {
  console.log("Caught an error:", err);
});
