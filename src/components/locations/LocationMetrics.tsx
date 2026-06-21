import type { Schema } from "../../../amplify/data/resource";

type LocationRecord = Schema["Location"]["type"];

type Props = {
  locations: LocationRecord[];
};

export default function LocationMetrics({ locations }: Props) {
  return (
    <div className="dashboard-grid">
      <div className="card"><h2>Total Locations</h2><p>{locations.length}</p></div>
      <div className="card"><h2>Stores</h2><p>{locations.filter((l) => l.locationType === "STORE").length}</p></div>
      <div className="card"><h2>With Geofence</h2><p>{locations.filter((l) => l.latitude && l.longitude).length}</p></div>
      <div className="card"><h2>Missing GPS</h2><p>{locations.filter((l) => !l.latitude || !l.longitude).length}</p></div>
    </div>
  );
}
