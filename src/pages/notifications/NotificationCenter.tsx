import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

import NotificationGrid from "../../components/notifications/NotificationGrid";
import NotificationMetrics from "../../components/notifications/NotificationMetrics";

const client = generateClient<Schema>();

type NotificationRecord = Schema["Notification"]["type"];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadNotifications() {
    setIsLoading(true);
    const result = await client.models.Notification.list();
    setNotifications(result.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  const unread = notifications.filter((item) => item.status === "UNREAD").length;

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Notification Center</h2>
          <p>Central event and communication history for major workflow updates.</p>
        </div>
      </div>

      <NotificationMetrics total={notifications.length} unread={unread} />

      {isLoading ? (
        <div className="table-card">
          <p>Loading notifications...</p>
        </div>
      ) : (
        <NotificationGrid notifications={notifications} />
      )}
    </section>
  );
}
