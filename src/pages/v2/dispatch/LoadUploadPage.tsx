import { useState } from "react";

import DispatchProcessNav from "../../../components/load-builder/DispatchProcessNav";
import FleetCard from "../../../components/ui/FleetCard";
import FleetButton from "../../../components/ui/FleetButton";
import FleetActionBar from "../../../components/ui/FleetActionBar";
import FleetGrid from "../../../design-system/layout/FleetGrid";
import FleetPage from "../../../design-system/layout/FleetPage";
import type { LoadUploadRecord } from "../../../business/uploads/models/LoadUploadRecord";
import {
  clearLoadUploadRecords,
  createLoadUploadRecord,
  deleteLoadUploadRecord,
  listLoadUploadRecords,
} from "../../../business/uploads/services/LoadUploadService";

export default function LoadUploadPage() {
  const [uploads, setUploads] = useState<LoadUploadRecord[]>(() =>
    listLoadUploadRecords()
  );
  const [activeUpload, setActiveUpload] = useState<LoadUploadRecord | null>(
    uploads[0] ?? null
  );

  function handleUpload(file: File | null) {
    if (!file) return;

    const record = createLoadUploadRecord(file);
    const updatedUploads = listLoadUploadRecords();

    setUploads(updatedUploads);
    setActiveUpload(record);
  }

  function handleDeleteUpload(uploadId: string) {
    const updatedUploads = deleteLoadUploadRecord(uploadId);
    setUploads(updatedUploads);

    if (activeUpload?.id === uploadId) {
      setActiveUpload(null);
    }
  }

  function handleClearAllUploads() {
    const updatedUploads = clearLoadUploadRecords();
    setUploads(updatedUploads);
    setActiveUpload(null);
  }

  return (
    <FleetPage
      title="Upload Load File"
      description="Upload daily load spreadsheets, map columns, validate records, and build load records."
    >
      <DispatchProcessNav />

      <FleetGrid columns={2}>
        <FleetCard title="Spreadsheet Upload" eyebrow="Upload Loads">
          <p>
            This workflow will import daily load files and convert them into draft operational loads.
          </p>

          <label className="fleet-field">
            <span>Load Spreadsheet</span>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(event) => handleUpload(event.target.files?.[0] ?? null)}
            />
          </label>

          <FleetActionBar align="right">
            <FleetButton variant="secondary" disabled={!activeUpload}>
              Map Columns
            </FleetButton>
            <FleetButton variant="primary" disabled={!activeUpload}>
              Validate File
            </FleetButton>
          </FleetActionBar>
        </FleetCard>

        <FleetCard title="Upload Status" eyebrow="Import Readiness">
          <div className="fleet-stat-list">
            <div><span>File Selected</span><strong>{activeUpload ? "Yes" : "No"}</strong></div>
            <div><span>Rows Parsed</span><strong>{activeUpload?.rowCount ?? 0}</strong></div>
            <div><span>Status</span><strong>{activeUpload?.status ?? "None"}</strong></div>
            <div><span>Ready to Build</span><strong>0</strong></div>
          </div>
        </FleetCard>
      </FleetGrid>

      <FleetCard title="Uploaded Files" eyebrow="Upload History">
        {uploads.length === 0 ? (
          <p>No uploaded files yet.</p>
        ) : (
          <div className="fleet-table-wrap">
            <table className="fleet-table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Uploaded By</th>
                  <th>Uploaded At</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => (
                  <tr key={upload.id}>
                    <td>{upload.fileName}</td>
                    <td>{upload.fileType}</td>
                    <td>{Math.round(upload.fileSizeBytes / 1024)} KB</td>
                    <td>{upload.uploadedBy}</td>
                    <td>{new Date(upload.uploadedAt).toLocaleString()}</td>
                    <td>{upload.status}</td>
                    <td>
                      <FleetActionBar align="left">
                        <FleetButton
                          variant="secondary"
                          onClick={() => setActiveUpload(upload)}
                          disabled={upload.status === "Deleted"}
                        >
                          View
                        </FleetButton>
                        <FleetButton
                          variant="danger"
                          onClick={() => handleDeleteUpload(upload.id)}
                          disabled={upload.status === "Deleted"}
                        >
                          Delete
                        </FleetButton>
                      </FleetActionBar>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <FleetActionBar align="right">
          <FleetButton
            variant="danger"
            onClick={handleClearAllUploads}
            disabled={uploads.length === 0}
          >
            Clear All Uploads
          </FleetButton>
        </FleetActionBar>
      </FleetCard>
    </FleetPage>
  );
}
