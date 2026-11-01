import { DataTable } from "@/components/DataTable";
import { Badge, Button, Card } from "@/components/ui";
import { formatDateTime, formatMetric, toCsv } from "@/lib/format";
import { orders } from "@triptych/shared-data";
import type { OrderRecord } from "@triptych/shared-types";
import type { ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

export function Orders() {
  const [open, setOpen] = useState<OrderRecord | null>(null);
  const columns = useMemo<ColumnDef<OrderRecord>[]>(
    () => [
      { accessorKey: "id", header: "Order" },
      { accessorKey: "customer", header: "Customer" },
      { accessorKey: "product", header: "Product" },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ getValue }) => (
          <span className="tabular font-semibold">{formatMetric(getValue<number>(), "currency")}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const v = getValue<OrderRecord["status"]>();
          const tone =
            v === "paid" ? "success" : v === "pending" ? "warn" : v === "failed" ? "danger" : "neutral";
          return <Badge tone={tone}>{v}</Badge>;
        },
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Button variant="ghost" className="h-8 px-2" onClick={() => setOpen(row.original)}>
            View
          </Button>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="mt-1 text-sm text-ink-muted">Payments with status chips and detail modal.</p>
        </div>
        <Button
          variant="soft"
          onClick={() => {
            const csv = toCsv(orders as unknown as Record<string, unknown>[]);
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "fathom-orders-demo.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          <Download size={16} /> Export CSV
        </Button>
      </div>
      <Card padded={false} className="p-4 md:p-5">
        <DataTable data={orders} columns={columns} searchPlaceholder="Search orders…" />
      </Card>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-ink/35 p-4 backdrop-blur-[2px]"
            role="dialog"
            aria-modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md rounded-[18px] border border-line bg-surface p-5 shadow-[var(--shadow-2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold">{open.id}</h2>
                  <p className="text-sm text-ink-muted">{formatDateTime(open.createdAt)}</p>
                </div>
                <Button variant="ghost" onClick={() => setOpen(null)}>
                  Close
                </Button>
              </div>
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-ink-muted">Customer</dt><dd className="font-medium">{open.customer}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-muted">Product</dt><dd className="font-medium">{open.product}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-muted">Channel</dt><dd className="font-medium">{open.channel}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-muted">Amount</dt><dd className="tabular font-semibold">{formatMetric(open.amount, "currency")}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-ink-muted">Status</dt><dd className="font-medium">{open.status}</dd></div>
              </dl>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
