import type {
  ActivityItem,
  AuditLog,
  CustomerRecord,
  InfraNode,
  InsightItem,
  MetricCard,
  NotificationItem,
  OrderRecord,
  ProductRecord,
  ProjectItem,
  ReportRow,
  SeriesPoint,
  ServiceHealth,
  TaskItem,
  TeamMember,
  TimeSeriesPoint,
} from "@triptych/shared-types";

/** Demo seed only — not connected to live systems. */
export const DEMO_NOTICE =
  "Demo data for portfolio showcase. Not connected to a live backend.";

const people = [
  "Maren Holtz",
  "Ilya Okonkwo",
  "Priya Nair",
  "Theo Brant",
  "Sable Quinn",
  "Rafi Mendel",
  "Noor Elahi",
  "Cass Rowan",
  "Yara Mintz",
  "Jonas Veld",
  "Hana Ruiz",
  "Emile Sato",
];

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20261101);

function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)]!;
}

function money(base: number, spread = 0.35) {
  return Math.round(base * (1 + (rand() - 0.4) * spread) * 100) / 100;
}

export const fathomMetrics: MetricCard[] = [
  {
    id: "mrr",
    label: "Monthly recurring revenue",
    value: 248392.17,
    format: "currency",
    delta: 8.4,
    deltaDirection: "up",
    sparkline: [182, 190, 188, 201, 214, 209, 228, 241, 236, 248],
  },
  {
    id: "users",
    label: "Active accounts",
    value: 18427,
    format: "number",
    delta: 3.1,
    deltaDirection: "up",
    sparkline: [15.2, 15.8, 16.1, 16.0, 16.9, 17.2, 17.6, 17.9, 18.1, 18.4],
  },
  {
    id: "arpu",
    label: "ARPU",
    value: 47.62,
    format: "currency",
    delta: -1.2,
    deltaDirection: "down",
    sparkline: [49.1, 48.8, 48.2, 48.0, 47.9, 47.4, 47.6, 47.8, 47.5, 47.6],
  },
  {
    id: "churn",
    label: "Logo churn",
    value: 2.37,
    format: "percent",
    delta: -0.4,
    deltaDirection: "up",
    sparkline: [3.1, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.5, 2.4, 2.37],
  },
];

export const revenueSeries: TimeSeriesPoint[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(2026, 9, 2 + i);
  const seasonal = Math.sin(i / 4.2) * 4200;
  const trend = 7200 + i * 180;
  const noise = (rand() - 0.5) * 2600;
  const value = Math.max(4100, trend + seasonal + noise);
  return {
    date: d.toISOString().slice(0, 10),
    label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: Math.round(value),
    previous: Math.round(value * (0.82 + rand() * 0.18)),
  };
});

export const channelMix: SeriesPoint[] = [
  { name: "Self-serve", value: 42.4 },
  { name: "Sales-assisted", value: 31.8 },
  { name: "Partners", value: 15.2 },
  { name: "Expansion", value: 10.6 },
];

export const customers: CustomerRecord[] = Array.from({ length: 48 }, (_, i) => {
  const name = pick(people);
  const status = pick(["active", "active", "active", "trial", "paused", "churned"] as const);
  const plan = pick(["Starter", "Growth", "Scale", "Enterprise"]);
  return {
    id: `cus_${1000 + i}`,
    name,
    email: `${name.split(" ")[0]!.toLowerCase()}.${name.split(" ")[1]!.toLowerCase()}@example.com`,
    plan,
    mrr: money(plan === "Enterprise" ? 4200 : plan === "Scale" ? 980 : plan === "Growth" ? 240 : 49),
    status,
    joinedAt: new Date(2024 + Math.floor(rand() * 2), Math.floor(rand() * 12), 1 + Math.floor(rand() * 27))
      .toISOString()
      .slice(0, 10),
    lastActive: new Date(2026, 9, 1 + Math.floor(rand() * 28)).toISOString().slice(0, 10),
    region: pick(["NA", "EU", "APAC", "LATAM"]),
  };
});

