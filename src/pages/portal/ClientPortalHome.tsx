import { portalDefinitions, type PortalKey } from "../../portal/config/portalDefinitions";
import FleetCard from "../../components/ui/FleetCard";
import FleetGrid from "../../design-system/layout/FleetGrid";
import FleetPage from "../../design-system/layout/FleetPage";

type Props = {
  portal: PortalKey;
};

export default function ClientPortalHome({ portal }: Props) {
  const config = portalDefinitions[portal];

  return (
    <FleetPage title={config.title} description={config.subtitle}>
      <FleetGrid columns={2}>
        <FleetCard title="Company Profile" eyebrow="Company Profile">
          <p>Review company information, DOT/MC numbers, logo, contact details, and status.</p>
        </FleetCard>

        <FleetCard title="User Profile" eyebrow="User Profile">
          <p>Review name, email, phone, role, and avatar placeholder.</p>
        </FleetCard>

        <FleetCard title="Relationships" eyebrow="Relationships">
          <p>View connected shippers, brokers, carriers, or drivers.</p>
        </FleetCard>

        <FleetCard title="Documents" eyebrow="Documents">
          <p>Future home for logos, avatars, PODs, BOLs, insurance, and uploaded files.</p>
        </FleetCard>
      </FleetGrid>
    </FleetPage>
  );
}
