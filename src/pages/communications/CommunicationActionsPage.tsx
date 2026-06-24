import { useState } from "react";
import {
  executeCommunicationAction,
  type CommunicationActionType,
} from "../../services/communications/executeCommunicationAction";

export default function CommunicationActionsPage() {
  const [loadId, setLoadId] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [status, setStatus] = useState("");

  async function runAction(actionType: CommunicationActionType) {
    try {
      setStatus("Sending...");

      await executeCommunicationAction({
        loadId,
        actionType,
        triggerSource: "PLANNER_MANUAL",
        recipientName,
        recipientEmail,
        recipientPhone,
      });

      setStatus(`Action completed: ${actionType}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Action failed.");
    }
  }

  return (
    <main className="communication-actions-page">
      <section className="communication-actions-panel">
        <div className="communication-actions-header">
          <div>
            <h1>Communication Actions</h1>
            <p>
              Planner-facing manual communication controls. These use the same
              communication engine that future geofence, SMS, ETA, and automation
              events will call.
            </p>
          </div>
        </div>

        <div className="communication-section">
          <h2>Load Information</h2>
          <div className="communication-form-grid single">
            <label>
              <span>Load ID</span>
              <input
                value={loadId}
                onChange={(e) => setLoadId(e.target.value)}
                placeholder="Load ID"
              />
            </label>
          </div>
        </div>

        <div className="communication-section">
          <h2>Recipient Information</h2>
          <div className="communication-form-grid">
            <label>
              <span>Recipient Name</span>
              <input
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Driver or Broker"
              />
            </label>

            <label>
              <span>Recipient Email</span>
              <input
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="broker@example.com"
              />
            </label>

            <label>
              <span>Recipient Phone</span>
              <input
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="+15555550101"
              />
            </label>
          </div>
        </div>

        <div className="communication-section">
          <h2>Available Actions</h2>
          <div className="communication-action-grid">
            <button onClick={() => runAction("BROKER_LOAD_UPDATE")}>
              Send Broker Load Update
            </button>
            <button onClick={() => runAction("BROKER_ARRIVAL_NOTICE")}>
              Send Broker Arrival Notice
            </button>
            <button onClick={() => runAction("DRIVER_CHECK_IN_REQUEST")}>
              Send Driver Check-In Request
            </button>
            <button onClick={() => runAction("DRIVER_ETA_UPDATE")}>
              Send Driver ETA Update Request
            </button>
          </div>
        </div>

        {status && (
          <div className="communication-status">
            <strong>Status:</strong> {status}
          </div>
        )}
      </section>
    </main>
  );
}
