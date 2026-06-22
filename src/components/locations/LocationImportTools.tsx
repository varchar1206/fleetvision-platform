import { useState } from "react";
import * as XLSX from "xlsx";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

type Props = {
  onImportComplete: () => Promise<void>;
};

type ImportRow = {
  Location?: string;
  "Store Number "?: string | number;
  "Trailer Size"?: string;
  "Street Address"?: string;
  City?: string;
  State?: string;
  "Zip Code"?: string | number;
  County?: string;
  "Commitment time"?: string;
  "Oneway travel time"?: string;
};

export default function LocationImportTools({ onImportComplete }: Props) {
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [message, setMessage] = useState("");

  async function readFile(file: File | undefined) {
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const parsedRows = XLSX.utils.sheet_to_json<ImportRow>(sheet);

    setRows(parsedRows);
    setMessage(`${parsedRows.length} location row(s) ready to import.`);
  }

  async function importLocations() {
    if (rows.length === 0) {
      alert("Select a file first.");
      return;
    }

    const existingResult = await client.models.Location.list();
    const existingLocations = existingResult.data;

    let created = 0;
    let updated = 0;

    for (const row of rows) {
      const storeNumber = String(row["Store Number "] ?? "").trim();
      if (!storeNumber) continue;

      const existing = existingLocations.find(
        (location) => location.storeNumber === storeNumber
      );

      const locationData = {
        locationName: String(row.Location ?? "").trim(),
        storeNumber,
        trailerSize: String(row["Trailer Size"] ?? "").trim(),
        streetAddress: String(row["Street Address"] ?? "").trim(),
        city: String(row.City ?? "").trim(),
        state: String(row.State ?? "").trim(),
        zipCode: String(row["Zip Code"] ?? "").trim(),
        county: String(row.County ?? "").trim(),
        commitmentTime: String(row["Commitment time"] ?? "").trim(),
        oneWayTravelTime: String(row["Oneway travel time"] ?? "").trim(),
        geofenceRadiusFeet: 500,
        locationType: "STORE",
      };

      if (existing) {
        await client.models.Location.update({
          id: existing.id,
          ...locationData,
        });
        updated += 1;
      } else {
        await client.models.Location.create(locationData);
        created += 1;
      }
    }

    setRows([]);
    setMessage(`Import complete. Created ${created}, updated ${updated}.`);
    await onImportComplete();
  }

  return (
    <div className="table-card">
      <h2>Import Locations</h2>

      <div className="action-row">
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={(event) => readFile(event.target.files?.[0])}
        />

        <button onClick={importLocations}>Import Locations</button>
      </div>

      <p>{message}</p>
    </div>
  );
}
