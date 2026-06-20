import { useState } from "react";

export default function BulkLoadTools() {
  const [bulkText, setBulkText] = useState("");
  const [message, setMessage] = useState("");

  function validateRows() {
    const rows = bulkText
      .split("\n")
      .map((row) => row.trim())
      .filter(Boolean);

    setMessage(`${rows.length} row(s) detected.`);
  }

  async function loadCsv(file: File | undefined) {
    if (!file) return;

    const text = await file.text();

    setBulkText(text);
    setMessage("CSV loaded. Review and validate.");
  }

  return (
    <div>
      <h3>Bulk Paste Loads / CSV Upload</h3>

      <p>
        Format:
        Store,Date,Time,Activity,Equipment,Broker,Rate
      </p>

      <textarea
        rows={8}
        style={{ width: "100%" }}
        value={bulkText}
        onChange={(e) => setBulkText(e.target.value)}
      />

      <div className="action-row">
        <button onClick={validateRows}>
          Validate
        </button>

        <input
          type="file"
          accept=".csv,text/csv"
          onChange={(e) => loadCsv(e.target.files?.[0])}
        />
      </div>

      <p>{message}</p>
    </div>
  );
}
