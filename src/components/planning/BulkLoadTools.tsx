import { useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

type Props = {
  onLoadsCreated: () => Promise<void>;
};

type BulkLoadRow = {
  storeNumber: string;
  dispatchDate: string;
  dispatchTime: string;
  activityType: string;
  equipmentType: string;
  brokerName: string;
  rate: number;
};

export default function BulkLoadTools({ onLoadsCreated }: Props) {
  const [bulkText, setBulkText] = useState("");
  const [message, setMessage] = useState("");

  function parseRows(): BulkLoadRow[] {
    return bulkText
      .split("\n")
      .map((row) => row.trim())
      .filter(Boolean)
      .filter((row) => !row.toLowerCase().startsWith("store"))
      .map((row) => {
        const columns = row.includes("\t") ? row.split("\t") : row.split(",");

        return {
          storeNumber: columns[0]?.trim() || "",
          dispatchDate: columns[1]?.trim() || "",
          dispatchTime: columns[2]?.trim() || "",
          activityType: columns[3]?.trim() || "D/S",
          equipmentType: columns[4]?.trim() || "Power Only",
          brokerName: columns[5]?.trim() || "Beckers",
          rate: Number(columns[6] || 0),
        };
      });
  }

  function validateRows() {
    const rows = parseRows();
    const validRows = rows.filter(
      (row) => row.storeNumber && row.dispatchDate && row.dispatchTime
    );

    setMessage(`${rows.length} row(s) detected. ${validRows.length} valid.`);
  }

  async function createLoads() {
    const rows = parseRows();
    const validRows = rows.filter(
      (row) => row.storeNumber && row.dispatchDate && row.dispatchTime
    );

    if (validRows.length === 0) {
      alert("No valid rows found.");
      return;
    }

    await Promise.all(
      validRows.map((row) =>
        client.models.Load.create({
          storeNumber: row.storeNumber,
          dispatchDate: row.dispatchDate,
          dispatchWindow: row.dispatchTime,
          tripId: row.dispatchTime,
          activityType: row.activityType,
          equipmentType: row.equipmentType,
          brokerName: row.brokerName,
          carrierName: "",
          rate: row.rate,
          status: "DRAFT",
          bolStatus: "NOT_REQUIRED",
          createdBy: "USER001",
          notes: "Created from Bulk Paste or CSV Upload.",
        })
      )
    );

    setBulkText("");
    setMessage(`${validRows.length} load(s) created.`);
    await onLoadsCreated();
  }

  async function loadCsv(file: File | undefined) {
    if (!file) return;

    const text = await file.text();

    setBulkText(text);
    setMessage("CSV loaded. Review, validate, then create loads.");
  }

  return (
    <div className="table-card">
      <h2>Bulk Paste Loads / CSV Upload</h2>

      <p>Format: Store,Date,Time,Activity,Equipment,Broker,Rate</p>

      <textarea
        rows={8}
        style={{ width: "100%" }}
        value={bulkText}
        onChange={(e) => setBulkText(e.target.value)}
        placeholder="S040,2026-06-24,16:00,D/S,Power Only,Beckers,1162"
      />

      <div className="action-row">
        <button onClick={validateRows}>Validate</button>
        <button onClick={createLoads}>Create Loads</button>
        <button onClick={() => { setBulkText(""); setMessage(""); }}>Clear</button>
        <input type="file" accept=".csv,text/csv" onChange={(e) => loadCsv(e.target.files?.[0])} />
      </div>

      <p>{message}</p>
    </div>
  );
}
