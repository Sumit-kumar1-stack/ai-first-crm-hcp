import { useSelector } from "react-redux";
import "./NotificationDropdown.css";

export default function NotificationDropdown() {
  const { followups, recentActivity } = useSelector((state) => state.dashboard);
  const notifications = [
    ...followups.slice(0, 3).map((item) => ({ title: `Follow up: ${item.doctor}`, time: item.follow_up })),
    ...recentActivity.slice(0, 3).map((item) => ({ title: item.action, time: item.doctor })),
  ];
  return <div className="notification-dropdown"><h3>Notifications</h3>{notifications.length ? notifications.map((item, index) => <div key={`${item.title}-${index}`} className="notification-item"><h4>{item.title}</h4><p>{item.time}</p></div>) : <p>No notifications.</p>}</div>;
}
