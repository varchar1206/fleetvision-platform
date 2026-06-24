import { useState } from "react";
import { processDriverAttestation } from "../../services/communications/processDriverAttestation";

export default function DriverAttestationTestPage() {
  const [loadId, setLoadId] = useState("");
  const [driverName, setDriverName] = useState("Test Driver");
  const [driverPhone, setDriverPhone] = useState("+15555550101");
  const [message, setMessage] = useState("ENROUTE");
  const [result, setResult] = useState("");

  async function submitAttestation() {
    if (!loadId || !message) {
      alert("Load ID and message are required.");
      return;
    }

    await processDriverAttestation({
      loadId,
      driverName,
      driverPhone,
      message,
    });

    setResult(`Processed ${message} for load ${loadId}.`);
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Driver Attestation Test</h2>
          <p>Simulate inbound SMS replies before connecting AWS SMS.</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Simulated SMS Reply</h2>

        <div className="action-row">
          <input placeholder="Load ID" value={loadId} onChange={(e) => setLoadId(e.target.value)} />
          <input placeholder="Driver Name" value={driverName} onChange={(e) => setDriverName(e.target.value)} />
          <input placeholder="Driver Phone" value={driverPhone} onChange={(e) => setDriverPhone(e.target.value)} />

          <select value={message} onChange={(e) => setMessage(e.target.value)}>
            <option value="ENROUTE">ENROUTE</option>
            <option value="ARRIVED">ARRIVED</option>
            <option value="DELAYED">DELAYED</option>
          </select>

          <button onClick={submitAttestation}>Process Reply</button>
        </div>

        {result && <p>{result}</p>}
      </div>
    </section>
  );
}
