export default function CompanyProfilePage() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Company Profile</h2>
          <p>Company details, logo placeholder, DOT/MC numbers, and contact information.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Logo Placeholder</h2>
          <p>Future S3 upload area for company logo.</p>
          <button>Upload Logo</button>
        </div>

        <div className="card">
          <h2>Company Information</h2>
          <p>Name, email, phone, address, DOT number, MC number, and verification status.</p>
        </div>
      </div>
    </section>
  );
}
