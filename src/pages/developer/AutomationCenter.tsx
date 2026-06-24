import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import AutomationRuleDetailsPanel from "../../components/communications/AutomationRuleDetailsPanel";
import { processDriverAttestation } from "../../services/communications/processDriverAttestation";
import { executeCommunicationAction } from "../../services/communications/executeCommunicationAction";

const client = generateClient<Schema>();

type CommunicationRecord = Schema["CommunicationLog"]["type"];

const automationRules = [
  {
    name: "Driver Check-In Automation",
    trigger: "SMS_CHECK_IN",
    status: "Simulation Ready",
    description:
      "Processes ENROUTE, ARRIVED, DELAYED and ISSUE responses.",
  },
  {
    name: "Broker ETA Automation",
    trigger: "ETA_UPDATE",
    status: "Planned",
    description:
      "Automatically notifies brokers when ETA risk increases.",
  },
  {
    name: "Arrival Notification Automation",
    trigger: "GEOFENCE_EVENT",
    status: "Planned",
    description:
      "Triggers notifications when trucks enter stop geofences.",
  },
  {
    name: "System Communication Queue",
    trigger: "SYSTEM_AUTOMATION",
    status: "Simulation Ready",
    description:
      "Monitors communication processing lifecycle.",
  },
];

export default function AutomationCenter() {
  const [selectedRule, setSelectedRule] = useState<any>(null);
  const [messages, setMessages] = useState<CommunicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadId, setLoadId] = useState("");
  const [driverName, setDriverName] = useState("Test Driver");
  const [driverPhone, setDriverPhone] = useState("+15555550101");
  const [brokerName, setBrokerName] = useState("Test Broker");
  const [brokerEmail, setBrokerEmail] = useState("broker@example.com");
  const [status, setStatus] = useState("");

  async function loadMessages() {
    setIsLoading(true);
    const result = await client.models.CommunicationLog.list();
    setMessages(result.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function simulateDriverReply(message: "ENROUTE" | "ARRIVED" | "DELAYED") {
    try {
      setStatus(`Simulating driver ${message}...`);

      await processDriverAttestation({
        loadId,
        driverName,
        driverPhone,
        message,
      });

      await loadMessages();
      setStatus(`Simulation complete: DRIVER ${message}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Simulation failed.");
    }
  }

  async function simulateEtaRisk() {
    try {
      setStatus("Simulating ETA risk broker update...");

      await executeCommunicationAction({
        loadId,
        actionType: "BROKER_LOAD_UPDATE",
        triggerSource: "ETA_UPDATE",
        recipientName: brokerName,
        recipientEmail: brokerEmail,
      });

      await loadMessages();
      setStatus("Simulation complete: ETA risk broker update");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Simulation failed.");
    }
  }

  async function simulateGeofenceArrival() {
    try {
      setStatus("Simulating geofence arrival notice...");

      await executeCommunicationAction({
        loadId,
        actionType: "BROKER_ARRIVAL_NOTICE",
        triggerSource: "GEOFENCE_EVENT",
        recipientName: brokerName,
        recipientEmail: brokerEmail,
      });

      await loadMessages();
      setStatus("Simulation complete: geofence arrival notice");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Simulation failed.");
    }
  }

  async function simulateBrokerNotice() {
    try {
      setStatus("Simulating system broker notice...");

      await executeCommunicationAction({
        loadId,
        actionType: "BROKER_LOAD_UPDATE",
        triggerSource: "SYSTEM_AUTOMATION",
        recipientName: brokerName,
        recipientEmail: brokerEmail,
      });

      await loadMessages();
      setStatus("Simulation complete: system broker notice");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Simulation failed.");
    }
  }

  const pending = messages.filter((m) => m.status === "PENDING").length;
  const sent = messages.filter((m) => m.status === "SENT").length;
  const received = messages.filter((m) => m.status === "RECEIVED").length;
  const failed = messages.filter((m) => m.status === "FAILED").length;

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Automation Center</h2>
          <p>
            Central management for communication automation, simulation testing,
            and future geofence processing.
          </p>
        </div>

        <button onClick={loadMessages}>Refresh</button>
      </div>

      <div className="dashboard-grid">
        <div className="card"><h2>Pending Queue</h2><p>{pending}</p></div>
        <div className="card"><h2>Sent</h2><p>{sent}</p></div>
        <div className="card"><h2>Received</h2><p>{received}</p></div>
        <div className="card"><h2>Failed</h2><p>{failed}</p></div>
      </div>

      <div className="table-card">
        <h2>Automation Rules</h2>

        {isLoading ? (
          <p>Loading automation rules...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Rule</th>
                <th>Trigger</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {automationRules.map((rule) => (
                <tr
                  key={rule.name}
                  onClick={() => setSelectedRule(rule)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{rule.name}</td>
                  <td>{rule.trigger}</td>
                  <td>{rule.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="table-card">
        <h2>Simulation Console</h2>

        <div className="communication-form-grid">
          <label>
            <span>Load ID</span>
            <input value={loadId} onChange={(e) => setLoadId(e.target.value)} placeholder="Load ID" />
          </label>

          <label>
            <span>Driver Name</span>
            <input value={driverName} onChange={(e) => setDriverName(e.target.value)} placeholder="Driver Name" />
          </label>

          <label>
            <span>Driver Phone</span>
            <input value={driverPhone} onChange={(e) => setDriverPhone(e.target.value)} placeholder="+15555550101" />
          </label>

          <label>
            <span>Broker Name</span>
            <input value={brokerName} onChange={(e) => setBrokerName(e.target.value)} placeholder="Broker Name" />
          </label>

          <label>
            <span>Broker Email</span>
            <input value={brokerEmail} onChange={(e) => setBrokerEmail(e.target.value)} placeholder="broker@example.com" />
          </label>
        </div>

        <div className="communication-action-grid" style={{ marginTop: "18px" }}>
          <button onClick={() => simulateDriverReply("ENROUTE")}>Simulate Driver ENROUTE</button>
          <button onClick={() => simulateDriverReply("ARRIVED")}>Simulate Driver ARRIVED</button>
          <button onClick={() => simulateDriverReply("DELAYED")}>Simulate Driver DELAYED</button>
          <button onClick={simulateEtaRisk}>Simulate ETA Risk</button>
          <button onClick={simulateGeofenceArrival}>Simulate Geofence Arrival</button>
          <button onClick={simulateBrokerNotice}>Simulate Broker Notice</button>
        </div>

        {status && (
          <div className="communication-status">
            <strong>Status:</strong> {status}
          </div>
        )}
      </div>

      <AutomationRuleDetailsPanel
        rule={selectedRule}
        onClose={() => setSelectedRule(null)}
      />
    </section>
  );
}
