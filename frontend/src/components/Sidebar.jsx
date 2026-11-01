import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  LogOut,
  Layers,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Projects", path: "/projects", icon: FolderKanban },
  { name: "Team Members", path: "/team", icon: Users },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Layers size={23} />
        </div>
        <span>TaskForge</span>
      </div>

      <div className="workspace-switcher">
        <div className="workspace-avatar">T</div>
        <div>
          <p className="workspace-name">Team Workspace</p>
          <p className="workspace-label">Free Plan</p>
        </div>
      </div>

      <p className="nav-heading">WORKSPACE</p>

      <nav className="navigation">
        {navigation.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={19} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/profile" className="nav-link">
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>

        <button
          className="nav-link logout-button"
          onClick={() => alert("Authentication will be implemented later.")}
        >
          <LogOut size={19} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}