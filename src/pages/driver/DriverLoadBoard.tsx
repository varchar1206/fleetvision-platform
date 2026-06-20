import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import DriverActions from "../../components/driver/DriverActions";
import DriverLoadBoardComponent from "../../components/driver/DriverLoadBoard";
import DriverMetrics from "../../components/driver/DriverMetrics";

const client = generateClient<Schema>();

type LoadRecord = Schema["Load"]["type"];

export default function DriverLoadBoard() {
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [selectedLoadId, setSelectedLoadId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function loadDriverLoads() {
    setIsLoading(true);

    const result = await client.models.Load.list();

    setLoads(
      result.data.filter((load) =>
        ["ASSIGNED_TO_DRIVER", "DISPATCHED", "ARRIVED_AT_PICKUP", "LOADED", "IN_TRANSIT", "ARRIVED_AT_DELIVERY", "DELIVERED"].includes(load.status || "")
      )
    );

    setIsLoading(false);
  }

  async function updateSelectedStatus(status: string, note: string) {
    if (!selectedLoadId) {
      alert("Select a load first.");
      return;
    }

    const selectedLoad = loads.find((load) => load.id === selectedLoadId);

    await client.models.Load.update({
      id: selectedLoadId,
      status,
      notes: note,
    });

    if (status === "DELIVERED" && selectedLoad) {
      await Promise.all([
        client.models.Notification.create({
          loadId: selectedLoad.id,
          eventType: "LOAD_DELIVERED",
          audience: "Shipper",
          title: "Load Delivered",
          message: `Load for store ${selectedLoad.storeNumber} has been delivered.`,
          channel: "IN_APP",
          status: "UNREAD",
          createdAt: new Date().toISOString(),
        }),

        client.models.Notification.create({
          loadId: selectedLoad.id,
          eventType: "LOAD_DELIVERED",
          audience: "Broker",
          title: "Load Delivered",
          message: `Load for store ${selectedLoad.storeNumber} has been delivered.`,
          channel: "IN_APP",
          status: "UNREAD",
          createdAt: new Date().toISOString(),
        }),

        client.models.Notification.create({
          loadId: selectedLoad.id,
          eventType: "LOAD_DELIVERED",
          audience: "Carrier",
          title: "Load Delivered",
          message: `Load for store ${selectedLoad.storeNumber} has been delivered.`,
          channel: "IN_APP",
          status: "UNREAD",
          createdAt: new Date().toISOString(),
        }),
      ]);
    }

    await loadDriverLoads();
  }

  useEffect(() => {
    loadDriverLoads();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Driver Portal</h2>
          <p>Update pickup, transit, and delivery milestones.</p>
        </div>
      </div>

      <DriverMetrics loads={loads} />

      <DriverActions
        selectedCount={selectedLoadId ? 1 : 0}
        onArrivedPickup={() => updateSelectedStatus("ARRIVED_AT_PICKUP", "Driver arrived at pickup.")}
        onLoaded={() => updateSelectedStatus("LOADED", "Load has been loaded.")}
        onInTransit={() => updateSelectedStatus("IN_TRANSIT", "Driver is in transit.")}
        onArrivedDelivery={() => updateSelectedStatus("ARRIVED_AT_DELIVERY", "Driver arrived at delivery.")}
        onDelivered={() => updateSelectedStatus("DELIVERED", "Load delivered.")}
      />

      {isLoading ? (
        <div className="table-card">
          <p>Loading driver loads...</p>
        </div>
      ) : (
        <DriverLoadBoardComponent
          loads={loads}
          selectedLoadId={selectedLoadId}
          onSelectLoad={setSelectedLoadId}
        />
      )}
    </section>
  );
}
