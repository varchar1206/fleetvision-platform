import fs from "fs";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

const outputs = JSON.parse(fs.readFileSync("amplify_outputs.json", "utf8"));
Amplify.configure(outputs);

const client = generateClient();

console.log(Object.keys(client.models));
