import { MetricGrid } from "@/components/MetricGrid";
import { Card } from "@/components/ui";
import { formatMetric } from "@/lib/format";
import { channelMix, fathomMetrics, revenueSeries } from "@triptych/shared-data";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Revenue() {
  const [tab, setTab] = useState<"trend" | "channels">("trend");
  const metrics = useMemo(() => fathomMetrics.filter((m) => ["mrr", "arpu", "churn"].includes(m.id)), []);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Revenue analytics</h1>
        <p className="mt-1 text-sm text-ink-muted">MRR trajectory, ARPU pressure, and channel contribution.</p>
      </div>
      <MetricGrid metrics={metrics} variant="tiles" />
      <div className="flex gap-2">
        {(["trend", "channels"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`h-10 rounded-[12px] px-4 text-sm font-semibold transition ${
              tab === t ? "bg-brand text-white shadow-[0_6px_16px_rgba(15,159,134,.25)]" : "bg-surface text-ink-muted shadow-[var(--shadow-1)] hover:text-ink"
            }`}
          >
            {t === "trend" ? "Trend" : "Channels"}
          </button>
        ))}
      </div>
      <Card>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {tab === "trend" ? (
              <LineChart data={revenueSeries}>
                <CartesianGrid stroke="var(--line)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "var(--ink-muted)", fontSize: 11 }} minTickGap={24} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--ink-muted)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: "var(--line)" }} formatter={(v: number) => formatMetric(v, "currency")} />
                <Legend />
                <Line type="monotone" dataKey="value" name="Current" stroke="#0F9F86" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="previous" name="Prior" stroke="#9AA8A2" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            ) : (
              <BarChart data={channelMix}>
                <CartesianGrid stroke="var(--line)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "var(--ink-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--ink-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: "var(--line)" }} />
                <Bar dataKey="value" name="% of MRR" fill="#0F9F86" radius={[8, 8, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
