type NotificationItem = {
  id: string;
  type: string;
  message: string;
  audience: string;
  status: string;
};

type Props = {
  notifications: NotificationItem[];
};

export default function NotificationGrid({ notifications }: Props) {
  return (
    <div className="table-card">
      <h2>Notification Center</h2>

      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Audience</th>
            <th>Message</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {notifications.map((item) => (
            <tr key={item.id}>
              <td>{item.type}</td>
              <td>{item.audience}</td>
              <td>{item.message}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
