import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

type CommunicationInput = {
  loadId?: string;
  direction: string;
  channel: string;
  recipientName?: string;
  recipientContact?: string;
  subject?: string;
  message: string;
  status: string;
  provider?: string;
  providerMessageId?: string;
  relatedEventType?: string;
};

export async function createCommunicationLog(input: CommunicationInput) {
  return client.models.CommunicationLog.create({
    ...input,
    createdAt: new Date().toISOString(),
  });
}
