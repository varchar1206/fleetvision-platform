export type LoadUploadStatus =
  | "Uploaded"
  | "Cleared"
  | "Validated"
  | "Built"
  | "Deleted";

export type LoadUploadRecord = {
  id: string;
  fileName: string;
  fileType: string;
  fileSizeBytes: number;
  uploadedBy: string;
  uploadedAt: string;
  rowCount: number;
  status: LoadUploadStatus;
};
