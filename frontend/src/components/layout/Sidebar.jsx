import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Bot,
  Users,
  BarChart3,
  FileText,
  History,
  Settings,
  Building2,
} from "lucide-react";

import "./Sidebar.css";

const menus = [
  {
    name: "History",
    path: "/history",
    icon: History,
  },
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "AI Workspace",
    path: "/assistant",
    icon: Bot,
  },
  {
    name: "Doctors",
    path: "/doctors",
    icon: Users,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="logo-box">
            <Building2 size={26} />
          </div>

          <div>
            <h2>CRM AI</h2>
            <span>Medical CRM</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={({ isActive }) =>
                  isActive
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Icon size={20} />

                <span>{menu.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-user">
        <div className="avatar">
          S
        </div>

        <div>
          <strong>Sumit Kumar</strong>

          <p>Medical Representative</p>
        </div>
      </div>
    </aside>
  );
}
