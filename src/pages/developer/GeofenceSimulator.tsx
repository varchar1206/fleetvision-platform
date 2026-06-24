import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import { executeCommunicationAction } from "../../services/communications/executeCommunicationAction";

const client = generateClient<Schema>();

export default function GeofenceSimulator() {
  const [loadId, setLoadId] = useState("");
  const [locationName, setLocationName] = useState("");
  const [brokerName, setBrokerName] = useState("Test Broker");
  const [brokerEmail, setBrokerEmail] = useState("broker@example.com");
  const [status, setStatus] = useState("");

  async function simulateEvent(eventType: string) {
    try {
      setStatus(`Creating ${eventType} event...`);

      await client.models.LoadEvent.create({
        loadId,
        eventType,
        eventSource: "GEOFENCE",
        eventTime: new Date().toISOString(),
        notes: `Simulated geofence event at ${locationName}`,
      });

      if (eventType === "GEOFENCE_ARRIVAL") {
        await executeCommunicationAction({
          loadId,
          actionType: "BROKER_ARRIVAL_NOTICE",
          triggerSource: "GEOFENCE_EVENT",
          recipientName: brokerName,
          recipientEmail: brokerEmail,
        });

        setStatus(`${eventType} created and broker arrival notice queued.`);
        return;
      }

      setStatus(`${eventType} created successfully.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Simulation failed.");
    }
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Geofence Simulator</h2>
          <p>
            Simulate arrival and departure events before GPS-based geofencing is connected.
            Arrival events can also trigger broker notifications through the Communication Engine.
          </p>
        </div>
      </div>

      <div className="table-card">
        <h2>Simulation Inputs</h2>

        <div className="communication-form-grid">
          <label>
            <span>Load ID</span>
            <input value={loadId} onChange={(e) => setLoadId(e.target.value)} placeholder="Load ID" />
          </label>

          <label>
            <span>Location Name</span>
            <input value={locationName} onChange={(e) => setLocationName(e.target.value)} placeholder="Customer / Warehouse" />
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

        <div className="communication-action-grid" style={{ marginTop: "20px" }}>
          <button onClick={() => simulateEvent("GEOFENCE_ARRIVAL")}>
            Simulate Arrival + Broker Notice
          </button>

          <button onClick={() => simulateEvent("GEOFENCE_DEPARTURE")}>
            Simulate Departure
          </button>
        </div>

        {status && (
          <div className="communication-status">
            <strong>Status:</strong> {status}
          </div>
        )}
      </div>
    </section>
  );
}
