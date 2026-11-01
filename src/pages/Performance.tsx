import { Card } from "@/components/ui";
import { revenueSeries } from "@triptych/shared-data";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Performance() {
  const data = revenueSeries.map((p, i) => ({
    label: p.label,
    conversion: 2.4 + Math.sin(i / 3) * 0.35 + (i % 5) * 0.02,
    activation: 61 + Math.cos(i / 4) * 4,
    latency: 118 + Math.sin(i / 2.5) * 18,
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Performance</h1>
        <p className="mt-1 text-sm text-ink-muted">Product conversion, activation, and checkout latency.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Trial → paid", value: "3.1%", hint: "+0.4 pts vs prior", tone: "bg-brand" },
          { label: "Day-7 activation", value: "64%", hint: "Stable week over week", tone: "bg-slate" },
          { label: "P95 checkout", value: "142ms", hint: "Within SLO", tone: "bg-accent" },
        ].map((m) => (
          <div key={m.label} className={`rounded-[18px] p-4 text-white shadow-[var(--shadow-2)] ${m.tone}`}>
            <p className="text-sm text-white/80">{m.label}</p>
            <p className="mt-2 tabular text-3xl font-bold">{m.value}</p>
            <p className="mt-1 text-xs text-white/75">{m.hint}</p>
          </div>
        ))}
      </div>
      <Card>
        <h2 className="mb-3 text-base font-bold">Funnel & latency trend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="var(--line)" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: "var(--ink-muted)", fontSize: 11 }} minTickGap={24} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: "var(--ink-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "var(--ink-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, borderColor: "var(--line)" }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="conversion" name="Conversion %" stroke="#0F9F86" strokeWidth={2.5} dot={false} />
              <Line yAxisId="left" type="monotone" dataKey="activation" name="Activation %" stroke="#2F6B5A" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="latency" name="Latency ms" stroke="#C4A35A" strokeWidth={1.75} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
