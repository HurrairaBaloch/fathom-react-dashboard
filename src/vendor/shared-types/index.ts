export type DeltaDirection = "up" | "down" | "flat";

export interface MetricCard {
  id: string;
  label: string;
  value: number;
  format: "currency" | "number" | "percent" | "duration";
  delta: number;
  deltaDirection: DeltaDirection;
  sparkline?: number[];
}

export interface TimeSeriesPoint {
  date: string;
  label: string;
  value: number;
  previous?: number;
}

export interface SeriesPoint {
  name: string;
  value: number;
  secondary?: number;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  plan: string;
  mrr: number;
  status: "active" | "trial" | "churned" | "paused";
  joinedAt: string;
  lastActive: string;
  region: string;
}

export interface OrderRecord {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "paid" | "pending" | "refunded" | "failed";
  channel: string;
  createdAt: string;
}

export interface ProductRecord {
  id: string;
  name: string;
  category: string;
  units: number;
  revenue: number;
  margin: number;
  trend: number;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  at: string;
  tone: "neutral" | "success" | "warn" | "danger";
}

export interface InsightItem {
  id: string;
  title: string;
  body: string;
  confidence: number;
  impact: "high" | "medium" | "low";
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  at: string;
  read: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  dept: string;
  quota: number;
  closed: number;
  utilization: number;
}

export interface ReportRow {
  id: string;
  name: string;
  period: string;
  owner: string;
  status: "ready" | "draft" | "scheduled";
  updatedAt: string;
}

export interface ServiceHealth {
  id: string;
  name: string;
  region: string;
  status: "healthy" | "degraded" | "down" | "maintenance";
  latencyMs: number;
  errorRate: number;
  uptime: number;
}

export interface InfraNode {
  id: string;
  name: string;
  type: "api" | "worker" | "db" | "cache" | "queue";
  cpu: number;
  memory: number;
  status: "ok" | "warn" | "critical";
}

export interface ProjectItem {
  id: string;
  name: string;
  owner: string;
  progress: number;
  due: string;
  status: "on_track" | "at_risk" | "blocked" | "done";
  priority: "p0" | "p1" | "p2" | "p3";
}

export interface TaskItem {
  id: string;
  title: string;
  assignee: string;
  project: string;
  status: "todo" | "doing" | "review" | "done";
  priority: "p0" | "p1" | "p2" | "p3";
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  resource: string;
  ip: string;
  at: string;
  result: "allowed" | "denied";
}

export type DateRangeKey = "7d" | "30d" | "90d" | "ytd";
