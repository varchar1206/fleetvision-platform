import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import DriverActions from "../../components/driver/DriverActions";
import DriverLoadBoardComponent from "../../components/driver/DriverLoadBoard";
import DriverMetrics from "../../components/driver/DriverMetrics";
import { getEtaStartUpdate } from "../../utils/eta/getEtaStartUpdate";

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
        [
          "ASSIGNED_TO_DRIVER",
          "DISPATCHED",
          "IN_ROUTE_TO_PICKUP",
          "ARRIVED_AT_PICKUP",
          "LOADED",
          "DEPARTED_PICKUP",
          "IN_ROUTE_TO_DELIVERY",
          "ARRIVED_AT_DELIVERY",
          "DELIVERED",
          "RETURNED_TO_WAREHOUSE",
        ].includes(load.status || "")
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

    if (!selectedLoad) {
      alert("Selected load not found.");
      return;
    }

    const now = new Date().toISOString();

    await Promise.all([
      client.models.Load.update({
        id: selectedLoadId,
        status,
        notes: note,
        ...getEtaStartUpdate(status, now),
      }),

      client.models.DriverLocation.create({
        loadId: selectedLoad.id,
        driverName: "Driver",
        carrierName: selectedLoad.carrierName || "",
        latitude: 0,
        longitude: 0,
        recordedAt: now,
        source: status,
        locationMethod: "DRIVER_ATTESTATION",
        notes: note,
      }),

      client.models.LoadEvent.create({
        loadId: selectedLoad.id,
        eventType: status,
        eventTime: now,
        eventSource: "Driver",
        notes: note,
      }),
    ]);

    if (status === "DELIVERED") {
      await Promise.all([
        client.models.Notification.create({
          loadId: selectedLoad.id,
          eventType: "LOAD_DELIVERED",
          audience: "Shipper",
          title: "Load Delivered",
          message: `Load for store ${selectedLoad.storeNumber} has been delivered.`,
          channel: "IN_APP",
          status: "UNREAD",
          createdAt: now,
        }),

        client.models.Notification.create({
          loadId: selectedLoad.id,
          eventType: "LOAD_DELIVERED",
          audience: "Broker",
          title: "Load Delivered",
          message: `Load for store ${selectedLoad.storeNumber} has been delivered.`,
          channel: "IN_APP",
          status: "UNREAD",
          createdAt: now,
        }),

        client.models.Notification.create({
          loadId: selectedLoad.id,
          eventType: "LOAD_DELIVERED",
          audience: "Carrier",
          title: "Load Delivered",
          message: `Load for store ${selectedLoad.storeNumber} has been delivered.`,
          channel: "IN_APP",
          status: "UNREAD",
          createdAt: now,
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
          <p>Update route, pickup, delivery, and return-to-warehouse milestones.</p>
        </div>
      </div>

      <DriverMetrics loads={loads} />

      <DriverActions
        selectedCount={selectedLoadId ? 1 : 0}
        onArrivedPickup={() => updateSelectedStatus("ARRIVED_AT_PICKUP", "Driver attested arrival at pickup.")}
        onLoaded={() => updateSelectedStatus("LOADED", "Driver attested load has been loaded.")}
        onInTransit={() => updateSelectedStatus("IN_ROUTE_TO_DELIVERY", "Driver attested in route to delivery.")}
        onArrivedDelivery={() => updateSelectedStatus("ARRIVED_AT_DELIVERY", "Driver attested arrival at delivery.")}
        onDelivered={() => updateSelectedStatus("DELIVERED", "Driver attested load delivered.")}
      />

      <div className="table-card">
        <h2>Additional Check-Ins</h2>
        <div className="action-row">
          <button onClick={() => updateSelectedStatus("IN_ROUTE_TO_PICKUP", "Driver attested in route to pickup.")}>
            In Route to Pickup
          </button>
          <button onClick={() => updateSelectedStatus("DEPARTED_PICKUP", "Driver attested departure from pickup.")}>
            Departed Pickup
          </button>
          <button onClick={() => updateSelectedStatus("RETURNED_TO_WAREHOUSE", "Driver attested return to warehouse.")}>
            Returned to Warehouse
          </button>
        </div>
      </div>

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
