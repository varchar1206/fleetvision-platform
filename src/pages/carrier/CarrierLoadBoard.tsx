import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import CarrierMetrics from "../../components/carrier/CarrierMetrics";
import CarrierActions from "../../components/carrier/CarrierActions";
import CarrierLoadBoardComponent from "../../components/carrier/CarrierLoadBoard";

const client = generateClient<Schema>();

type LoadRecord = Schema["Load"]["type"];

export default function CarrierLoadBoard() {
  const [loads, setLoads] = useState<LoadRecord[]>([]);
  const [selectedLoadIds, setSelectedLoadIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadCarrierLoads() {
    setIsLoading(true);

    const result = await client.models.Load.list();

    setLoads(
      result.data.filter(
        (load) =>
          load.carrierName &&
          (load.status === "ACCEPTED" ||
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
        client.models.Load.update({
          id: load.id,
          status: "CARRIER_ACCEPTED",
        })
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
