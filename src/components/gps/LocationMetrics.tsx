import type { Schema } from "../../../amplify/data/resource";

type DriverLocationRecord = Schema["DriverLocation"]["type"];

type Props = {
  locations: DriverLocationRecord[];
};

export default function LocationMetrics({ locations }: Props) {
  return (
    <div className="dashboard-grid">
      <div className="card"><h2>Total Location Updates</h2><p>{locations.length}</p></div>
      <div className="card"><h2>Tracked Loads</h2><p>{new Set(locations.map((item) => item.loadId)).size}</p></div>
      <div className="card"><h2>Latest Source</h2><p>{locations[0]?.source || "None"}</p></div>
      <div className="card"><h2>Latest Update</h2><p>{locations[0]?.recordedAt || "None"}</p></div>
    </div>
  );
}
