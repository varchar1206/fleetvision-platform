import { createCommunicationLog } from "./createCommunicationLog";

type SmsInput = {
  loadId: string;
  recipientName?: string;
  recipientPhone: string;
  message: string;
  relatedEventType?: string;
};

export async function sendSmsForLoad(input: SmsInput) {
  return createCommunicationLog({
    loadId: input.loadId,
    direction: "OUTBOUND",
    channel: "SMS",
    recipientName: input.recipientName,
    recipientContact: input.recipientPhone,
    message: input.message,
    status: "PENDING",
    provider: "AWS_END_USER_MESSAGING_SMS",
    relatedEventType: input.relatedEventType,
  });
}
