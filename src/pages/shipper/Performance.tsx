const carrierPerformance = [
  {
    carrier: "Test Carrier",
    loads: 124,
    onTime: "96%",
    late: "4%",
    tracking: "98%",
    exceptions: 3,
  },
  {
    carrier: "ABC Transport",
    loads: 88,
    onTime: "94%",
    late: "6%",
    tracking: "95%",
    exceptions: 5,
  },
  {
    carrier: "Owner Operator 1",
    loads: 32,
    onTime: "97%",
    late: "3%",
    tracking: "91%",
    exceptions: 1,
  },
];

export default function Performance() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Performance</h2>
          <p>Review on-time performance, late arrivals, tracking participation, and exception trends.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Loads Completed</h2>
          <p>244 completed this period.</p>
        </div>

        <div className="card">
          <h2>On-Time Rate</h2>
          <p>95.8% arrived on time.</p>
        </div>

        <div className="card">
          <h2>Late Arrival Rate</h2>
          <p>4.2% arrived late.</p>
        </div>

        <div className="card">
          <h2>Tracking Participation</h2>
          <p>96.5% GPS or SMS participation.</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Carrier Performance</h2>
        <table>
          <thead>
            <tr>
              <th>Carrier</th>
              <th>Loads</th>
              <th>On Time</th>
              <th>Late</th>
              <th>Tracking</th>
              <th>Exceptions</th>
            </tr>
          </thead>
          <tbody>
            {carrierPerformance.map((item) => (
              <tr key={item.carrier}>
                <td>{item.carrier}</td>
                <td>{item.loads}</td>
                <td>{item.onTime}</td>
                <td>{item.late}</td>
                <td>{item.tracking}</td>
                <td>{item.exceptions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
