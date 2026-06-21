import type { Schema } from "../../../amplify/data/resource";

type ExceptionRecord = Schema["LoadException"]["type"];

type Props = {
  exceptions: ExceptionRecord[];
};

export default function ExceptionMetrics({ exceptions }: Props) {
  const open = exceptions.filter((item) => item.status === "OPEN").length;
  const resolved = exceptions.filter((item) => item.status === "RESOLVED").length;

  return (
    <div className="dashboard-grid">
      <div className="card"><h2>Total Exceptions</h2><p>{exceptions.length}</p></div>
      <div className="card"><h2>Open</h2><p>{open}</p></div>
      <div className="card"><h2>Resolved</h2><p>{resolved}</p></div>
      <div className="card"><h2>High Priority</h2><p>{exceptions.filter((item) => item.priority === "HIGH").length}</p></div>
    </div>
  );
}
