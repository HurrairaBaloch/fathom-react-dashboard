import { Badge, Card } from "@/components/ui";
import { insights } from "@triptych/shared-data";
import { motion } from "motion/react";

export function Insights() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI insights</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Model-assisted narratives over demo metrics — not a live model connection.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="h-full">
              <div className="mb-3 flex items-center justify-between gap-2">
                <Badge tone={insight.impact === "high" ? "brand" : insight.impact === "medium" ? "warn" : "neutral"}>
                  {insight.impact} impact
                </Badge>
                <span className="tabular text-xs font-semibold text-ink-muted">
                  {Math.round(insight.confidence * 100)}% confidence
                </span>
              </div>
              <h2 className="mb-2 text-base font-bold">{insight.title}</h2>
              <p className="text-sm leading-relaxed text-ink-muted">{insight.body}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
