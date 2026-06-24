import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { formatEasternDateTime } from "../../utils/dateTime";
import CommunicationDetailsPanel from "../../components/communications/CommunicationDetailsPanel";

const client = generateClient<Schema>();

type CommunicationRecord = Schema["CommunicationLog"]["type"];

export default function DeliveryDiagnostics() {
  const [messages, setMessages] = useState<CommunicationRecord[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<CommunicationRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [channelFilter, setChannelFilter] = useState("ALL");
  const [status, setStatus] = useState("");

  async function loadMessages() {
    setIsLoading(true);
    const result = await client.models.CommunicationLog.list();
    const sorted = [...result.data].sort((a, b) =>
      String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? ""))
    );
    setMessages(sorted);
    setIsLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function updateSelectedStatus(nextStatus: string) {
    if (!selectedMessage?.id) return;

    try {
      setStatus(`Updating message to ${nextStatus}...`);

      await client.models.CommunicationLog.update({
        id: selectedMessage.id,
        status: nextStatus,
      });

      setSelectedMessage(null);
      await loadMessages();
      setStatus(`Message updated to ${nextStatus}.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Status update failed.");
    }
  }

  const filteredMessages = messages.filter((message) => {
    const statusMatch = statusFilter === "ALL" || message.status === statusFilter;
    const channelMatch = channelFilter === "ALL" || message.channel === channelFilter;
    return statusMatch && channelMatch;
  });

  const pending = messages.filter((m) => m.status === "PENDING").length;
  const sent = messages.filter((m) => m.status === "SENT").length;
  const delivered = messages.filter((m) => m.status === "DELIVERED").length;
  const received = messages.filter((m) => m.status === "RECEIVED").length;
  const failed = messages.filter((m) => m.status === "FAILED").length;

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Delivery Diagnostics</h2>
          <p>
            Message lifecycle diagnostics, provider-status simulation,
            and future delivery troubleshooting.
          </p>
        </div>

        <button onClick={loadMessages}>Refresh</button>
      </div>

      <div className="dashboard-grid">
        <div className="card"><h2>Total</h2><p>{messages.length}</p></div>
        <div className="card"><h2>Pending</h2><p>{pending}</p></div>
        <div className="card"><h2>Sent</h2><p>{sent}</p></div>
        <div className="card"><h2>Delivered</h2><p>{delivered}</p></div>
        <div className="card"><h2>Received</h2><p>{received}</p></div>
        <div className="card"><h2>Failed</h2><p>{failed}</p></div>
      </div>

      <div className="table-card">
        <h2>Filters</h2>

        <div className="action-row">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="SENT">Sent</option>
            <option value="DELIVERED">Delivered</option>
            <option value="RECEIVED">Received</option>
            <option value="FAILED">Failed</option>
          </select>

          <select value={channelFilter} onChange={(e) => setChannelFilter(e.target.value)}>
            <option value="ALL">All Channels</option>
            <option value="SMS">SMS</option>
            <option value="EMAIL">Email</option>
          </select>
        </div>
      </div>

      {selectedMessage && (
        <div className="table-card">
          <h2>Provider Status Simulation</h2>
          <p>
            Selected message: {selectedMessage.relatedEventType} / {selectedMessage.channel} /
            {" "}Load {selectedMessage.loadId}
          </p>

          <div className="communication-action-grid">
            <button onClick={() => updateSelectedStatus("SENT")}>Mark Sent</button>
            <button onClick={() => updateSelectedStatus("DELIVERED")}>Mark Delivered</button>
            <button onClick={() => updateSelectedStatus("FAILED")}>Mark Failed</button>
          </div>
        </div>
      )}

      {status && (
        <div className="communication-status">
          <strong>Status:</strong> {status}
        </div>
      )}

      <CommunicationDetailsPanel
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />

      <div className="table-card">
        <h2>Delivery Records</h2>

        {isLoading ? (
          <p>Loading diagnostics...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Created</th>
                <th>Load</th>
                <th>Channel</th>
                <th>Provider</th>
                <th>Recipient</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredMessages.map((message) => (
                <tr
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{formatEasternDateTime(message.createdAt)}</td>
                  <td>{message.loadId}</td>
                  <td>{message.channel}</td>
                  <td>{message.provider}</td>
                  <td>{message.recipientName || message.recipientContact}</td>
                  <td>{message.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
