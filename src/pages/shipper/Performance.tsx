import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import HistoricalFilters from "../../components/performance/HistoricalFilters";
import HistoricalGrid from "../../components/performance/HistoricalGrid";
import HistoricalMetrics from "../../components/performance/HistoricalMetrics";

const client = generateClient<Schema>();

type LoadRecord = Schema["Load"]["type"];
type ExceptionRecord = Schema["LoadException"]["type"];

export default function Performance() {
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [exceptions, setExceptions] = useState<ExceptionRecord[]>([]);
  const [range, setRange] = useState("30");
  const [isLoading, setIsLoading] = useState(true);

  function isInRange(dateValue: string | null | undefined) {
    if (!dateValue) return false;

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - Number(range));

    return new Date(dateValue) >= cutoff;
  }

  async function loadPerformanceData() {
    setIsLoading(true);

    const loadResult = await client.models.Load.list();
    const exceptionResult = await client.models.LoadException.list();

    setLoads(loadResult.data.filter((load) => isInRange(load.dispatchDate)));
    setExceptions(exceptionResult.data);

    setIsLoading(false);
  }

  useEffect(() => {
    loadPerformanceData();
  }, [range]);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Historical Analytics</h2>
          <p>Review load activity, cost, exceptions, and trends over time.</p>
        </div>
      </div>

      <HistoricalFilters range={range} onRangeChange={setRange} />
      <HistoricalMetrics loads={loads} exceptions={exceptions} />

      {isLoading ? (
        <div className="table-card">
          <p>Loading historical analytics...</p>
        </div>
      ) : (
        <HistoricalGrid loads={loads} />
      )}
    </section>
  );
}
