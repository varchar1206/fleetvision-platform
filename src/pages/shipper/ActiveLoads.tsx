import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import ActiveFilters from "../../components/active/ActiveFilters";
import ActiveGrid from "../../components/active/ActiveGrid";
import ActiveMetrics from "../../components/active/ActiveMetrics";
import { buildEtaSummary } from "../../utils/eta/buildEtaSummary";

const client = generateClient<Schema>();

type LoadRecord = Schema["Load"]["type"];

export default function ActiveLoads() {
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [etaFilter, setEtaFilter] = useState("ALL");

  async function loadActiveLoads() {
    setIsLoading(true);

    const result = await client.models.Load.list();

    setLoads(result.data.filter((load) => load.status === "ACCEPTED"));
    setIsLoading(false);
  }

  useEffect(() => {
    loadActiveLoads();
  }, []);

  const filteredLoads = loads.filter((load) => {
    const searchValue = searchTerm.toLowerCase();

    const matchesSearch =
      load.storeNumber?.toLowerCase().includes(searchValue) ||
      load.brokerName?.toLowerCase().includes(searchValue) ||
      load.status?.toLowerCase().includes(searchValue);

    const matchesDate = !dateFilter || load.dispatchDate === dateFilter;

    const eta = buildEtaSummary(
      load.dispatchDate,
      load.dispatchWindow,
      load.plannedTravelTime,
      load.commitmentTime,
      load.etaStartTime
    );

    const matchesEta = etaFilter === "ALL" || eta.etaStatus === etaFilter;

    return matchesSearch && matchesDate && matchesEta;
  });

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Active Loads</h2>
          <p>Accepted loads ready for execution tracking.</p>
        </div>
      </div>

      <ActiveMetrics loads={filteredLoads} />

      <ActiveFilters
        searchTerm={searchTerm}
        dateFilter={dateFilter}
        onSearchChange={setSearchTerm}
        onDateChange={setDateFilter}
        onClear={() => {
          setSearchTerm("");
          setDateFilter("");
          setEtaFilter("ALL");
        }}
      />

      <div className="table-card">
        <h2>ETA Filter</h2>
        <div className="action-row">
          <select value={etaFilter} onChange={(e) => setEtaFilter(e.target.value)}>
            <option value="ALL">All ETA Statuses</option>
            <option value="ON_TIME">On Time</option>
            <option value="AT_RISK">At Risk</option>
            <option value="LATE">Late</option>
            <option value="UNKNOWN">Unknown</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="table-card">
          <p>Loading active loads...</p>
        </div>
      ) : (
        <ActiveGrid loads={filteredLoads} />
      )}
    </section>
  );
}
