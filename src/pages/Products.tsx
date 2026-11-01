import { DataTable } from "@/components/DataTable";
import { Card } from "@/components/ui";
import { formatMetric } from "@/lib/format";
import { products } from "@triptych/shared-data";
import type { ProductRecord } from "@triptych/shared-types";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function Products() {
  const columns = useMemo<ColumnDef<ProductRecord>[]>(
    () => [
      { accessorKey: "name", header: "Product" },
      { accessorKey: "category", header: "Category" },
      {
        accessorKey: "units",
        header: "Units",
        cell: ({ getValue }) => <span className="tabular">{formatMetric(getValue<number>(), "number")}</span>,
      },
      {
        accessorKey: "revenue",
        header: "Revenue",
        cell: ({ getValue }) => <span className="tabular font-semibold">{formatMetric(getValue<number>(), "currency")}</span>,
      },
      {
        accessorKey: "margin",
        header: "Margin",
        cell: ({ getValue }) => <span className="tabular">{getValue<number>().toFixed(1)}%</span>,
      },
      {
        accessorKey: "trend",
        header: "Trend",
        cell: ({ getValue }) => {
          const v = getValue<number>();
          return <span className={`tabular font-semibold ${v >= 0 ? "text-success" : "text-danger"}`}>{v >= 0 ? "+" : ""}{v}%</span>;
        },
      },
    ],
    [],
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="mt-1 text-sm text-ink-muted">Catalog performance by revenue and margin.</p>
      </div>
      <Card>
        <h2 className="mb-3 text-base font-bold">Revenue by product</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={products}>
              <CartesianGrid stroke="var(--line)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--ink-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--ink-muted)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
              <Tooltip contentStyle={{ borderRadius: 12, borderColor: "var(--line)" }} />
              <Bar dataKey="revenue" fill="#0F9F86" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card padded={false} className="p-4 md:p-5">
        <DataTable data={products} columns={columns} searchPlaceholder="Search products…" />
      </Card>
    </div>
  );
}
