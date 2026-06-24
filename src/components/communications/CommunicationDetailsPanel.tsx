import type { Schema } from "../../../amplify/data/resource";

type CommunicationRecord = Schema["CommunicationLog"]["type"];

type Props = {
  message: CommunicationRecord | null;
  onClose: () => void;
};

export default function CommunicationDetailsPanel({ message, onClose }: Props) {
  if (!message) return null;

  return (
    <div className="table-card">
      <h2>Message Details</h2>

      <p><strong>Load ID:</strong> {message.loadId}</p>
      <p><strong>Direction:</strong> {message.direction}</p>
      <p><strong>Channel:</strong> {message.channel}</p>
      <p><strong>Recipient:</strong> {message.recipientName || message.recipientContact}</p>
      <p><strong>Contact:</strong> {message.recipientContact}</p>
      <p><strong>Status:</strong> {message.status}</p>
      <p><strong>Provider:</strong> {message.provider}</p>
      <p><strong>Event:</strong> {message.relatedEventType}</p>
      <p><strong>Subject:</strong> {message.subject || "N/A"}</p>
      <p><strong>Message:</strong> {message.message}</p>
      <p><strong>Created:</strong> {message.createdAt}</p>

      <button onClick={onClose}>Close Details</button>
    </div>
  );
}
