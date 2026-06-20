import NotificationGrid from "../../components/notifications/NotificationGrid";
import NotificationMetrics from "../../components/notifications/NotificationMetrics";

const notifications = [
  {
    id: "1",
    type: "Tender",
    audience: "Shipper",
    message: "Broker accepted tender.",
    status: "Unread",
  },
  {
    id: "2",
    type: "Carrier",
    audience: "Broker",
    message: "Carrier assigned to load.",
    status: "Unread",
  },
  {
    id: "3",
    type: "Driver",
    audience: "Carrier",
    message: "Driver marked load in transit.",
    status: "Read",
  },
];

export default function NotificationCenter() {
  const unread = notifications.filter((item) => item.status === "Unread").length;

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Notification Center</h2>
          <p>Central event and communication history for major workflow updates.</p>
        </div>
      </div>

      <NotificationMetrics total={notifications.length} unread={unread} />
      <NotificationGrid notifications={notifications} />
    </section>
  );
}
