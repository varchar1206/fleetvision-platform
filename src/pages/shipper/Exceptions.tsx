import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import ExceptionGrid from "../../components/exceptions/ExceptionGrid";
import ExceptionMetrics from "../../components/exceptions/ExceptionMetrics";

const client = generateClient<Schema>();

type ExceptionRecord = Schema["LoadException"]["type"];

export default function Exceptions() {
  const [exceptions, setExceptions] = useState<ExceptionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadExceptions() {
    setIsLoading(true);
    const result = await client.models.LoadException.list();
    setExceptions(result.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadExceptions();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Exceptions</h2>
          <p>Track delays, rejected loads, missed appointments, and operational issues.</p>
        </div>
      </div>

      <ExceptionMetrics exceptions={exceptions} />

      {isLoading ? (
        <div className="table-card">
          <p>Loading exceptions...</p>
        </div>
      ) : (
        <ExceptionGrid exceptions={exceptions} />
      )}
    </section>
  );
}
