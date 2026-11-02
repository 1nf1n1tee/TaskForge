import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectBoard from "./pages/ProjectBoard";
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import BackendTest from "./pages/BackendTest";

function NotFound() {
  return (
    <div className="page-container">
      <h1>404 - Page not found</h1>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectBoard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/backend-test" element={<BackendTest />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}