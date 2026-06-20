export default function ShipperDashboard() {
  return (
    <section className="dashboard-grid">
      <div className="card">
        <h2>Active Loads</h2>
        <p>48 loads currently moving or assigned.</p>
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
    </section>
  );
}