export const orders: OrderRecord[] = Array.from({ length: 36 }, (_, i) => ({
  id: `ord_${8200 + i}`,
  customer: pick(people),
  product: pick(["Fathom Core", "Insights Pack", "Seat Bundle", "API Credits", "Support Plus"]),
  amount: money(pick([49, 129, 390, 890, 2400])),
  status: pick(["paid", "paid", "paid", "pending", "refunded", "failed"]),
  channel: pick(["Web", "Invoice", "Marketplace", "Sales"]),
  createdAt: new Date(2026, 9, 1 + Math.floor(rand() * 28), Math.floor(rand() * 23)).toISOString(),
}));

export const products: ProductRecord[] = [
  { id: "p1", name: "Fathom Core", category: "Platform", units: 4128, revenue: 196480, margin: 72.4, trend: 6.2 },
  { id: "p2", name: "Insights Pack", category: "Add-on", units: 1842, revenue: 88416, margin: 81.1, trend: 11.4 },
  { id: "p3", name: "API Credits", category: "Usage", units: 90214, revenue: 54128, margin: 64.0, trend: -2.8 },
  { id: "p4", name: "Seat Bundle", category: "Seats", units: 976, revenue: 78080, margin: 69.5, trend: 3.6 },
  { id: "p5", name: "Support Plus", category: "Services", units: 214, revenue: 42800, margin: 48.2, trend: 1.1 },
];

export const activities: ActivityItem[] = [
  { id: "a1", actor: "Maren Holtz", action: "upgraded plan", target: "Growth → Scale", at: "2026-10-28T14:22:00Z", tone: "success" },
  { id: "a2", actor: "System", action: "flagged anomaly", target: "EU checkout latency", at: "2026-10-28T13:04:00Z", tone: "warn" },
  { id: "a3", actor: "Ilya Okonkwo", action: "exported cohort", target: "Q3 expansion", at: "2026-10-28T11:41:00Z", tone: "neutral" },
  { id: "a4", actor: "Billing", action: "refund issued", target: "ord_8211", at: "2026-10-27T19:18:00Z", tone: "danger" },
  { id: "a5", actor: "Priya Nair", action: "invited seats", target: "+12 on Scale", at: "2026-10-27T16:02:00Z", tone: "success" },
  { id: "a6", actor: "AI Insight", action: "suggested action", target: "Win-back paused NA trials", at: "2026-10-27T09:30:00Z", tone: "neutral" },
];

export const insights: InsightItem[] = [
  {
    id: "i1",
    title: "Expansion concentrated in Scale seats",
    body: "72% of net-new MRR this week came from seat expansion on Scale, not new logos. Prioritize in-product seat prompts for teams with >8 weekly actives.",
    confidence: 0.86,
    impact: "high",
  },
  {
    id: "i2",
    title: "APAC trial conversion lagging",
    body: "APAC trials convert 19% lower than NA at day 14. Activation checklist completion is the strongest predictor in that region.",
    confidence: 0.74,
    impact: "medium",
  },
  {
    id: "i3",
    title: "API credit spikes without seat growth",
    body: "Three accounts show API usage up >40% with flat seats — likely integration testing. Outreach before overage invoices reduces churn risk.",
    confidence: 0.69,
    impact: "medium",
  },
];

export const notifications: NotificationItem[] = [
  { id: "n1", title: "Weekly digest ready", body: "Revenue and cohort summary for Oct 21–28.", at: "2026-10-28T08:00:00Z", read: false },
  { id: "n2", title: "Export finished", body: "customers_30d.csv is ready to download.", at: "2026-10-27T21:14:00Z", read: false },
  { id: "n3", title: "Threshold alert", body: "Checkout error rate crossed 1.8% for 15 minutes.", at: "2026-10-27T13:44:00Z", read: true },
];

