export default function BrokerDashboard() {
  return (
    <section className="dashboard-grid">
      <div className="card">
        <h2>Tenders Pending</h2>
        <p>6 loads awaiting broker acceptance.</p>
      </div>

      <div className="card">
        <h2>Carrier Assignment</h2>
        <p>12 accepted loads need carrier assignment.</p>
      </div>

      <div className="card">
        <h2>Active Loads</h2>
        <p>31 broker-managed loads currently active.</p>
      </div>

      <div className="card">
        <h2>Exceptions</h2>
        <p>2 loads require broker action.</p>
      </div>
    </section>
  );
}
