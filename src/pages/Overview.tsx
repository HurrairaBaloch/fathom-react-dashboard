import { MetricGrid } from "@/components/MetricGrid";
import { Badge, Button, Card } from "@/components/ui";
import { formatDateTime, formatMetric, toCsv } from "@/lib/format";
import {
  activities,
  channelMix,
  fathomMetrics,
  insights,
  revenueSeries,
} from "@triptych/shared-data";
import { Download, Plus, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const pieColors = ["var(--brand)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];
const ease = [0.16, 1, 0.3, 1] as const;

export function Overview() {
  const exportRevenue = () => {
    const csv = toCsv(revenueSeries as unknown as Record<string, unknown>[]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fathom-revenue-demo.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink-muted">Good morning, Maren</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
            Here&apos;s how Fathom is performing
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="soft" onClick={exportRevenue}>
            <Download size={16} /> Export CSV
          </Button>
          <Button>
            <Plus size={16} /> New report
          </Button>
        </div>
      </div>

      <MetricGrid metrics={fathomMetrics} />

      <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <Card>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold">Revenue vs prior period</h2>
              <p className="text-xs text-ink-muted">Daily booked revenue answers: are we ahead of last cycle?</p>
            </div>
            <Badge tone="brand">
              <span className="inline-flex items-center gap-1">
                <TrendingUp size={12} /> Live chart
              </span>
            </Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F9F86" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#0F9F86" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--line)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "var(--ink-muted)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={28}
                />
                <YAxis
                  tick={{ fill: "var(--ink-muted)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                  tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    boxShadow: "var(--shadow-2)",
                  }}
                  formatter={(value: number) => [formatMetric(value, "currency"), "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="previous"
                  stroke="#9AA8A2"
                  strokeDasharray="4 4"
                  fill="transparent"
                  strokeWidth={1.5}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0F9F86"
                  fill="url(#revFill)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="mb-1 text-base font-bold">Acquisition mix</h2>
          <p className="mb-4 text-xs text-ink-muted">Share of new MRR by channel</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={82}
                  paddingAngle={3}
                  stroke="none"
                >
                  {channelMix.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-2.5">
            {channelMix.map((c, i) => (
              <li key={c.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-ink-muted">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: pieColors[i % pieColors.length] }}
                  />
                  {c.name}
                </span>
                <span className="tabular font-semibold">{c.value}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold">AI insights</h2>
            <button type="button" className="text-xs font-semibold text-brand-ink hover:underline">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease }}
                className="rounded-[14px] border border-line bg-surface-2/80 p-3.5 transition hover:border-[color-mix(in_oklab,var(--brand)_35%,transparent)]"
              >
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{insight.title}</p>
                  <Badge tone={insight.impact === "high" ? "brand" : "neutral"}>
                    {Math.round(insight.confidence * 100)}%
                  </Badge>
                </div>
                <p className="text-xs leading-relaxed text-ink-muted">{insight.body}</p>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold">Activity feed</h2>
            <Badge tone="neutral">Demo seed</Badge>
          </div>
          <ul className="space-y-0">
            {activities.map((a) => (
              <li
                key={a.id}
                className="flex gap-3 border-b border-line py-3.5 first:pt-0 last:border-0 last:pb-0"
              >
                <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
                <div className="min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold">{a.actor}</span> {a.action}{" "}
                    <span className="text-ink-muted">{a.target}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-ink-muted">{formatDateTime(a.at)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
