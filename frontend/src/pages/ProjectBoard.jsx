import { useParams } from "react-router-dom";
import { useState } from "react";
import { Plus, CalendarDays, MoreHorizontal } from "lucide-react";

import { projects, tasks as initialTasks } from "../data/mockData";

const columns = [
  { id: "Todo", title: "To Do", color: "blue" },
  { id: "In Progress", title: "In Progress", color: "purple" },
  { id: "Done", title: "Done", color: "green" },
];

export default function ProjectBoard() {
  const { projectId } = useParams();

  const project = projects.find(
    (item) => item.id === Number(projectId)
  );

  const [tasks, setTasks] = useState(
    initialTasks.filter(
      (task) => task.project === project?.name
    )
  );

  function addTask() {
    const title = window.prompt("Enter the task title:");

    if (!title?.trim()) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: title.trim(),
        project: project.name,
        status: "Todo",
        priority: "Medium",
        assignee: "Alex Morgan",
      },
    ]);
  }

  function updateStatus(taskId, newStatus) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  }

  if (!project) {
    return (
      <div className="page-container">
        <h1>Project not found</h1>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <p className="greeting">Projects / {project.name}</p>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>

        <button className="primary-button" onClick={addTask}>
          <Plus size={17} /> Add Task
        </button>
      </div>

      <div className="kanban-board">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.id
          );

          return (
            <section className="kanban-column" key={column.id}>
              <div className="kanban-header">
                <div>
                  <span className={`status-dot ${column.color}`} />
                  <strong>{column.title}</strong>
                  <span className="task-count">
                    {columnTasks.length}
                  </span>
                </div>

                <button
                  className="icon-button"
                  onClick={addTask}
                  aria-label={`Add task to ${column.title}`}
                >
                  <Plus size={17} />
                </button>
              </div>

              <div className="kanban-tasks">
                {columnTasks.map((task) => (
                  <article className="task-card" key={task.id}>
                    <div className="task-card-top">
                      <span className={`priority ${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>

                      <button className="icon-button" aria-label="Task options">
                        <MoreHorizontal size={17} />
                      </button>
                    </div>

                    <h3>{task.title}</h3>

                    <div className="task-card-footer">
                      <div className="mini-avatar">
                        {task.assignee.split(" ").map((word) => word[0]).join("")}
                      </div>

                      <span>
                        <CalendarDays size={13} /> Task
                      </span>
                    </div>

                    <select
                      className="status-select"
                      value={task.status}
                      onChange={(e) =>
                        updateStatus(task.id, e.target.value)
                      }
                      aria-label={`Change status for ${task.title}`}
                    >
                      {columns.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                  </article>
                ))}

                {columnTasks.length === 0 && (
                  <p className="empty-column">No tasks here yet.</p>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}