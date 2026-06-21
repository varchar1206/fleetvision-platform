import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import BrokerMetrics from "../../components/broker/BrokerMetrics";
import BrokerTenderActions from "../../components/broker/BrokerTenderActions";
import BrokerTenderGrid from "../../components/broker/BrokerTenderGrid";

const client = generateClient<Schema>();

type LoadRecord = Schema["Load"]["type"];

export default function BrokerTenderQueue() {
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [selectedLoadIds, setSelectedLoadIds] = useState<string[]>([]);
  const [selectedCarrier, setSelectedCarrier] = useState("Select Carrier");
  const [isLoading, setIsLoading] = useState(true);

  async function loadBrokerTenders() {
    setIsLoading(true);

    const result = await client.models.Load.list();

    setLoads(
      result.data.filter(
        (load) =>
          load.status === "TENDERED" ||
          load.status === "ACCEPTED" ||
          load.status === "REJECTED"
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
    const selectedLoads = loads.filter((load) => selectedLoadIds.includes(load.id));

    if (selectedLoads.length === 0) {
      alert("Select at least one tender.");
      return;
    }

    await Promise.all(
      selectedLoads.map((load) =>
        client.models.Load.update({
          id: load.id,
          status: "ACCEPTED",
          notes: "Broker accepted tender.",
        })
      )
    );

    setSelectedLoadIds([]);
    await loadBrokerTenders();
  }

  async function rejectSelected() {
    const selectedLoads = loads.filter((load) => selectedLoadIds.includes(load.id));

    if (selectedLoads.length === 0) {
      alert("Select at least one tender.");
      return;
    }

    await Promise.all(
      selectedLoads.map((load) =>
        client.models.Load.update({
          id: load.id,
          status: "REJECTED",
          notes: "Broker rejected tender.",
        })
      )
    );

    setSelectedLoadIds([]);
    await loadBrokerTenders();
  }

  async function assignCarrier() {
    const selectedLoads = loads.filter((load) => selectedLoadIds.includes(load.id));

    if (selectedLoads.length === 0) {
      alert("Select at least one load.");
      return;
    }

    if (selectedCarrier === "Select Carrier") {
      alert("Select a carrier first.");
      return;
    }

    await Promise.all(
      selectedLoads.map((load) =>
        Promise.all([
          client.models.Load.update({
            id: load.id,
            carrierName: selectedCarrier,
            status: "ASSIGNED_TO_CARRIER",
            notes: `Assigned to carrier ${selectedCarrier}.`,
          }),
          client.models.Notification.create({
            loadId: load.id,
            eventType: "CARRIER_ASSIGNED",
            audience: "Carrier",
            title: "Load Assigned",
            message: `Load for store ${load.storeNumber} assigned to ${selectedCarrier}.`,
            channel: "IN_APP",
            status: "UNREAD",
            createdAt: new Date().toISOString(),
          }),

          client.models.LoadEvent.create({
            loadId: load.id,
            eventType: "CARRIER_ASSIGNED",
            eventTime: new Date().toISOString(),
            eventSource: "Broker",
            notes: `Assigned to carrier ${selectedCarrier}.`,
          }),
        ])
      )
    );

    setSelectedLoadIds([]);
    await loadBrokerTenders();
  }

  useEffect(() => {
    loadBrokerTenders();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Broker Tender Queue</h2>
          <p>Accept, reject, and assign tendered loads to carriers.</p>
        </div>
      </div>

      <BrokerMetrics loads={loads} selectedCount={selectedLoadIds.length} />

      <BrokerTenderActions
        selectedCount={selectedLoadIds.length}
        selectedCarrier={selectedCarrier}
        onCarrierChange={setSelectedCarrier}
        onSelectAll={toggleSelectAll}
        onAcceptSelected={acceptSelected}
        onRejectSelected={rejectSelected}
        onAssignCarrier={assignCarrier}
      />

      {isLoading ? (
        <div className="table-card">
          <p>Loading broker tenders...</p>
        </div>
      ) : (
        <BrokerTenderGrid
          loads={loads}
          selectedLoadIds={selectedLoadIds}
          onToggleSelected={toggleSelected}
        />
      )}
    </section>
  );
}
