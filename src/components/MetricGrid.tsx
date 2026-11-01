import type { MetricCard } from "@triptych/shared-types";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { motion } from "motion/react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { formatMetric } from "@/lib/format";
import { IconTile } from "./ui";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const ribbon = [
  { bg: "bg-brand", soft: "text-white/80", ink: "text-white", stroke: "rgba(255,255,255,.85)", fill: "rgba(255,255,255,.25)" },
  { bg: "bg-slate", soft: "text-white/75", ink: "text-white", stroke: "rgba(255,255,255,.85)", fill: "rgba(255,255,255,.22)" },
  { bg: "bg-accent", soft: "text-[#3a2d08]/80", ink: "text-[#2a2108]", stroke: "rgba(42,33,8,.55)", fill: "rgba(42,33,8,.12)" },
  { bg: "bg-[#4A6B63]", soft: "text-white/80", ink: "text-white", stroke: "rgba(255,255,255,.85)", fill: "rgba(255,255,255,.22)" },
] as const;

type Props = {
  metrics: MetricCard[];
  icons?: ReactNode[];
  variant?: "ribbon" | "tiles";
};

export function MetricGrid({ metrics, icons, variant = "ribbon" }: Props) {
  if (variant === "tiles") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m, i) => {
          const Icon =
            m.deltaDirection === "up" ? ArrowUpRight : m.deltaDirection === "down" ? ArrowDownRight : Minus;
          const positive =
            (m.id === "churn" && m.deltaDirection === "down") ||
            (m.id !== "churn" && m.deltaDirection === "up");
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease }}
              className="card flex items-start gap-3 p-4"
            >
              <IconTile tone={i % 2 === 0 ? "brand" : i === 1 ? "accent" : "slate"}>
                {icons?.[i] ?? <Icon size={18} />}
              </IconTile>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-ink-muted">{m.label}</p>
                <p className="mt-1 tabular text-2xl font-bold tracking-tight">
                  {formatMetric(m.value, m.format)}
                </p>
                <p className={`mt-1 inline-flex items-center gap-0.5 text-xs font-semibold ${positive ? "text-success" : "text-danger"}`}>
                  <Icon size={13} />
                  {Math.abs(m.delta).toFixed(1)}% vs prior
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((m, i) => {
        const style = ribbon[i % ribbon.length]!;
        const Icon =
          m.deltaDirection === "up" ? ArrowUpRight : m.deltaDirection === "down" ? ArrowDownRight : Minus;
        const spark = (m.sparkline ?? []).map((v, idx) => ({ i: idx, v }));
        return (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.06, ease }}
            className={`relative overflow-hidden rounded-[18px] p-4 shadow-[var(--shadow-2)] ${style.bg}`}
          >
            <div className="relative z-10 flex items-start justify-between gap-2">
              <p className={`text-sm font-medium ${style.soft}`}>{m.label}</p>
              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${style.ink}`}>
                <Icon size={14} />
                {Math.abs(m.delta).toFixed(1)}%
              </span>
            </div>
            <p className={`relative z-10 mt-3 tabular text-3xl font-bold tracking-tight ${style.ink}`}>
              {formatMetric(m.value, m.format)}
            </p>
            {spark.length > 0 && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 opacity-90">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spark}>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke={style.stroke}
                      strokeWidth={2}
                      fill={style.fill}
                      isAnimationActive
                      animationDuration={700}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
