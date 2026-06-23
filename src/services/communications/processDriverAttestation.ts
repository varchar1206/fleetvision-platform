import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { createCommunicationLog } from "./createCommunicationLog";

const client = generateClient<Schema>();

type DriverAttestationInput = {
  loadId: string;
  driverName?: string;
  driverPhone?: string;
  message: string;
};

export async function processDriverAttestation(input: DriverAttestationInput) {
  const normalizedMessage = input.message.trim().toUpperCase();
  const now = new Date().toISOString();

  let statusUpdate = "";
  let eventType = "DRIVER_SMS_ATTESTATION";

  if (normalizedMessage === "ENROUTE") {
    statusUpdate = "IN_TRANSIT";
    eventType = "SMS_ENROUTE";
  }

  if (normalizedMessage === "ARRIVED") {
    statusUpdate = "ARRIVED_AT_DELIVERY";
    eventType = "SMS_ARRIVED";
  }

  if (normalizedMessage === "DELAYED") {
    eventType = "SMS_DELAYED";
  }

  await createCommunicationLog({
    loadId: input.loadId,
    direction: "INBOUND",
    channel: "SMS",
    recipientName: input.driverName,
    recipientContact: input.driverPhone,
    message: input.message,
    status: "RECEIVED",
    provider: "SIMULATED_SMS",
    relatedEventType: eventType,
  });

  await client.models.LoadEvent.create({
    loadId: input.loadId,
    eventType,
    eventTime: now,
    eventSource: "SMS",
    notes: `Driver attestation received: ${input.message}`,
  });

  if (statusUpdate) {
    await client.models.Load.update({
      id: input.loadId,
      status: statusUpdate,
      ...(eventType === "SMS_ENROUTE"
        ? {
            etaStartTime: now,
            etaStartSource: "SMS_CHECK_IN",
          }
        : {}),
    });
  }
}
