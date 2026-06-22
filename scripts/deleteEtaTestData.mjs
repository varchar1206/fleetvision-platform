import fs from "fs";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

const outputs = JSON.parse(fs.readFileSync("amplify_outputs.json", "utf8"));
Amplify.configure(outputs);

const client = generateClient();

const result = await client.models.Load.list();

const seedLoads = result.data.filter((load) => load.createdBy === "SEED");

let deleted = 0;

for (const load of seedLoads) {
  await client.models.Load.delete({ id: load.id });
  deleted += 1;
}

console.log(`Deleted ${deleted} ETA test loads.`);
