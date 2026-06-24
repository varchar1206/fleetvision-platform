import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { formatEasternDateTime } from "../../utils/dateTime";

const client = generateClient<Schema>();

type CommunicationRecord = Schema["CommunicationLog"]["type"];

type Props = {
  loadId?: string | null;
};

export default function LoadCommunicationHistory({ loadId }: Props) {
  const [messages, setMessages] = useState<CommunicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadHistory() {
    if (!loadId) return;

    setIsLoading(true);
    const result = await client.models.CommunicationLog.list();
    setMessages(result.data.filter((message) => message.loadId === loadId));
    setIsLoading(false);
  }

  useEffect(() => {
    loadHistory();
  }, [loadId]);

  if (!loadId) return null;

  return (
    <div className="table-card">
      <h2>Load Communication History</h2>

      {isLoading ? (
        <p>Loading communication history...</p>
      ) : messages.length === 0 ? (
        <p>No communication records found for this load.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Direction</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Event</th>
              <th>Message</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td>{message.direction}</td>
                <td>{message.channel}</td>
                <td>{message.status}</td>
                <td>{message.relatedEventType}</td>
                <td>{message.message}</td>
                <td>{formatEasternDateTime(message.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
