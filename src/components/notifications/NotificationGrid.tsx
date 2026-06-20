import type { Schema } from "../../../amplify/data/resource";

type NotificationRecord = Schema["Notification"]["type"];

type Props = {
  notifications: NotificationRecord[];
};

export default function NotificationGrid({ notifications }: Props) {
  return (
    <div className="table-card">
      <h2>Notification Center</h2>

      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Audience</th>
            <th>Title</th>
            <th>Message</th>
            <th>Channel</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {notifications.map((item) => (
            <tr key={item.id}>
              <td>{item.eventType}</td>
              <td>{item.audience}</td>
              <td>{item.title}</td>
              <td>{item.message}</td>
              <td>{item.channel}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