export const yardstickMetrics: MetricCard[] = [
  { id: "rev", label: "Booked revenue", value: 4_182_640, format: "currency", delta: 5.6, deltaDirection: "up", sparkline: [3.6, 3.7, 3.9, 3.8, 4.0, 4.05, 4.1, 4.12, 4.15, 4.18] },
  { id: "gm", label: "Gross margin", value: 61.4, format: "percent", delta: 0.8, deltaDirection: "up", sparkline: [59.2, 59.8, 60.1, 60.4, 60.6, 60.9, 61.0, 61.2, 61.3, 61.4] },
  { id: "nrr", label: "Net revenue retention", value: 118.2, format: "percent", delta: 2.1, deltaDirection: "up", sparkline: [112, 113, 114, 115, 115.5, 116, 116.8, 117.2, 117.8, 118.2] },
  { id: "cac", label: "Blended CAC", value: 842, format: "currency", delta: -4.3, deltaDirection: "up", sparkline: [920, 905, 890, 880, 870, 865, 858, 850, 846, 842] },
];

export const salesByRegion: SeriesPoint[] = [
  { name: "North America", value: 1_842_100, secondary: 1_710_400 },
  { name: "Europe", value: 1_204_880, secondary: 1_148_200 },
  { name: "APAC", value: 786_420, secondary: 702_110 },
  { name: "LATAM", value: 349_240, secondary: 318_900 },
];

export const team: TeamMember[] = [
  { id: "t1", name: "Cass Rowan", role: "AE", dept: "Enterprise", quota: 420000, closed: 398200, utilization: 0.91 },
  { id: "t2", name: "Noor Elahi", role: "AE", dept: "Mid-market", quota: 260000, closed: 271400, utilization: 0.88 },
  { id: "t3", name: "Theo Brant", role: "SDR", dept: "Outbound", quota: 140, closed: 126, utilization: 0.79 },
  { id: "t4", name: "Yara Mintz", role: "CSM", dept: "Retention", quota: 96, closed: 101, utilization: 0.84 },
  { id: "t5", name: "Emile Sato", role: "AE", dept: "Enterprise", quota: 420000, closed: 356800, utilization: 0.73 },
  { id: "t6", name: "Hana Ruiz", role: "Analyst", dept: "RevOps", quota: 24, closed: 27, utilization: 0.92 },
];

export const reports: ReportRow[] = [
  { id: "r1", name: "Board pack — October", period: "2026-10", owner: "Hana Ruiz", status: "ready", updatedAt: "2026-10-28T10:12:00Z" },
  { id: "r2", name: "Pipeline coverage", period: "2026-Q4", owner: "Cass Rowan", status: "ready", updatedAt: "2026-10-27T16:40:00Z" },
  { id: "r3", name: "Cohort retention", period: "2026-09", owner: "Yara Mintz", status: "draft", updatedAt: "2026-10-26T09:05:00Z" },
  { id: "r4", name: "Regional P&L", period: "2026-10", owner: "Finance", status: "scheduled", updatedAt: "2026-10-25T18:22:00Z" },
  { id: "r5", name: "Sales capacity plan", period: "2027-H1", owner: "RevOps", status: "draft", updatedAt: "2026-10-24T14:11:00Z" },
];

export const services: ServiceHealth[] = [
  { id: "s1", name: "edge-gateway", region: "us-east-1", status: "healthy", latencyMs: 42, errorRate: 0.12, uptime: 99.98 },
  { id: "s2", name: "billing-api", region: "us-east-1", status: "degraded", latencyMs: 186, errorRate: 1.84, uptime: 99.71 },
  { id: "s3", name: "ingest-worker", region: "eu-west-1", status: "healthy", latencyMs: 67, errorRate: 0.28, uptime: 99.95 },
  { id: "s4", name: "auth-service", region: "us-west-2", status: "healthy", latencyMs: 38, errorRate: 0.09, uptime: 99.99 },
  { id: "s5", name: "search-index", region: "eu-west-1", status: "maintenance", latencyMs: 0, errorRate: 0, uptime: 99.40 },
  { id: "s6", name: "notify-bus", region: "ap-south-1", status: "down", latencyMs: 0, errorRate: 100, uptime: 97.12 },
];

