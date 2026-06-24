import fs from "fs";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

const outputs = JSON.parse(fs.readFileSync("amplify_outputs.json", "utf8"));
Amplify.configure(outputs);

const client = generateClient();

const loadId = process.argv[2];
const message = (process.argv[3] || "ENROUTE").toUpperCase();
const now = new Date().toISOString();

if (!loadId) {
  console.error("Usage: node scripts/testDriverAttestationFlow.mjs <loadId> ENROUTE");
  process.exit(1);
}

let statusUpdate = "";
let eventType = "DRIVER_SMS_ATTESTATION";

if (message === "ENROUTE") {
  statusUpdate = "IN_TRANSIT";
  eventType = "SMS_ENROUTE";
}

if (message === "ARRIVED") {
  statusUpdate = "ARRIVED_AT_DELIVERY";
  eventType = "SMS_ARRIVED";
}

if (message === "DELAYED") {
  eventType = "SMS_DELAYED";
}

await client.models.CommunicationLog.create({
  loadId,
  direction: "INBOUND",
  channel: "SMS",
  recipientName: "Test Driver",
  recipientContact: "+15555550101",
  message,
  status: "RECEIVED",
  provider: "SIMULATED_SMS",
  relatedEventType: eventType,
  createdAt: now,
});

await client.models.LoadEvent.create({
  loadId,
  eventType,
  eventTime: now,
  eventSource: "SMS",
  notes: `Driver attestation received: ${message}`,
});

if (statusUpdate) {
  await client.models.Load.update({
    id: loadId,
    status: statusUpdate,
    ...(eventType === "SMS_ENROUTE"
      ? {
          etaStartTime: now,
          etaStartSource: "SMS_CHECK_IN",
        }
      : {}),
  });
}

const loads = await client.models.Load.list();
const updatedLoad = loads.data.find((load) => load.id === loadId);

console.log("Driver attestation flow complete.");
console.log({
  loadId,
  message,
  eventType,
  status: updatedLoad?.status,
  etaStartSource: updatedLoad?.etaStartSource,
  etaStartTime: updatedLoad?.etaStartTime,
});
