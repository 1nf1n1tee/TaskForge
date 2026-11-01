import {
  FolderKanban,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";
import { projects, tasks } from "../data/mockData";

const activityData = [
  { day: "Mon", completed: 4 },
  { day: "Tue", completed: 7 },
  { day: "Wed", completed: 5 },
  { day: "Thu", completed: 9 },
  { day: "Fri", completed: 6 },
  { day: "Sat", completed: 8 },
  { day: "Sun", completed: 11 },
];

export default function Dashboard() {
  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Done"
  ).length;

  return (
    <div className="page-container">
      <div className="page-heading">
        <div>
          <p className="greeting">Sunday, November 1, 2026</p>
          <h1>Good evening, Alex 👋</h1>
          <p>Here's what's happening with your workspace today.</p>
        </div>

        <button className="primary-button">
          + Create project
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Projects"
          value={projects.length}
          description="Across your workspace"
          icon={FolderKanban}
          color="blue"
        />

        <StatCard
          title="Completed Tasks"
          value={completedTasks}
          description="Tasks marked as done"
          icon={CheckCircle2}
          color="green"
        />

        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          description="Tasks awaiting completion"
          icon={Clock3}
          color="purple"
        />

        <StatCard
          title="Overdue Tasks"
          value="0"
          description="No overdue tasks"
          icon={AlertCircle}
          color="orange"
        />
      </div>

      <div className="dashboard-grid">
        <section className="content-card activity-card">
          <div className="section-header">
            <div>
              <h2>Task Activity</h2>
              <p>Tasks completed throughout the week</p>
            </div>
            <button className="text-button">This week</button>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edf0f5" />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8992a3", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  tick={{ fill: "#8992a3", fontSize: 12 }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#taskGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="content-card">
          <div className="section-header">
            <div>
              <h2>Task Overview</h2>
              <p>Current task distribution</p>
            </div>
          </div>

          <div className="task-overview">
            {[
              { label: "To Do", status: "Todo", color: "blue" },
              { label: "In Progress", status: "In Progress", color: "purple" },
              { label: "Completed", status: "Done", color: "green" },
            ].map((item) => {
              const count = tasks.filter(
                (task) => task.status === item.status
              ).length;

              return (
                <div className="overview-item" key={item.status}>
                  <div className="overview-label">
                    <span className={`status-dot ${item.color}`} />
                    <span>{item.label}</span>
                  </div>
                  <strong>{count}</strong>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className="projects-section">
        <div className="section-header">
          <div>
            <h2>Recent Projects</h2>
            <p>Keep track of your ongoing projects.</p>
          </div>

          <a href="/projects" className="text-button">
            View all <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}