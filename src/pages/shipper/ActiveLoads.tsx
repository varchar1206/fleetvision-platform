import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import ActiveFilters from "../../components/active/ActiveFilters";
import ActiveGrid from "../../components/active/ActiveGrid";
import ActiveMetrics from "../../components/active/ActiveMetrics";

const client = generateClient<Schema>();

type LoadRecord = Schema["Load"]["type"];

export default function ActiveLoads() {
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

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

    return matchesSearch && matchesDate;
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
        }}
      />

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
