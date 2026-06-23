import { createCommunicationLog } from "./createCommunicationLog";

type EmailInput = {
  loadId: string;
  recipientName?: string;
  recipientEmail: string;
  subject: string;
  message: string;
  relatedEventType?: string;
};

export async function sendEmailForLoad(input: EmailInput) {
  return createCommunicationLog({
    loadId: input.loadId,
    direction: "OUTBOUND",
    channel: "EMAIL",
    recipientName: input.recipientName,
    recipientContact: input.recipientEmail,
    subject: input.subject,
    message: input.message,
    status: "PENDING",
    provider: "AWS_SES",
    relatedEventType: input.relatedEventType,
  });
}
