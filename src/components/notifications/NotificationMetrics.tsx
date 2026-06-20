type Props = {
  total: number;
  unread: number;
};

export default function NotificationMetrics({ total, unread }: Props) {
  return (
    <div className="dashboard-grid">
      <div className="card"><h2>Total Notifications</h2><p>{total}</p></div>
      <div className="card"><h2>Unread</h2><p>{unread}</p></div>
      <div className="card"><h2>Email Queue</h2><p>Coming soon.</p></div>
      <div className="card"><h2>SMS Queue</h2><p>Future opt-in.</p></div>
    </div>
  );
}
