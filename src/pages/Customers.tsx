import { DataTable } from "@/components/DataTable";
import { Badge, Card } from "@/components/ui";
import { formatDate, formatMetric } from "@/lib/format";
import { customers } from "@triptych/shared-data";
import type { CustomerRecord } from "@triptych/shared-types";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

const statusTone = {
  active: "success",
  trial: "brand",
  paused: "warn",
  churned: "danger",
} as const;

export function Customers() {
  const [status, setStatus] = useState("all");
  const data = useMemo(
    () => (status === "all" ? customers : customers.filter((c) => c.status === status)),
    [status],
  );

  const columns = useMemo<ColumnDef<CustomerRecord>[]>(
    () => [
      { accessorKey: "name", header: "Customer" },
      { accessorKey: "plan", header: "Plan" },
      {
        accessorKey: "mrr",
        header: "MRR",
        cell: ({ getValue }) => (
          <span className="tabular font-semibold">{formatMetric(getValue<number>(), "currency")}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const v = getValue<CustomerRecord["status"]>();
          return <Badge tone={statusTone[v]}>{v}</Badge>;
        },
      },
      { accessorKey: "region", header: "Region" },
      {
        accessorKey: "lastActive",
        header: "Last active",
        cell: ({ getValue }) => formatDate(getValue<string>()),
      },
    ],
    [],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <p className="mt-1 text-sm text-ink-muted">Searchable account ledger with status filters.</p>
        </div>
        <select
          className="h-10 rounded-[12px] border border-line bg-surface px-3 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Status filter"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="trial">Trial</option>
          <option value="paused">Paused</option>
          <option value="churned">Churned</option>
        </select>
      </div>
      <Card padded={false} className="p-4 md:p-5">
        <DataTable
          data={data}
          columns={columns}
          searchPlaceholder="Search name, plan, region…"
          globalFilterFn={(row, q) =>
            [row.name, row.email, row.plan, row.region, row.status].join(" ").toLowerCase().includes(q)
          }
        />
      </Card>
    </div>
  );
}
