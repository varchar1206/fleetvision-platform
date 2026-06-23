import fs from "fs";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";

const outputs = JSON.parse(
  fs.readFileSync("amplify_outputs.json", "utf8")
);

Amplify.configure(outputs);

const client = generateClient();

const now = new Date().toISOString();

const samples = [
  {
    loadId: "TEST-SMS-001",
    direction: "OUTBOUND",
    channel: "SMS",
    recipientName: "Driver Test",
    recipientContact: "+15555550101",
    message: "FleetVision: Please confirm departure.",
    status: "PENDING",
    provider: "AWS_END_USER_MESSAGING_SMS",
    relatedEventType: "DRIVER_CHECK_IN",
  },
  {
    loadId: "TEST-SMS-002",
    direction: "OUTBOUND",
    channel: "SMS",
    recipientName: "Driver Test",
    recipientContact: "+15555550102",
    message: "FleetVision: ETA update request.",
    status: "SENT",
    provider: "AWS_END_USER_MESSAGING_SMS",
    relatedEventType: "ETA_UPDATE",
  },
  {
    loadId: "TEST-SMS-003",
    direction: "INBOUND",
    channel: "SMS",
    recipientName: "Driver Test",
    recipientContact: "+15555550103",
    message: "ENROUTE",
    status: "RECEIVED",
    provider: "AWS_END_USER_MESSAGING_SMS",
    relatedEventType: "DRIVER_ATTESTATION",
  },
  {
    loadId: "TEST-EMAIL-001",
    direction: "OUTBOUND",
    channel: "EMAIL",
    recipientName: "Broker Test",
    recipientContact: "broker@test.com",
    subject: "Load Tender Notification",
    message: "A new load has been tendered.",
    status: "SENT",
    provider: "AWS_SES",
    relatedEventType: "LOAD_TENDER",
  },
  {
    loadId: "TEST-EMAIL-002",
    direction: "OUTBOUND",
    channel: "EMAIL",
    recipientName: "Store Manager",
    recipientContact: "store@test.com",
    subject: "Late Arrival Alert",
    message: "Load ETA is at risk.",
    status: "PENDING",
    provider: "AWS_SES",
    relatedEventType: "ETA_ALERT",
  },
];

for (const sample of samples) {
  await client.models.CommunicationLog.create({
    ...sample,
    createdAt: now,
  });

  console.log(
    `Created ${sample.channel} ${sample.status} record for ${sample.loadId}`
  );
}

console.log("Communication test data complete.");
