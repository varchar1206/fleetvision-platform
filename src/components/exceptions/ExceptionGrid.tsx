import type { Schema } from "../../../amplify/data/resource";

type ExceptionRecord = Schema["LoadException"]["type"];

type Props = {
  exceptions: ExceptionRecord[];
};

export default function ExceptionGrid({ exceptions }: Props) {
  return (
    <div className="table-card">
      <h2>Exception Management</h2>

      <table>
        <thead>
          <tr>
            <th>Load ID</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Delay Phase</th>
            <th>ETA Impact</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>
          {exceptions.map((item) => (
            <tr key={item.id}>
              <td>{item.loadId}</td>
              <td>{item.exceptionType}</td>
              <td>{item.priority}</td>
              <td>{item.status}</td>
              <td>{item.delayPhase}</td>
              <td>{item.etaImpactMinutes}</td>
              <td>{item.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
