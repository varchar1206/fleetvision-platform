import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

type CommunicationRecord = Schema["CommunicationLog"]["type"];

export default function CommunicationLogPage() {
  const [messages, setMessages] = useState<CommunicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadMessages() {
    setIsLoading(true);
    const result = await client.models.CommunicationLog.list();
    setMessages(result.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Communication Log</h2>
          <p>Outbound and inbound SMS/email records associated with loads.</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Messages</h2>

        {isLoading ? (
          <p>Loading communication records...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Load</th>
                <th>Direction</th>
                <th>Channel</th>
                <th>Recipient</th>
                <th>Status</th>
                <th>Event</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((message) => (
                <tr key={message.id}>
                  <td>{message.loadId}</td>
                  <td>{message.direction}</td>
                  <td>{message.channel}</td>
                  <td>{message.recipientName || message.recipientContact}</td>
                  <td>{message.status}</td>
                  <td>{message.relatedEventType}</td>
                  <td>{message.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
