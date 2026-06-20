import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import TenderActions from "../../components/tender/TenderActions";
import TenderGrid from "../../components/tender/TenderGrid";
import TenderFilters from "../../components/tender/TenderFilters";
import TenderMetrics from "../../components/tender/TenderMetrics";

const client = generateClient<Schema>();

type LoadRecord = Schema["Load"]["type"];

export default function TenderQueue() {
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [selectedLoadIds, setSelectedLoadIds] = useState<string[]>([]);
  const [batchTenderTime, setBatchTenderTime] = useState("16:00");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");

  async function loadTenderQueue() {
    setIsLoading(true);

    const result = await client.models.Load.list();

    const queueLoads = result.data.filter(
      (load) => load.status === "READY_TO_TENDER" || load.status === "TENDERED"
    );

    setLoads(queueLoads);
    setIsLoading(false);
  }

  function toggleSelected(loadId: string) {
    setSelectedLoadIds((current) =>
      current.includes(loadId)
        ? current.filter((id) => id !== loadId)
        : [...current, loadId]
    );
  }

  function toggleSelectAll() {
    if (selectedLoadIds.length === loads.length) {
      setSelectedLoadIds([]);
      return;
    }

    setSelectedLoadIds(loads.map((load) => load.id));
  }

  async function tenderSelected() {
    const selectedLoads = loads.filter((load) => selectedLoadIds.includes(load.id));

    if (selectedLoads.length === 0) {
      alert("Select at least one load to tender.");
      return;
    }

    await Promise.all(
      selectedLoads.map((load) =>
        client.models.Load.update({
          id: load.id,
          status: "TENDERED",
          notes: `Tendered in batch at ${batchTenderTime}.`,
        })
      )
    );

    setSelectedLoadIds([]);
    await loadTenderQueue();
  }

  async function recallSelected() {
    const selectedLoads = loads.filter((load) => selectedLoadIds.includes(load.id));

    if (selectedLoads.length === 0) {
      alert("Select at least one load to recall.");
      return;
    }

    await Promise.all(
      selectedLoads.map((load) =>
        client.models.Load.update({
          id: load.id,
          status: "READY_TO_TENDER",
          notes: "Tender recalled.",
        })
      )
    );

    setSelectedLoadIds([]);
    await loadTenderQueue();
  }

  useEffect(() => {
    loadTenderQueue();
  }, []);

  const filteredLoads = loads.filter((load) => {
    const searchValue = searchTerm.toLowerCase();

    const matchesSearch =
      load.storeNumber?.toLowerCase().includes(searchValue) ||
      load.brokerName?.toLowerCase().includes(searchValue) ||
      load.status?.toLowerCase().includes(searchValue);

    const matchesStatus = statusFilter === "ALL" || load.status === statusFilter;
    const matchesDate = !dateFilter || load.dispatchDate === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Tender Queue</h2>
          <p>Select individual loads and create flexible batch tenders without fixed dispatch windows.</p>
        </div>
      </div>

      <TenderMetrics loads={loads} selectedCount={selectedLoadIds.length} />

      <TenderFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        dateFilter={dateFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
        onDateChange={setDateFilter}
        onClear={() => {
          setSearchTerm("");
          setStatusFilter("ALL");
          setDateFilter("");
        }}
      />

      <TenderActions
        selectedCount={selectedLoadIds.length}
        batchTenderTime={batchTenderTime}
        onBatchTenderTimeChange={setBatchTenderTime}
        onSelectAll={toggleSelectAll}
        onTenderSelected={tenderSelected}
        onRecallSelected={recallSelected}
      />

      {isLoading ? (
        <div className="table-card">
          <p>Loading tender queue...</p>
        </div>
      ) : (
        <TenderGrid
          loads={filteredLoads}
          selectedLoadIds={selectedLoadIds}
          onToggleSelected={toggleSelected}
        />
      )}
    </section>
  );
}
