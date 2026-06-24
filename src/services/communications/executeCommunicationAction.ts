import { sendEmailForLoad } from "./sendEmailForLoad";
import { sendSmsForLoad } from "./sendSmsForLoad";

export type CommunicationTriggerSource =
  | "PLANNER_MANUAL"
  | "GEOFENCE_EVENT"
  | "SMS_CHECK_IN"
  | "ETA_UPDATE"
  | "SYSTEM_AUTOMATION";

export type CommunicationActionType =
  | "BROKER_LOAD_UPDATE"
  | "DRIVER_CHECK_IN_REQUEST"
  | "DRIVER_ETA_UPDATE"
  | "BROKER_ARRIVAL_NOTICE";

type ExecuteCommunicationActionInput = {
  loadId: string;
  actionType: CommunicationActionType;
  triggerSource: CommunicationTriggerSource;
  recipientName?: string;
  recipientEmail?: string;
  recipientPhone?: string;
};

export async function executeCommunicationAction(input: ExecuteCommunicationActionInput) {
  const triggerTag = `[${input.triggerSource}]`;

  switch (input.actionType) {
    case "BROKER_LOAD_UPDATE":
      if (!input.recipientEmail) throw new Error("Broker email is required.");
      return sendEmailForLoad({
        loadId: input.loadId,
        recipientName: input.recipientName ?? "Broker",
        recipientEmail: input.recipientEmail,
        subject: `${triggerTag} FleetVision Load Update`,
        message: `FleetVision load update for load ${input.loadId}.`,
        relatedEventType: input.actionType,
      });

    case "DRIVER_CHECK_IN_REQUEST":
      if (!input.recipientPhone) throw new Error("Driver phone is required.");
      return sendSmsForLoad({
        loadId: input.loadId,
        recipientName: input.recipientName ?? "Driver",
        recipientPhone: input.recipientPhone,
        message: `${triggerTag} Please reply ENROUTE, ARRIVED, DELAYED, or ISSUE for load ${input.loadId}.`,
        relatedEventType: input.actionType,
      });

    case "DRIVER_ETA_UPDATE":
      if (!input.recipientPhone) throw new Error("Driver phone is required.");
      return sendSmsForLoad({
        loadId: input.loadId,
        recipientName: input.recipientName ?? "Driver",
        recipientPhone: input.recipientPhone,
        message: `${triggerTag} Please provide your latest ETA for load ${input.loadId}.`,
        relatedEventType: input.actionType,
      });

    case "BROKER_ARRIVAL_NOTICE":
      if (!input.recipientEmail) throw new Error("Broker email is required.");
      return sendEmailForLoad({
        loadId: input.loadId,
        recipientName: input.recipientName ?? "Broker",
        recipientEmail: input.recipientEmail,
        subject: `${triggerTag} Arrival Notice`,
        message: `FleetVision arrival notice for load ${input.loadId}.`,
        relatedEventType: input.actionType,
      });

    default:
      throw new Error("Unsupported communication action.");
  }
}
