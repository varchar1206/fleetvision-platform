import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

type LoadRecord = Schema["Load"]["type"];

const dispatchTimes = Array.from({ length: 24 }, (_, hour) =>
  `${String(hour).padStart(2, "0")}:00`
);

export default function Planning() {
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLoadIds, setSelectedLoadIds] = useState<string[]>([]);

  const [storeNumber, setStoreNumber] = useState("");
  const [dispatchDate, setDispatchDate] = useState("2026-06-24");
  const [dispatchTime, setDispatchTime] = useState("16:00");
  const [activityType, setActivityType] = useState("D/S");
  const [equipmentType, setEquipmentType] = useState("Power Only");
  const [brokerName, setBrokerName] = useState("Beckers");
  const [rate, setRate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");

  async function loadPlanningRecords() {
    setIsLoading(true);
    const result = await client.models.Load.list();
    setLoads(result.data);
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

  async function createLoadEntry() {
    if (!storeNumber || !dispatchDate || !dispatchTime || !activityType) {
      alert("Store, date, dispatch time, and activity are required.");
      return;
    }

    await client.models.Load.create({
      storeNumber,
      dispatchDate,
      dispatchWindow: dispatchTime,
      activityType,
      equipmentType,
      brokerName,
      carrierName: "",
      tripId: dispatchTime,
      rate: rate ? Number(rate) : 0,
      status: "DRAFT",
      bolStatus: "NOT_REQUIRED",
      createdBy: "USER001",
      notes: "Created from FleetVision Planning screen.",
    });

    setStoreNumber("");
    setRate("");
    await loadPlanningRecords();
  }

  async function editLoad(load: LoadRecord) {
    if (load.status !== "DRAFT") {
      alert("Only draft loads can be edited from Planning.");
      return;
    }

    const newStore = prompt("Store Number", load.storeNumber || "");
    if (!newStore) return;

    const newDate = prompt("Dispatch Date", load.dispatchDate || "");
    if (!newDate) return;

    const newDispatchTime = prompt("Dispatch Time", load.tripId || "16:00");
    if (!newDispatchTime) return;

    const newActivity = prompt("Activity Type", load.activityType || "D/S");
    if (!newActivity) return;

    const newEquipment = prompt("Equipment Type", load.equipmentType || "Power Only");
    const newBroker = prompt("Broker", load.brokerName || "Beckers");
    const newRate = prompt("Rate", load.rate ? String(load.rate) : "0");

    await client.models.Load.update({
      id: load.id,
      storeNumber: newStore,
      dispatchDate: newDate,
      dispatchWindow: newDispatchTime,
      tripId: newDispatchTime,
      activityType: newActivity,
      equipmentType: newEquipment || "",
      brokerName: newBroker || "",
      rate: newRate ? Number(newRate) : 0,
    });

    await loadPlanningRecords();
  }

  async function deleteLoad(load: LoadRecord) {
    if (load.status !== "DRAFT") {
      alert("Only draft loads can be deleted from Planning. Tendered or active loads must use recall/cancel workflow.");
      return;
    }

    const confirmed = confirm(`Delete draft load for ${load.storeNumber}?`);
    if (!confirmed) return;

    await client.models.Load.delete({ id: load.id });
    setSelectedLoadIds((current) => current.filter((id) => id !== load.id));
    await loadPlanningRecords();
  }

  async function deleteSelectedDrafts() {
    const selectedLoads = loads.filter((load) => selectedLoadIds.includes(load.id));
    const nonDraftLoads = selectedLoads.filter((load) => load.status !== "DRAFT");

    if (selectedLoads.length === 0) {
      alert("Select at least one load first.");
      return;
    }

    if (nonDraftLoads.length > 0) {
      alert("Only draft loads can be bulk deleted.");
      return;
    }

    const confirmed = confirm(`Delete ${selectedLoads.length} selected draft load(s)?`);
    if (!confirmed) return;

    await Promise.all(
      selectedLoads.map((load) => client.models.Load.delete({ id: load.id }))
    );

    setSelectedLoadIds([]);
    await loadPlanningRecords();
  }

  async function publishSelected() {
    const selectedLoads = loads.filter((load) => selectedLoadIds.includes(load.id));

    if (selectedLoads.length === 0) {
      alert("Select at least one load first.");
      return;
    }

    await Promise.all(
      selectedLoads.map((load) =>
        client.models.Load.update({
          id: load.id,
          status: "PUBLISHED",
        })
      )
    );

    setSelectedLoadIds([]);
    await loadPlanningRecords();
  }

  async function sendSelectedToTenderQueue() {
    const selectedLoads = loads.filter((load) => selectedLoadIds.includes(load.id));

    if (selectedLoads.length === 0) {
      alert("Select at least one load first.");
      return;
    }

    await Promise.all(
      selectedLoads.map((load) =>
        client.models.Load.update({
          id: load.id,
          status: "READY_TO_TENDER",
        })
      )
    );

    setSelectedLoadIds([]);
    await loadPlanningRecords();
  }

  useEffect(() => {
    loadPlanningRecords();
  }, []);

  const filteredLoads = loads.filter((load) => {
    const searchValue = searchTerm.toLowerCase();

    const matchesSearch =
      load.storeNumber?.toLowerCase().includes(searchValue) ||
      load.brokerName?.toLowerCase().includes(searchValue) ||
      load.status?.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "ALL" || load.status === statusFilter;

    const matchesDate =
      !dateFilter || load.dispatchDate === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPlannedCost = filteredLoads.reduce((sum, load) => sum + (load.rate || 0), 0);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Planning</h2>
          <p>Create individual planned loads, then select loads for publishing or tendering.</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Create Load Entry</h2>

        <div className="action-row">
          <input placeholder="Store Number" value={storeNumber} onChange={(e) => setStoreNumber(e.target.value)} />
          <input type="date" value={dispatchDate} onChange={(e) => setDispatchDate(e.target.value)} />

          <select value={dispatchTime} onChange={(e) => setDispatchTime(e.target.value)}>
            {dispatchTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>

          <select value={activityType} onChange={(e) => setActivityType(e.target.value)}>
            <option value="D/S">D/S</option>
            <option value="Unload">Unload</option>
          </select>

          <input value={equipmentType} onChange={(e) => setEquipmentType(e.target.value)} />
          <input value={brokerName} onChange={(e) => setBrokerName(e.target.value)} />
          <input placeholder="Rate" value={rate} onChange={(e) => setRate(e.target.value)} />

          <button onClick={createLoadEntry}>Save Load</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Draft Plans</h2>
          <p>{loads.filter((load) => load.status === "DRAFT").length} draft loads.</p>
        </div>

        <div className="card">
          <h2>Published Plans</h2>
          <p>{loads.filter((load) => load.status === "PUBLISHED").length} published loads.</p>
        </div>

        <div className="card">
          <h2>Selected Loads</h2>
          <p>{selectedLoadIds.length} selected.</p>
        </div>

        <div className="card">
          <h2>Total Planned Cost</h2>
          <p>${totalPlannedCost.toFixed(2)}</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Search & Filters</h2>
        <div className="action-row">
          <input
            placeholder="Search store, broker, or status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="READY_TO_TENDER">Ready To Tender</option>
            <option value="TENDERED">Tendered</option>
          </select>

          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />

          <button onClick={() => { setSearchTerm(""); setStatusFilter("ALL"); setDateFilter(""); }}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className="table-card">
        <h2>Bulk Actions</h2>
        <div className="action-row">
          <button onClick={toggleSelectAll}>Select All / Clear</button>
          <button onClick={deleteSelectedDrafts}>Delete Selected Drafts</button>
          <button onClick={publishSelected}>Publish Selected</button>
          <button onClick={sendSelectedToTenderQueue}>Send Selected To Tender Queue</button>
        </div>
      </div>

      <div className="table-card">
        <h2>Planning Loads</h2>

        {isLoading ? (
          <p>Loading planning records...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Date</th>
                <th>Store</th>
                <th>Dispatch Time</th>
                <th>Activity</th>
                <th>Equipment</th>
                <th>Broker</th>
                <th>Rate</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {filteredLoads.map((load) => (
                <tr key={load.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedLoadIds.includes(load.id)}
                      onChange={() => toggleSelected(load.id)}
                    />
                  </td>
                  <td>{load.dispatchDate}</td>
                  <td>{load.storeNumber}</td>
                  <td>{load.tripId}</td>
                  <td>{load.activityType}</td>
                  <td>{load.equipmentType}</td>
                  <td>{load.brokerName}</td>
                  <td>{load.rate ? `$${load.rate.toFixed(2)}` : ""}</td>
                  <td>{load.status}</td>
                  <td>
                    <button onClick={() => editLoad(load)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => deleteLoad(load)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
