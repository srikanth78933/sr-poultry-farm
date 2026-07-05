const map: Record<string, string> = {
  available: "border-forest/30 bg-forest/10 text-forest",
  reserved:  "border-amber-farm/40 bg-amber-farm/10 text-amber-deep",
  sold:      "border-forest/15 bg-kraft/50 text-forest/60",
  pending:   "border-amber-farm/40 bg-amber-farm/10 text-amber-deep",
  approved:  "border-forest/30 bg-forest/10 text-forest",
  rejected:  "border-red-300 bg-red-50 text-red-600",
  completed: "border-forest/15 bg-kraft/50 text-forest/70",
  cancelled: "border-forest/10 bg-kraft/30 text-forest/50",
  billed:    "border-forest/15 bg-kraft/50 text-forest/70",
  unpaid:    "border-red-300 bg-red-50 text-red-600",
  partial:   "border-amber-farm/40 bg-amber-farm/10 text-amber-deep",
  paid:      "border-forest/30 bg-forest/10 text-forest",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`chip border capitalize ${map[status] ?? "border-forest/10 bg-kraft/30 text-forest/50"}`}>
      {status}
    </span>
  );
}
