import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import LoadEventGrid from "../../components/events/LoadEventGrid";
import LoadEventMetrics from "../../components/events/LoadEventMetrics";

const client = generateClient<Schema>();

type LoadEventRecord = Schema["LoadEvent"]["type"];

export default function LoadEventHistory() {
  const [events, setEvents] = useState<LoadEventRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadEvents() {
    setIsLoading(true);
    const result = await client.models.LoadEvent.list();
    setEvents(result.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Load Event History</h2>
          <p>Audit trail for workflow, GPS, geofence, and exception events.</p>
        </div>
      </div>

      <LoadEventMetrics events={events} />

      {isLoading ? (
        <div className="table-card">
          <p>Loading load events...</p>
        </div>
      ) : (
        <LoadEventGrid events={events} />
      )}
    </section>
  );
}
