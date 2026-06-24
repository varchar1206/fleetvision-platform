import fs from "fs";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

const outputs = JSON.parse(
  fs.readFileSync("amplify_outputs.json", "utf8")
);

Amplify.configure(outputs);

const client = generateClient();

const loadId = "6f5589e0-954c-464d-a19d-78bd4c8c566b";

await client.models.CommunicationLog.create({
  loadId,
  direction: "INBOUND",
  channel: "SMS",
  recipientName: "Test Driver",
  recipientContact: "+15555550101",
  message: "ENROUTE",
  status: "RECEIVED",
  provider: "SIMULATED_SMS",
  relatedEventType: "SMS_ENROUTE",
  createdAt: new Date().toISOString(),
});

await client.models.LoadEvent.create({
  loadId,
  eventType: "SMS_ENROUTE",
  eventTime: new Date().toISOString(),
  eventSource: "SMS",
  notes: "Driver attestation received: ENROUTE",
});

console.log("Driver attestation simulation completed.");
