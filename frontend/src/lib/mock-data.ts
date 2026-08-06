export type Agent = {
  id: string;
  name: string;
  role: string;
  status: "idle" | "running" | "error" | "completed";
  currentTask?: string;
  performance: number;
  health: number;
  avatar: string;
  recentActivity: string[];
};

export const MOCK_AGENTS: Agent[] = [
  {
    id: "agent-1",
    name: "Aura",
    role: "Planner Agent",
    status: "idle",
    performance: 98,
    health: 100,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Aura",
    recentActivity: ["Created Q3 strategy outline", "Delegated tasks to Execution Agent"],
  },
  {
    id: "agent-2",
    name: "Nexus",
    role: "Research Agent",
    status: "running",
    currentTask: "Scraping competitor pricing",
    performance: 85,
    health: 92,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Nexus",
    recentActivity: ["Found 15 new leads", "Analyzed market trends for SaaS"],
  },
  {
    id: "agent-3",
    name: "Oracle",
    role: "Decision Agent",
    status: "completed",
    performance: 99,
    health: 100,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Oracle",
    recentActivity: ["Approved budget allocation", "Resolved workflow conflict"],
  },
  {
    id: "agent-4",
    name: "Spark",
    role: "Marketing Agent",
    status: "error",
    currentTask: "Publishing social media campaign",
    performance: 72,
    health: 60,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Spark",
    recentActivity: ["Generated ad copy for Twitter", "Failed to connect to API"],
  },
  {
    id: "agent-5",
    name: "Vault",
    role: "Finance Agent",
    status: "running",
    currentTask: "Reconciling monthly expenses",
    performance: 95,
    health: 98,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Vault",
    recentActivity: ["Generated Q2 financial report", "Flagged unusual transaction"],
  },
  {
    id: "agent-6",
    name: "Atlas",
    role: "HR Agent",
    status: "idle",
    performance: 88,
    health: 90,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Atlas",
    recentActivity: ["Sent out employee satisfaction survey", "Scheduled 3 interviews"],
  },
  {
    id: "agent-7",
    name: "Echo",
    role: "Support Agent",
    status: "running",
    currentTask: "Replying to customer tickets",
    performance: 91,
    health: 95,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Echo",
    recentActivity: ["Closed 45 tickets today", "Escalated urgent issue to human"],
  },
  {
    id: "agent-8",
    name: "Titan",
    role: "Execution Agent",
    status: "running",
    currentTask: "Deploying updates to staging",
    performance: 97,
    health: 99,
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Titan",
    recentActivity: ["Fixed critical bug in UI", "Ran unit tests (100% passed)"],
  }
];

export type Task = {
  id: string;
  title: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in-progress" | "review" | "done";
  assignee?: string;
  progress: number;
};

export const MOCK_TASKS: Task[] = [
  { id: "tsk-1", title: "Analyze Competitor Pricing", priority: "high", status: "in-progress", assignee: "Nexus", progress: 65 },
  { id: "tsk-2", title: "Generate Q3 Financial Report", priority: "urgent", status: "todo", assignee: "Vault", progress: 0 },
  { id: "tsk-3", title: "Draft Blog Post on AI Trends", priority: "medium", status: "review", assignee: "Spark", progress: 90 },
  { id: "tsk-4", title: "Approve Vacation Requests", priority: "low", status: "done", assignee: "Atlas", progress: 100 },
  { id: "tsk-5", title: "Resolve Customer Ticket #892", priority: "high", status: "in-progress", assignee: "Echo", progress: 40 },
  { id: "tsk-6", title: "Optimize Database Queries", priority: "medium", status: "todo", assignee: "Titan", progress: 0 },
  { id: "tsk-7", title: "Review Ad Spend ROI", priority: "high", status: "review", assignee: "Oracle", progress: 85 },
  { id: "tsk-8", title: "Create Workflow Blueprint", priority: "urgent", status: "done", assignee: "Aura", progress: 100 },
];

export const MOCK_ANALYTICS_DATA = [
  { name: 'Mon', completed: 40, failed: 2 },
  { name: 'Tue', completed: 30, failed: 5 },
  { name: 'Wed', completed: 55, failed: 1 },
  { name: 'Thu', completed: 45, failed: 3 },
  { name: 'Fri', completed: 60, failed: 0 },
  { name: 'Sat', completed: 20, failed: 1 },
  { name: 'Sun', completed: 25, failed: 0 },
];

export const MOCK_AGENT_PERFORMANCE = [
  { name: 'Planner', score: 98 },
  { name: 'Research', score: 85 },
  { name: 'Decision', score: 99 },
  { name: 'Marketing', score: 72 },
  { name: 'Finance', score: 95 },
  { name: 'HR', score: 88 },
  { name: 'Support', score: 91 },
  { name: 'Execution', score: 97 },
];

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: "info" | "success" | "warning" | "error";
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "notif-1", title: "Workflow Completed", message: "Data extraction workflow finished successfully.", time: "2 mins ago", unread: true, type: "success" },
  { id: "notif-2", title: "Agent Error", message: "Spark (Marketing) failed to connect to Twitter API.", time: "15 mins ago", unread: true, type: "error" },
  { id: "notif-3", title: "Approval Required", message: "Oracle needs approval for Q3 budget.", time: "1 hour ago", unread: false, type: "warning" },
  { id: "notif-4", title: "System Update", message: "FlowMind AI has been updated to v2.4.", time: "2 hours ago", unread: false, type: "info" },
];

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  agentId?: string;
};

export const MOCK_CHAT_HISTORY: ChatMessage[] = [
  { id: "msg-1", role: "user", content: "Can you analyze the latest market trends for AI SaaS products?", timestamp: "10:00 AM" },
  { id: "msg-2", role: "assistant", content: "I've started gathering data on AI SaaS trends. I'm seeing a significant shift towards agentic workflows. Would you like a detailed report or a summary?", timestamp: "10:02 AM", agentId: "agent-2" },
  { id: "msg-3", role: "user", content: "A summary is fine for now. Also, delegate the drafting of a blog post based on these trends to the Marketing Agent.", timestamp: "10:05 AM" },
  { id: "msg-4", role: "assistant", content: "Done. Here is a quick summary: \n\n1. **Autonomous Agents**: 45% increase in adoption.\n2. **Orchestration**: Multi-agent systems are becoming the norm.\n\nI have tasked **Spark** (Marketing Agent) with drafting the blog post. You can track its progress on the Tasks dashboard.", timestamp: "10:06 AM", agentId: "agent-1" }
];
