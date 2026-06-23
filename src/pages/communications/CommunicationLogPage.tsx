import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

type CommunicationRecord = Schema["CommunicationLog"]["type"];

export default function CommunicationLogPage() {
  const [messages, setMessages] = useState<CommunicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [channelFilter, setChannelFilter] = useState("ALL");
  const [directionFilter, setDirectionFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  async function loadMessages() {
    setIsLoading(true);
    const result = await client.models.CommunicationLog.list();
    setMessages(result.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  const filteredMessages = messages.filter((message) => {
    const matchesChannel =
      channelFilter === "ALL" || message.channel === channelFilter;

    const matchesDirection =
      directionFilter === "ALL" || message.direction === directionFilter;

    const matchesStatus =
      statusFilter === "ALL" || message.status === statusFilter;

    return matchesChannel && matchesDirection && matchesStatus;
  });

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Communication Log</h2>
          <p>Outbound and inbound SMS/email records associated with loads.</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Filters</h2>

        <div className="action-row">
          <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}>
            <option value="ALL">All Channels</option>
            <option value="SMS">SMS</option>
            <option value="EMAIL">Email</option>
          </select>

          <select value={directionFilter} onChange={(e) => setDirectionFilter(e.target.value)}>
            <option value="ALL">All Directions</option>
            <option value="OUTBOUND">Outbound</option>
            <option value="INBOUND">Inbound</option>
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="SENT">Sent</option>
            <option value="RECEIVED">Received</option>
            <option value="FAILED">Failed</option>
          </select>

          <button onClick={() => {
            setChannelFilter("ALL");
            setDirectionFilter("ALL");
            setStatusFilter("ALL");
          }}>
            Clear Filters
          </button>
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
              {filteredMessages.map((message) => (
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
