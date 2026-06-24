export default function UserProfilePage() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>User Profile</h2>
          <p>User details, avatar placeholder, role, phone, and email.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Avatar Placeholder</h2>
          <p>Future S3 upload area for user profile image.</p>
          <button>Upload Avatar</button>
        </div>

        <div className="card">
          <h2>User Information</h2>
          <p>Name, email, phone, role, organization, and profile status.</p>
        </div>
      </div>
    </section>
  );
}
