import { Badge, Card } from "@/components/ui";
import { formatDateTime } from "@/lib/format";
import { activities } from "@triptych/shared-data";
import { useMemo, useState } from "react";

export function Activity() {
  const [tone, setTone] = useState("all");
  const rows = useMemo(
    () => (tone === "all" ? activities : activities.filter((a) => a.tone === tone)),
    [tone],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Activity</h1>
          <p className="mt-1 text-sm text-ink-muted">Operational and product events from the demo seed.</p>
        </div>
        <select
          className="h-10 rounded-[12px] border border-line bg-surface px-3 text-sm"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="warn">Warn</option>
          <option value="danger">Danger</option>
          <option value="neutral">Neutral</option>
        </select>
      </div>
      <Card>
        <ul className="divide-y divide-line">
          {rows.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm">
                  <span className="font-semibold">{a.actor}</span> {a.action}{" "}
                  <span className="text-ink-muted">{a.target}</span>
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">{formatDateTime(a.at)}</p>
              </div>
              <Badge tone={a.tone === "neutral" ? "neutral" : a.tone}>{a.tone}</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
