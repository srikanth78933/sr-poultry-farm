const map: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-700",
  reserved: "bg-amber-100 text-amber-700",
  sold: "bg-stone-200 text-stone-600",
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  completed: "bg-sky-100 text-sky-700",
  cancelled: "bg-stone-200 text-stone-600",
  billed: "bg-sky-100 text-sky-700",
  unpaid: "bg-rose-100 text-rose-700",
  partial: "bg-amber-100 text-amber-700",
  paid: "bg-emerald-100 text-emerald-700",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`chip capitalize ${map[status] ?? "bg-stone-100 text-stone-600"}`}>
      {status}
    </span>
  );
}
