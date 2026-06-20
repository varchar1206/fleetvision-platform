import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

type LoadRecord = Schema["Load"]["type"];

export default function Planning() {
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadPlanningRecords() {
    setIsLoading(true);

    const result = await client.models.Load.list();

    setLoads(result.data);
    setIsLoading(false);
  }

  async function createSampleLoad() {
    await client.models.Load.create({
      storeNumber: "S040",
      dispatchDate: "2026-06-24",
      dispatchWindow: "16:00",
      activityType: "D/S",
      equipmentType: "Power Only",
      brokerName: "Beckers",
      carrierName: "",
      tripId: "",
      rate: 1162,
      status: "DRAFT",
      bolStatus: "NOT_REQUIRED",
      createdBy: "USER001",
      notes: "Created from FleetVision Planning screen.",
    });

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
          <p>Create and manage future loads before trip IDs are assigned.</p>
        </div>
      </div>

      <div className="action-row">
        <button onClick={createSampleLoad}>Create Load Entry</button>
        <button>Create From Last Week</button>
        <button>Bulk Paste Loads</button>
        <button>CSV Upload</button>
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
          <h2>Archived Plans</h2>
          <p>Historical planning records available.</p>
        </div>

        <div className="card">
          <h2>Default View</h2>
          <p>Grid View active. Calendar View available later.</p>
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
                <th>Dispatch</th>
                <th>Activity</th>
                <th>Equipment</th>
                <th>Broker</th>
                <th>Rate</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loads.map((load) => (
                <tr key={load.id}>
                  <td>{load.dispatchDate}</td>
                  <td>{load.storeNumber}</td>
                  <td>{load.dispatchWindow}</td>
                  <td>{load.activityType}</td>
                  <td>{load.equipmentType}</td>
                  <td>{load.brokerName}</td>
                  <td>{load.rate ? `$${load.rate.toFixed(2)}` : ""}</td>
                  <td>{load.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
