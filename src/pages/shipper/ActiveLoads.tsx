const activeLoads = [
  {
    store: "S040",
    tripId: "1457995",
    window: "16:00",
    status: "En Route To Pickup",
    eta: "15:45",
    carrier: "Test Carrier",
    tracking: "Active",
  },
  {
    store: "S047",
    tripId: "1457996",
    window: "20:00",
    status: "At Pickup",
    eta: "20:10",
    carrier: "Test Carrier",
    tracking: "Active",
  },
  {
    store: "S060",
    tripId: "1457997",
    window: "20:00",
    status: "Delayed",
    eta: "21:05",
    carrier: "Test Carrier",
    tracking: "SMS Check-In",
  },
];

export default function ActiveLoads() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Active Loads</h2>
          <p>Monitor assigned loads, movement status, ETA, tracking, and exceptions.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Assigned / Active</h2>
          <p>48 loads currently assigned or moving.</p>
        </div>

        <div className="card">
          <h2>On Time</h2>
          <p>45 loads currently on schedule.</p>
        </div>

        <div className="card">
          <h2>Delayed</h2>
          <p>2 loads have reported delays.</p>
        </div>

        <div className="card">
          <h2>Exceptions</h2>
          <p>1 load requires attention.</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Active Load Grid</h2>
        <table>
          <thead>
            <tr>
              <th>Store</th>
              <th>Trip ID</th>
              <th>Window</th>
              <th>Status</th>
              <th>ETA</th>
              <th>Carrier</th>
              <th>Tracking</th>
            </tr>
          </thead>
          <tbody>
            {activeLoads.map((load) => (
              <tr key={load.tripId}>
                <td>{load.store}</td>
                <td>{load.tripId}</td>
                <td>{load.window}</td>
                <td>{load.status}</td>
                <td>{load.eta}</td>
                <td>{load.carrier}</td>
                <td>{load.tracking}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
