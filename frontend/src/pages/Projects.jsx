import { Link } from "react-router-dom";
import { Plus, Search, FolderKanban } from "lucide-react";
import { useState } from "react";

import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/mockData";

export default function Projects() {
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <h1>Projects</h1>
          <p>Manage and organize all your workspace projects.</p>
        </div>

        <button className="primary-button">
          <Plus size={17} /> New Project
        </button>
      </div>

      <div className="filter-bar">
        <div className="search-box page-search">
          <Search size={17} />
          <input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <span className="result-count">
          {filteredProjects.length} projects
        </span>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <FolderKanban size={38} />
          <h3>No projects found</h3>
          <p>Try searching with a different project name.</p>
        </div>
      )}
    </div>
  );
}