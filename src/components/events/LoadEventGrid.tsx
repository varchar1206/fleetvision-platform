import type { Schema } from "../../../amplify/data/resource";

type LoadEventRecord = Schema["LoadEvent"]["type"];

type Props = {
  events: LoadEventRecord[];
};

export default function LoadEventGrid({ events }: Props) {
  return (
    <div className="table-card">
      <h2>Load Event History</h2>

      <table>
        <thead>
          <tr>
            <th>Load ID</th>
            <th>Event</th>
            <th>Time</th>
            <th>Source</th>
            <th>Notes</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.loadId}</td>
              <td>{event.eventType}</td>
              <td>{event.eventTime}</td>
              <td>{event.eventSource}</td>
              <td>{event.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
