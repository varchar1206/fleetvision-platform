import { useEffect, useState } from "react";
import type { Schema } from "../../../amplify/data/resource";
import {
  getDemoOrganizationByType,
  getDocumentsForOrganization,
  type PortalType,
} from "../../services/portal/getPortalDemoData";

type DocumentRecord = Schema["DocumentRecord"]["type"];

type Props = {
  portalType?: PortalType;
};

export default function DocumentsPage({ portalType = "SHIPPER" }: Props) {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);

  useEffect(() => {
    async function loadDocuments() {
      const organization = await getDemoOrganizationByType(portalType);
      const documentRows = await getDocumentsForOrganization(organization?.id);
      setDocuments(documentRows);
    }

    loadDocuments();
  }, [portalType]);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Documents</h2>
          <p>Future document and image storage area connected to DocumentRecord metadata.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Document Count</h2>
          <p>{documents.length}</p>
        </div>

        <div className="card">
          <h2>Upload Placeholder</h2>
          <p>Future S3 upload area for logos, avatars, PODs, BOLs, insurance, and certificates.</p>
          <button>Upload Document</button>
        </div>
      </div>

      <div className="table-card">
        <h2>Document Records</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>File Name</th>
              <th>Status</th>
              <th>Visibility</th>
              <th>Expires</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document.id}>
                <td>{document.documentType}</td>
                <td>{document.fileName}</td>
                <td>{document.status}</td>
                <td>{document.visibility}</td>
                <td>{document.expiresAt ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
