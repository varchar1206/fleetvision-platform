const dispatchWindows = [
  {
    window: "16:00",
    loads: 12,
    status: "Ready",
    broker: "Beckers",
  },
  {
    window: "20:00",
    loads: 8,
    status: "Ready",
    broker: "Beckers",
  },
  {
    window: "02:00",
    loads: 6,
    status: "Tendered",
    broker: "Beckers",
  },
  {
    window: "04:00",
    loads: 4,
    status: "Accepted",
    broker: "Beckers",
  },
];

export default function TenderQueue() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Tender Queue</h2>
          <p>
            Group loads by dispatch window and tender them to brokers.
          </p>
        </div>
      </div>

      <div className="action-row">
        <button>Tender Selected Windows</button>
        <button>Tender Single Load</button>
        <button>Recall Tender</button>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Ready To Tender</h2>
          <p>20 loads waiting for tender.</p>
        </div>

        <div className="card">
          <h2>Tendered</h2>
          <p>6 loads awaiting broker response.</p>
        </div>

        <div className="card">
          <h2>Accepted</h2>
          <p>4 loads accepted by broker.</p>
        </div>

        <div className="card">
          <h2>Coverage Risk</h2>
          <p>0 loads currently at risk.</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Dispatch Windows</h2>

        <table>
          <thead>
            <tr>
              <th>Dispatch Window</th>
              <th>Loads</th>
              <th>Broker</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {dispatchWindows.map((item) => (
              <tr key={item.window}>
                <td>{item.window}</td>
                <td>{item.loads}</td>
                <td>{item.broker}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
