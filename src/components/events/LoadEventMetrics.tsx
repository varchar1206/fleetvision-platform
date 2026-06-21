import type { Schema } from "../../../amplify/data/resource";

type LoadEventRecord = Schema["LoadEvent"]["type"];

type Props = {
  events: LoadEventRecord[];
};

export default function LoadEventMetrics({ events }: Props) {
  return (
    <div className="dashboard-grid">
      <div className="card"><h2>Total Events</h2><p>{events.length}</p></div>
      <div className="card"><h2>GPS Events</h2><p>{events.filter((e) => e.latitude && e.longitude).length}</p></div>
      <div className="card"><h2>Delay Events</h2><p>{events.filter((e) => e.delayReason).length}</p></div>
      <div className="card"><h2>Latest Event</h2><p>{events[0]?.eventType || "None"}</p></div>
    </div>
  );
}
