import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import CarrierMetrics from "../../components/carrier/CarrierMetrics";
import CarrierActions from "../../components/carrier/CarrierActions";
import CarrierLoadBoardComponent from "../../components/carrier/CarrierLoadBoard";
import DriverAssignment from "../../components/carrier/DriverAssignment";
import DispatchActions from "../../components/carrier/DispatchActions";

const client = generateClient<Schema>();

type LoadRecord = Schema["Load"]["type"];

export default function CarrierLoadBoard() {
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [selectedLoadIds, setSelectedLoadIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState("Select Driver");

  async function loadCarrierLoads() {
    setIsLoading(true);

    const result = await client.models.Load.list();

    setLoads(
      result.data.filter(
        (load) =>
          load.carrierName &&
          (load.status === "ASSIGNED_TO_CARRIER" ||
            load.status === "CARRIER_ACCEPTED" ||
            load.status === "CARRIER_REJECTED")
      )
    );

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

  
async function acceptSelected() {
  const selectedLoads = loads.filter((load) =>
    selectedLoadIds.includes(load.id)
  );

  await Promise.all(
    selectedLoads.map((load) =>
      Promise.all([
        client.models.Load.update({
          id: load.id,
          status: "CARRIER_ACCEPTED",
        }),

        client.models.Notification.create({
          loadId: load.id,
          eventType: "CARRIER_ACCEPTED",
          audience: "Broker",
          title: "Carrier Accepted Load",
          message: `${load.carrierName} accepted load ${load.storeNumber}.`,
          channel: "IN_APP",
          status: "UNREAD",
          createdAt: new Date().toISOString(),
        }),

        client.models.Notification.create({
          loadId: load.id,
          eventType: "CARRIER_ACCEPTED",
          audience: "Shipper",
          title: "Carrier Accepted Load",
          message: `${load.carrierName} accepted load ${load.storeNumber}.`,
          channel: "IN_APP",
          status: "UNREAD",
          createdAt: new Date().toISOString(),
        }),

        client.models.LoadEvent.create({
          loadId: load.id,
          eventType: "CARRIER_ACCEPTED",
          eventTime: new Date().toISOString(),
          eventSource: "Carrier",
          notes: `${load.carrierName} accepted load ${load.storeNumber}.`,
        }),
      ])
    )
  );

  setSelectedLoadIds([]);
  await loadCarrierLoads();
}

async function rejectSelected() {
    const selectedLoads = loads.filter((load) =>
      selectedLoadIds.includes(load.id)
    );

    await Promise.all(
      selectedLoads.map((load) =>
        client.models.Load.update({
          id: load.id,
          status: "CARRIER_REJECTED",
        })
      )
    );

    setSelectedLoadIds([]);
    await loadCarrierLoads();
  }

  async function assignDriver() {
    const selectedLoads = loads.filter((load) => selectedLoadIds.includes(load.id));

    if (selectedLoads.length === 0) {
      alert("Select at least one load.");
      return;
    }

    if (selectedDriver === "Select Driver") {
      alert("Select a driver first.");
      return;
    }

    await Promise.all(
      selectedLoads.map((load) =>
        client.models.Load.update({
          id: load.id,
          status: "ASSIGNED_TO_DRIVER",
          notes: `Driver assigned: ${selectedDriver}.`,
        })
      )
    );

    setSelectedLoadIds([]);
    await loadCarrierLoads();
  }

  async function dispatchSelected() {
    const selectedLoads = loads.filter((load) => selectedLoadIds.includes(load.id));

    if (selectedLoads.length === 0) {
      alert("Select at least one load.");
      return;
    }

    await Promise.all(
      selectedLoads.map((load) =>
        client.models.Load.update({
          id: load.id,
          status: "DISPATCHED",
          notes: "Load dispatched.",
        })
      )
    );

    setSelectedLoadIds([]);
    await loadCarrierLoads();
  }

  useEffect(() => {
    loadCarrierLoads();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Carrier Load Board</h2>
          <p>Loads assigned by brokers awaiting carrier response.</p>
        </div>
      </div>

      <CarrierMetrics
        loads={loads}
        selectedCount={selectedLoadIds.length}
      />

      <CarrierActions
        selectedCount={selectedLoadIds.length}
        onSelectAll={toggleSelectAll}
        onAcceptSelected={acceptSelected}
        onRejectSelected={rejectSelected}
      />

      <DriverAssignment
        selectedDriver={selectedDriver}
        onDriverChange={setSelectedDriver}
      />

      <DispatchActions
        selectedCount={selectedLoadIds.length}
        onAssignDriver={assignDriver}
        onDispatchSelected={dispatchSelected}
      />

      {isLoading ? (
        <div className="table-card">
          <p>Loading carrier loads...</p>
        </div>
      ) : (
        <CarrierLoadBoardComponent
          loads={loads}
          selectedLoadIds={selectedLoadIds}
          onToggleSelected={toggleSelected}
        />
      )}
    </section>
  );
}
