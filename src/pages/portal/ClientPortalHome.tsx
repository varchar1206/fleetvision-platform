import { clientPortals } from "../../config/clientPortals";

type PortalKey = keyof typeof clientPortals;

type Props = {
  portal: PortalKey;
};

export default function ClientPortalHome({ portal }: Props) {
  const config = clientPortals[portal];

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>{config.title}</h2>
          <p>{config.subtitle}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Company Profile</h2>
          <p>Review company information, DOT/MC numbers, logo, contact details, and status.</p>
        </div>

        <div className="card">
          <h2>User Profile</h2>
          <p>Review name, email, phone, role, and avatar placeholder.</p>
        </div>

        <div className="card">
          <h2>Relationships</h2>
          <p>View connected shippers, brokers, carriers, or drivers.</p>
        </div>

        <div className="card">
          <h2>Documents</h2>
          <p>Future home for logos, avatars, PODs, BOLs, insurance, and uploaded files.</p>
        </div>
      </div>
    </section>
  );
}
