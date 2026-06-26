import DispatchProcessNav from "../../../components/load-builder/DispatchProcessNav";

export default function ApprovalQueuePage() {
  return (
    <section>
      <DispatchProcessNav />

      <div className="page-header">
        <div>
          <h2>Approval Queue</h2>
          <p>Review submitted loads, approve or reject them, and unlock approved loads for BOL generation.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Pending Approval</h2>
          <p>Loads submitted from Load Builder will appear here for operational review.</p>
        </div>

        <div className="card">
          <h2>BOL Guardrail</h2>
          <p>Only approved loads may generate a Bill of Lading through DocumentService.</p>
        </div>
      </div>
    </section>
  );
}
