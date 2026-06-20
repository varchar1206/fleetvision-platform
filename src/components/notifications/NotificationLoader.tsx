import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

type NotificationRecord = Schema["Notification"]["type"];

export default function NotificationLoader() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);

  async function loadNotifications() {
    const result = await client.models.Notification.list();
    setNotifications(result.data);
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="table-card">
      <h2>Notification Records</h2>
      <p>{notifications.length} notification(s) found.</p>
    </div>
  );
}
