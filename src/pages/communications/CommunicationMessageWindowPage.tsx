import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import CommunicationDetailsPanel from "../../components/communications/CommunicationDetailsPanel";
import LoadCommunicationHistory from "../../components/communications/LoadCommunicationHistory";

const client = generateClient<Schema>();

type CommunicationRecord = Schema["CommunicationLog"]["type"];

export default function CommunicationMessageWindowPage() {
  const { messageId } = useParams();
  const [message, setMessage] = useState<CommunicationRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadMessage() {
    if (!messageId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const result = await client.models.CommunicationLog.get({
      id: messageId,
    });

    setMessage(result.data ?? null);
    setIsLoading(false);
  }

  useEffect(() => {
    loadMessage();
  }, [messageId]);

  function handleClose() {
    window.close();
  }

  return (
    <section style={{ padding: "1.5rem" }}>
      <div className="page-header">
        <div>
          <h2>Communication Details</h2>
          <p>Loaded directly from CommunicationLog by message ID.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="table-card">
          <p>Loading communication details...</p>
        </div>
      ) : (
        <>
          <CommunicationDetailsPanel message={message} onClose={handleClose} />
          <LoadCommunicationHistory loadId={message?.loadId} />
        </>
      )}
    </section>
  );
}
