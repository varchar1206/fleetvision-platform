import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

type LoadRecord = Schema["Load"]["type"];

const dispatchWindows = ["08:00", "16:00", "18:00", "20:00", "02:00", "04:00"];
const dispatchHours = Array.from({ length: 24 }, (_, hour) =>
  `${String(hour).padStart(2, "0")}:00`
);

export default function Planning() {
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [storeNumber, setStoreNumber] = useState("");
  const [dispatchDate, setDispatchDate] = useState("2026-06-24");
  const [dispatchWindow, setDispatchWindow] = useState("16:00");
  const [dispatchHour, setDispatchHour] = useState("16:00");
  const [activityType, setActivityType] = useState("D/S");
  const [equipmentType, setEquipmentType] = useState("Power Only");
  const [brokerName, setBrokerName] = useState("Beckers");
  const [rate, setRate] = useState("");

  async function loadPlanningRecords() {
    setIsLoading(true);
    const result = await client.models.Load.list();
    setLoads(result.data);
    setIsLoading(false);
  }

  async function createLoadEntry() {
    if (!storeNumber || !dispatchDate || !dispatchWindow || !activityType) {
      alert("Store, date, dispatch window, and activity are required.");
      return;
    }

    await client.models.Load.create({
      storeNumber,
      dispatchDate,
      dispatchWindow,
      activityType,
      equipmentType,
      brokerName,
      carrierName: "",
      tripId: dispatchHour,
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

  async function deleteLoad(load: LoadRecord) {
    if (load.status !== "DRAFT") {
      alert("Only draft loads can be deleted from Planning. Tendered or active loads must use recall/cancel workflow.");
      return;
    }

    const confirmed = confirm(`Delete draft load for ${load.storeNumber}?`);
    if (!confirmed) return;

    await client.models.Load.delete({ id: load.id });
    await loadPlanningRecords();
  }

  useEffect(() => {
    loadPlanningRecords();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Planning</h2>
          <p>Create individual loads, then group them by dispatch window for tendering.</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Create Load Entry</h2>

        <div className="action-row">
          <input placeholder="Store Number" value={storeNumber} onChange={(e) => setStoreNumber(e.target.value)} />
          <input type="date" value={dispatchDate} onChange={(e) => setDispatchDate(e.target.value)} />

          <select value={dispatchWindow} onChange={(e) => setDispatchWindow(e.target.value)}>
            {dispatchWindows.map((window) => (
              <option key={window} value={window}>{window} Window</option>
            ))}
          </select>

          <select value={dispatchHour} onChange={(e) => setDispatchHour(e.target.value)}>
            {dispatchHours.map((hour) => (
              <option key={hour} value={hour}>{hour}</option>
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
          <h2>Dispatch Windows</h2>
          <p>08:00, 16:00, 18:00, 20:00, 02:00, 04:00</p>
        </div>

        <div className="card">
          <h2>Dispatch Hours</h2>
          <p>0000 through 2300 available.</p>
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
                <th>Date</th>
                <th>Store</th>
                <th>Window</th>
                <th>Dispatch Hour</th>
                <th>Activity</th>
                <th>Equipment</th>
                <th>Broker</th>
                <th>Rate</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loads.map((load) => (
                <tr key={load.id}>
                  <td>{load.dispatchDate}</td>
                  <td>{load.storeNumber}</td>
                  <td>{load.dispatchWindow}</td>
                  <td>{load.tripId}</td>
                  <td>{load.activityType}</td>
                  <td>{load.equipmentType}</td>
                  <td>{load.brokerName}</td>
                  <td>{load.rate ? `$${load.rate.toFixed(2)}` : ""}</td>
                  <td>{load.status}</td>
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
