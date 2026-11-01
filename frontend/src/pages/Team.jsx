import { members } from "../data/mockData";
import { UserPlus, Mail } from "lucide-react";

export default function Team() {
  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <h1>Team Members</h1>
          <p>Manage the people in your workspace.</p>
        </div>

        <button className="primary-button">
          <UserPlus size={17} /> Invite Member
        </button>
      </div>

      <div className="content-card">
        {members.map((member) => (
          <div className="member-row" key={member.id}>
            <div className="avatar">{member.initials}</div>

            <div className="member-info">
              <strong>{member.name}</strong>
              <span>{member.email}</span>
            </div>

            <span className="member-role">{member.role}</span>

            <Mail size={17} className="muted-icon" />
          </div>
        ))}
      </div>
    </div>
  );
}