export const infra: InfraNode[] = [
  { id: "n1", name: "api-01", type: "api", cpu: 48, memory: 61, status: "ok" },
  { id: "n2", name: "api-02", type: "api", cpu: 71, memory: 68, status: "warn" },
  { id: "n3", name: "worker-a", type: "worker", cpu: 39, memory: 44, status: "ok" },
  { id: "n4", name: "worker-b", type: "worker", cpu: 88, memory: 79, status: "critical" },
  { id: "n5", name: "pg-primary", type: "db", cpu: 54, memory: 72, status: "ok" },
  { id: "n6", name: "redis-cache", type: "cache", cpu: 22, memory: 51, status: "ok" },
  { id: "n7", name: "queue-main", type: "queue", cpu: 63, memory: 40, status: "warn" },
];

export const projects: ProjectItem[] = [
  { id: "pr1", name: "Checkout resilience", owner: "Ilya Okonkwo", progress: 68, due: "2026-11-12", status: "on_track", priority: "p0" },
  { id: "pr2", name: "EU data residency", owner: "Priya Nair", progress: 41, due: "2026-12-01", status: "at_risk", priority: "p1" },
  { id: "pr3", name: "Observability cutover", owner: "Jonas Veld", progress: 82, due: "2026-11-04", status: "on_track", priority: "p1" },
  { id: "pr4", name: "Partner webhook v2", owner: "Sable Quinn", progress: 24, due: "2026-11-20", status: "blocked", priority: "p2" },
  { id: "pr5", name: "Runbook automation", owner: "Rafi Mendel", progress: 100, due: "2026-10-20", status: "done", priority: "p2" },
];

export const tasks: TaskItem[] = [
  { id: "tk1", title: "Page billing-api P95", assignee: "Ilya Okonkwo", project: "Checkout resilience", status: "doing", priority: "p0", updatedAt: "2026-10-28T12:10:00Z" },
  { id: "tk2", title: "Failover notify-bus APAC", assignee: "Jonas Veld", project: "Observability cutover", status: "todo", priority: "p0", updatedAt: "2026-10-28T11:02:00Z" },
  { id: "tk3", title: "Draft residency DPIA", assignee: "Priya Nair", project: "EU data residency", status: "review", priority: "p1", updatedAt: "2026-10-27T17:45:00Z" },
  { id: "tk4", title: "Partner sandbox keys", assignee: "Sable Quinn", project: "Partner webhook v2", status: "todo", priority: "p2", updatedAt: "2026-10-27T09:18:00Z" },
  { id: "tk5", title: "Close incident 4821", assignee: "Rafi Mendel", project: "Checkout resilience", status: "done", priority: "p1", updatedAt: "2026-10-26T22:01:00Z" },
  { id: "tk6", title: "Capacity forecast Nov", assignee: "Hana Ruiz", project: "Runbook automation", status: "doing", priority: "p3", updatedAt: "2026-10-26T15:33:00Z" },
];

export const auditLogs: AuditLog[] = Array.from({ length: 24 }, (_, i) => ({
  id: `aud_${500 + i}`,
  actor: pick([...people, "service:deploy", "service:billing"]),
  action: pick(["read", "update", "export", "login", "role.change", "secret.rotate"]),
  resource: pick(["invoice", "customer", "deploy", "rbac", "feature_flag", "vault"]),
  ip: `203.0.113.${10 + Math.floor(rand() * 200)}`,
  at: new Date(2026, 9, 28 - Math.floor(i / 3), 20 - (i % 12), Math.floor(rand() * 60)).toISOString(),
  result: rand() > 0.08 ? "allowed" : "denied",
}));

export function formatMetric(value: number, format: MetricCard["format"], currency = "USD") {
  if (format === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: value >= 1000 ? 0 : 2,
    }).format(value);
  }
  if (format === "percent") {
    return `${value.toFixed(value >= 10 ? 1 : 2)}%`;
  }
  if (format === "duration") {
    return `${value.toFixed(0)}ms`;
  }
  return new Intl.NumberFormat("en-US", { notation: value >= 10000 ? "compact" : "standard" }).format(value);
}

export function toCsv<T extends Record<string, unknown>>(rows: T[]): string {
  if (!rows.length) return "";
  const keys = Object.keys(rows[0]!);
  const escape = (v: unknown) => {
    const s = String(v ?? "");
    return /["\n,]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [keys.join(","), ...rows.map((r) => keys.map((k) => escape(r[k])).join(","))].join("\n");
}
