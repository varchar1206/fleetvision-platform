const completedLoads = [
  {
    store: "S040",
    tripId: "1457995",
    window: "16:00",
    completedAt: "18:42",
    carrier: "Test Carrier",
    onTime: "Yes",
    lateMinutes: "0",
    bol: "Uploaded",
    status: "Completed",
  },
  {
    store: "S047",
    tripId: "1457996",
    window: "20:00",
    completedAt: "22:35",
    carrier: "Test Carrier",
    onTime: "No",
    lateMinutes: "35",
    bol: "Pending",
    status: "Completed",
  },
  {
    store: "S060",
    tripId: "1457997",
    window: "20:00",
    completedAt: "-",
    carrier: "Test Carrier",
    onTime: "No",
    lateMinutes: "-",
    bol: "N/A",
    status: "Unable To Execute",
  },
];

export default function CompletedLoads() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Completed Loads</h2>
          <p>Review completed, cancelled, and unable-to-execute loads.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Completed Today</h2>
          <p>48 loads completed.</p>
        </div>

        <div className="card">
          <h2>On-Time Deliveries</h2>
          <p>44 loads arrived on time.</p>
        </div>

        <div className="card">
          <h2>Late Deliveries</h2>
          <p>3 loads arrived late.</p>
        </div>

        <div className="card">
          <h2>Cancelled / UTE</h2>
          <p>1 load cancelled or unable to execute.</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Completed Load History</h2>
        <table>
          <thead>
            <tr>
              <th>Store</th>
              <th>Trip ID</th>
              <th>Window</th>
              <th>Completed At</th>
              <th>Carrier</th>
              <th>On Time</th>
              <th>Late Minutes</th>
              <th>BOL</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {completedLoads.map((load) => (
              <tr key={load.tripId}>
                <td>{load.store}</td>
                <td>{load.tripId}</td>
                <td>{load.window}</td>
                <td>{load.completedAt}</td>
                <td>{load.carrier}</td>
                <td>{load.onTime}</td>
                <td>{load.lateMinutes}</td>
                <td>{load.bol}</td>
                <td>{load.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
