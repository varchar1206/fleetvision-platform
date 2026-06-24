import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { formatEasternDateTime } from "../../utils/dateTime";
import CommunicationDetailsPanel from "../../components/communications/CommunicationDetailsPanel";

const client = generateClient<Schema>();

type CommunicationRecord = Schema["CommunicationLog"]["type"];

function getTrigger(message: CommunicationRecord) {
  const body = `${message.subject ?? ""} ${message.message ?? ""}`;
  const triggerMatch = body.match(/\[(.*?)\]/);
  return triggerMatch ? triggerMatch[1] : "SYSTEM_OR_LEGACY";
}

export default function CommunicationEngineMonitor() {
  const [messages, setMessages] = useState<CommunicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [triggerFilter, setTriggerFilter] = useState("ALL");
  const [channelFilter, setChannelFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [directionFilter, setDirectionFilter] = useState("ALL");
  const [loadFilter, setLoadFilter] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<CommunicationRecord | null>(null);

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

  const triggers = Array.from(new Set(messages.map(getTrigger))).sort();

  const filteredMessages = messages.filter((message) => {
    const trigger = getTrigger(message);

    const matchesTrigger = triggerFilter === "ALL" || trigger === triggerFilter;
    const matchesChannel = channelFilter === "ALL" || message.channel === channelFilter;
    const matchesStatus = statusFilter === "ALL" || message.status === statusFilter;
    const matchesDirection = directionFilter === "ALL" || message.direction === directionFilter;
    const matchesLoad =
      !loadFilter ||
      String(message.loadId ?? "").toLowerCase().includes(loadFilter.toLowerCase());

    return (
      matchesTrigger &&
      matchesChannel &&
      matchesStatus &&
      matchesDirection &&
      matchesLoad
    );
  });

  const totalMessages = messages.length;
  const plannerManual = messages.filter((m) => getTrigger(m) === "PLANNER_MANUAL").length;
  const smsCount = messages.filter((m) => m.channel === "SMS").length;
  const emailCount = messages.filter((m) => m.channel === "EMAIL").length;
  const pendingCount = messages.filter((m) => m.status === "PENDING").length;

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Communication Engine Monitor</h2>
          <p>
            Developer visibility into planner actions, automation triggers,
            SMS/email activity, ETA updates, and future geofence events.
          </p>
        </div>

        <button onClick={loadMessages}>Refresh</button>
      </div>

      <div className="dashboard-grid">
        <div className="card"><h2>Total Events</h2><p>{totalMessages}</p></div>
        <div className="card"><h2>Planner Manual</h2><p>{plannerManual}</p></div>
        <div className="card"><h2>SMS</h2><p>{smsCount}</p></div>
        <div className="card"><h2>Email</h2><p>{emailCount}</p></div>
        <div className="card"><h2>Pending</h2><p>{pendingCount}</p></div>
      </div>

      <div className="table-card">
        <h2>Filters</h2>

        <div className="action-row">
          <select value={triggerFilter} onChange={(e) => setTriggerFilter(e.target.value)}>
            <option value="ALL">All Triggers</option>
            {triggers.map((trigger) => (
              <option key={trigger} value={trigger}>{trigger}</option>
            ))}
          </select>

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

          <input
            value={loadFilter}
            onChange={(e) => setLoadFilter(e.target.value)}
            placeholder="Filter by Load ID"
          />

          <button
            onClick={() => {
              setTriggerFilter("ALL");
              setChannelFilter("ALL");
              setDirectionFilter("ALL");
              setStatusFilter("ALL");
              setLoadFilter("");
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <CommunicationDetailsPanel
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />

      <div className="table-card">
        <h2>Communication Engine Activity</h2>
        <p>{filteredMessages.length} of {messages.length} records shown.</p>

        {isLoading ? (
          <p>Loading communication engine records...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Created</th>
                <th>Trigger</th>
                <th>Action</th>
                <th>Load</th>
                <th>Direction</th>
                <th>Channel</th>
                <th>Recipient</th>
                <th>Status</th>
                <th>Provider</th>
              </tr>
            </thead>

            <tbody>
              {filteredMessages.map((message) => {
                const trigger = getTrigger(message);

                return (
                  <tr
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{formatEasternDateTime(message.createdAt)}</td>
                    <td>{trigger}</td>
                    <td>{message.relatedEventType}</td>
                    <td>{message.loadId}</td>
                    <td>{message.direction}</td>
                    <td>{message.channel}</td>
                    <td>{message.recipientName || message.recipientContact}</td>
                    <td>{message.status}</td>
                    <td>{message.provider}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
