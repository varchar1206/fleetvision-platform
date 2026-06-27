import type { LoadUploadRecord } from "../models/LoadUploadRecord";

let demoUploadRecords: LoadUploadRecord[] = [];

export function listLoadUploadRecords(): LoadUploadRecord[] {
  return demoUploadRecords;
}

export function createLoadUploadRecord(file: File): LoadUploadRecord {
  const record: LoadUploadRecord = {
    id: crypto.randomUUID(),
    fileName: file.name,
    fileType: file.type || "unknown",
    fileSizeBytes: file.size,
    uploadedBy: "Demo Dispatcher",
    uploadedAt: new Date().toISOString(),
    rowCount: 0,
    status: "Uploaded",
  };

  demoUploadRecords = [record, ...demoUploadRecords];

  return record;
}

export function deleteLoadUploadRecord(uploadId: string): LoadUploadRecord[] {
  demoUploadRecords = demoUploadRecords.map((record) =>
    record.id === uploadId
      ? {
          ...record,
          status: "Deleted",
        }
      : record
  );

  return demoUploadRecords;
}

export function clearLoadUploadRecords(): LoadUploadRecord[] {
  demoUploadRecords = [];
  return demoUploadRecords;
}
