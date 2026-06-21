import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import DailyActivityGrid from "../../components/dashboard/DailyActivityGrid";
import DailyMetrics from "../../components/dashboard/DailyMetrics";

const client = generateClient<Schema>();

type LoadRecord = Schema["Load"]["type"];
type ExceptionRecord = Schema["LoadException"]["type"];

export default function ShipperDashboard() {
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [exceptions, setExceptions] = useState<ExceptionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date().toISOString().slice(0, 10);

  async function loadDailyDashboard() {
    setIsLoading(true);

    const loadResult = await client.models.Load.list();
    const exceptionResult = await client.models.LoadException.list();

    setLoads(loadResult.data.filter((load) => load.dispatchDate === today));
    setExceptions(exceptionResult.data.filter((item) => item.status !== "RESOLVED"));

    setIsLoading(false);
  }

  useEffect(() => {
    loadDailyDashboard();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Daily Operations Dashboard</h2>
          <p>Today's loads, activity, exceptions, and cost exposure.</p>
        </div>
      </div>

      <DailyMetrics loads={loads} exceptions={exceptions} />

      {isLoading ? (
        <div className="table-card">
          <p>Loading daily operations...</p>
        </div>
      ) : (
        <DailyActivityGrid loads={loads} />
      )}
    </section>
  );
}
