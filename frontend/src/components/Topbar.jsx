import { Search, Bell, ChevronDown } from "lucide-react";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Workspace</span>
        <span className="breadcrumb-divider">/</span>
        <strong>Overview</strong>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={17} />
          <input placeholder="Search anything..." />
          <kbd>⌘ K</kbd>
        </div>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={19} />
          <span className="notification-dot" />
        </button>

        <button className="user-menu">
          <div className="avatar">AM</div>
          <div className="user-info">
            <strong>Alex Morgan</strong>
            <span>Workspace Owner</span>
          </div>
          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}