export default function DocumentsPage() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Documents</h2>
          <p>Future document and image storage area.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card"><h2>Company Documents</h2><p>Insurance, authority, contracts, and certificates.</p></div>
        <div className="card"><h2>Load Documents</h2><p>PODs, BOLs, invoices, photos, and delivery records.</p></div>
      </div>
    </section>
  );
}
