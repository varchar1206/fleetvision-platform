export default function RelationshipsPage() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Relationships</h2>
          <p>Saved shippers, brokers, carriers, and drivers will display here.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card"><h2>My Brokers</h2><p>Saved broker relationships.</p></div>
        <div className="card"><h2>My Carriers</h2><p>Saved carrier relationships.</p></div>
        <div className="card"><h2>My Drivers</h2><p>Saved driver relationships.</p></div>
      </div>
    </section>
  );
}
