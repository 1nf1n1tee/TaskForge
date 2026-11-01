export const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign the company website and improve UX.",
    color: "blue",
    progress: 75,
    tasks: 24,
    completed: 18,
    dueDate: "Nov 15, 2026",
  },
  {
    id: 2,
    name: "Mobile Application",
    description: "Develop the next generation mobile application.",
    color: "purple",
    progress: 45,
    tasks: 32,
    completed: 14,
    dueDate: "Nov 22, 2026",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Prepare and launch the Q4 marketing campaign.",
    color: "orange",
    progress: 90,
    tasks: 20,
    completed: 18,
    dueDate: "Nov 10, 2026",
  },
];

export const tasks = [
  {
    id: 1,
    title: "Design landing page",
    project: "Website Redesign",
    status: "Todo",
    priority: "High",
    assignee: "Alex Morgan",
  },
  {
    id: 2,
    title: "Implement authentication",
    project: "Mobile Application",
    status: "In Progress",
    priority: "High",
    assignee: "Sarah Chen",
  },
  {
    id: 3,
    title: "Create marketing assets",
    project: "Marketing Campaign",
    status: "Done",
    priority: "Medium",
    assignee: "John Smith",
  },
  {
    id: 4,
    title: "Optimize database queries",
    project: "Mobile Application",
    status: "Todo",
    priority: "Low",
    assignee: "Alex Morgan",
  },
  {
    id: 5,
    title: "Review responsive layouts",
    project: "Website Redesign",
    status: "In Progress",
    priority: "Medium",
    assignee: "Sarah Chen",
  },
];

export const members = [
  { id: 1, name: "Alex Morgan", email: "alex@example.com", role: "Owner", initials: "AM" },
  { id: 2, name: "Sarah Chen", email: "sarah@example.com", role: "Member", initials: "SC" },
  { id: 3, name: "John Smith", email: "john@example.com", role: "Member", initials: "JS" },
];