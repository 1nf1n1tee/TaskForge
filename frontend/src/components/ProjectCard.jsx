import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className={`project-symbol ${project.color}`}>
          {project.name.charAt(0)}
        </div>

        <Link to={`/projects/${project.id}`} className="icon-button">
          <ArrowUpRight size={19} />
        </Link>
      </div>

      <h3>{project.name}</h3>
      <p className="project-description">{project.description}</p>

      <div className="progress-info">
        <span>Progress</span>
        <strong>{project.progress}%</strong>
      </div>

      <div className="progress-track">
        <div
          className={`progress-fill ${project.color}`}
          style={{ width: `${project.progress}%` }}
        />
      </div>

      <div className="project-card-footer">
        <span>{project.completed}/{project.tasks} tasks</span>
        <span>
          <CalendarDays size={14} />
          {project.dueDate}
        </span>
      </div>
    </div>
  );
}