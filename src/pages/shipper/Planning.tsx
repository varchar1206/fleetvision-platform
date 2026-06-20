const plannedLoads = [
  {
    date: "2026-06-24",
    day: "Wed",
    store: "S040",
    dispatchTime: "16:00",
    activity: "D/S",
    equipment: "Power Only",
    broker: "Beckers",
    rate: "$1,162.00",
    status: "Draft",
  },
  {
    date: "2026-06-24",
    day: "Wed",
    store: "S047",
    dispatchTime: "16:00",
    activity: "D/S",
    equipment: "Power Only",
    broker: "Beckers",
    rate: "$1,166.00",
    status: "Draft",
  },
  {
    date: "2026-06-24",
    day: "Wed",
    store: "S060",
    dispatchTime: "20:00",
    activity: "Unload",
    equipment: "Power Only",
    broker: "Beckers",
    rate: "$1,162.00",
    status: "Draft",
  },
];

export default function Planning() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Planning</h2>
          <p>Create and manage future loads before trip IDs are assigned.</p>
        </div>
      </div>

      <div className="action-row">
        <button>Create Load Entry</button>
        <button>Create From Last Week</button>
        <button>Bulk Paste Loads</button>
        <button>CSV Upload</button>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Draft Plans</h2>
          <p>2 plans currently being prepared.</p>
        </div>

        <div className="card">
          <h2>Published Plans</h2>
          <p>1 plan ready for tendering.</p>
        </div>

        <div className="card">
          <h2>Archived Plans</h2>
          <p>Historical planning records available.</p>
        </div>

        <div className="card">
          <h2>Default View</h2>
          <p>Grid View active. Calendar View available later.</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Week 25 Draft Plan</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Store</th>
              <th>Dispatch</th>
              <th>Activity</th>
              <th>Equipment</th>
              <th>Broker</th>
              <th>Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {plannedLoads.map((load) => (
              <tr key={`${load.date}-${load.store}-${load.dispatchTime}`}>
                <td>{load.date}</td>
                <td>{load.day}</td>
                <td>{load.store}</td>
                <td>{load.dispatchTime}</td>
                <td>{load.activity}</td>
                <td>{load.equipment}</td>
                <td>{load.broker}</td>
                <td>{load.rate}</td>
                <td>{load.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
