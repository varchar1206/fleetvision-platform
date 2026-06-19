import "./App.css";

function App() {
  return (
    <main className="app-shell">
      <header className="top-bar">
        <div>
          <h1>FleetVision</h1>
          <p>Transportation visibility and execution platform</p>
        </div>
        <div className="role-badge">Shipper View</div>
      </header>

      <nav className="nav-tabs">
        <button>Dashboard</button>
        <button>Planning</button>
        <button>Tender Queue</button>
        <button>Active Loads</button>
        <button>Completed Loads</button>
        <button>Exceptions</button>
        <button>Performance</button>
      </nav>

      <section className="dashboard-grid">
        <div className="card">
          <h2>Planning</h2>
          <p>Create load entries, build from last week, bulk paste, or upload CSV files.</p>
        </div>

        <div className="card">
          <h2>Tender Queue</h2>
          <p>Tender selected dispatch windows or individual loads to brokers.</p>
        </div>

        <div className="card">
          <h2>Active Loads</h2>
          <p>Track assigned, en route, pickup, delivery, return, delay, and exception statuses.</p>
        </div>

        <div className="card">
          <h2>Exceptions</h2>
          <p>Monitor delays, coverage risks, wrong trailers, unable-to-execute events, and missed updates.</p>
        </div>
      </section>
    </main>
  );
}

export default App;
