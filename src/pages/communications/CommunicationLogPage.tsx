import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { formatEasternDateTime } from "../../utils/dateTime";
import CommunicationDetailsPanel from "../../components/communications/CommunicationDetailsPanel";


const client = generateClient<Schema>();

type CommunicationRecord = Schema["CommunicationLog"]["type"];

export default function CommunicationLogPage() {
  const [messages, setMessages] = useState<CommunicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [channelFilter, setChannelFilter] = useState("ALL");
  const [directionFilter, setDirectionFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedMessage, setSelectedMessage] = useState<CommunicationRecord | null>(null);

  function openMessageDetails(message: CommunicationRecord) {
    setSelectedMessage(message);

    
    
  }

  async function loadMessages() {
    setIsLoading(true);
    const result = await client.models.CommunicationLog.list();
    setMessages(result.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  const totalMessages = messages.length;
  const smsCount = messages.filter((message) => message.channel === "SMS").length;
  const emailCount = messages.filter((message) => message.channel === "EMAIL").length;
  const inboundCount = messages.filter((message) => message.direction === "INBOUND").length;
  const outboundCount = messages.filter((message) => message.direction === "OUTBOUND").length;
  const pendingCount = messages.filter((message) => message.status === "PENDING").length;

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

      <div className="dashboard-grid">
        <div className="card"><h2>Total Messages</h2><p>{totalMessages}</p></div>
        <div className="card"><h2>SMS</h2><p>{smsCount}</p></div>
        <div className="card"><h2>Email</h2><p>{emailCount}</p></div>
        <div className="card"><h2>Inbound</h2><p>{inboundCount}</p></div>
        <div className="card"><h2>Outbound</h2><p>{outboundCount}</p></div>
        <div className="card"><h2>Pending</h2><p>{pendingCount}</p></div>
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

      <CommunicationDetailsPanel
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />

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
                <tr key={message.id} onClick={() => openMessageDetails(message)} style={{ cursor: "pointer" }}>
                  <td>{message.loadId}</td>
                  <td>{message.direction}</td>
                  <td>{message.channel}</td>
                  <td>{message.recipientName || message.recipientContact}</td>
                  <td>{message.status}</td>
                  <td>{message.relatedEventType}</td>
                  <td>{formatEasternDateTime(message.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
