const exceptions = [
  {
    priority: "High",
    store: "S040",
    tripId: "1457995",
    type: "Mechanical Breakdown",
    delayPhase: "IN_TRANSIT",
    etaImpact: "+120 min",
    status: "Open",
  },
  {
    priority: "Medium",
    store: "S047",
    tripId: "1457996",
    type: "Traffic Delay",
    delayPhase: "IN_TRANSIT",
    etaImpact: "+35 min",
    status: "Monitoring",
  },
  {
    priority: "Medium",
    store: "S060",
    tripId: "1457997",
    type: "Wrong Trailer",
    delayPhase: "AT_PICKUP",
    etaImpact: "Unknown",
    status: "Open",
  },
];

export default function Exceptions() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Exceptions</h2>
          <p>Monitor delays, equipment issues, missed ETAs, and unable-to-execute events.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Open Exceptions</h2>
          <p>5 exceptions currently open.</p>
        </div>

        <div className="card">
          <h2>High Priority</h2>
          <p>1 exception needs immediate attention.</p>
        </div>

        <div className="card">
          <h2>In-Transit Delays</h2>
          <p>2 loads delayed after pickup.</p>
        </div>

        <div className="card">
          <h2>Equipment Issues</h2>
          <p>1 wrong trailer or equipment issue.</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Exception Queue</h2>
        <table>
          <thead>
            <tr>
              <th>Priority</th>
              <th>Store</th>
              <th>Trip ID</th>
              <th>Type</th>
              <th>Delay Phase</th>
              <th>ETA Impact</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {exceptions.map((item) => (
              <tr key={item.tripId}>
                <td>{item.priority}</td>
                <td>{item.store}</td>
                <td>{item.tripId}</td>
                <td>{item.type}</td>
                <td>{item.delayPhase}</td>
                <td>{item.etaImpact}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
