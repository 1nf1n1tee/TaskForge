import { UserCircle } from "lucide-react";

export default function Profile() {
  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <h1>Profile Settings</h1>
          <p>Manage your personal account information.</p>
        </div>
      </div>

      <div className="content-card profile-card">
        <UserCircle size={52} className="profile-icon" />

        <div>
          <h2>Alex Morgan</h2>
          <p>alex@example.com</p>
          <span className="member-role">Workspace Owner</span>
        </div>

        <p className="muted-text">
          Profile editing and account management will be implemented
          when we integrate authentication with the backend.
        </p>
      </div>
    </div>
  );
}