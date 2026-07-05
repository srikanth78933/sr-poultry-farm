"use client";
import { useEffect, useState } from "react";
import { Plus, X, Loader2, IndianRupee, Receipt } from "lucide-react";
import { api } from "@/lib/api";
import type { Order, Chicken } from "@/types";
import StatusBadge from "@/components/StatusBadge";

const emptyOrder = {
  customer_name: "", mobile: "", chicken_id: "" as string | number,
  chicken_label: "", actual_weight_kg: 1, price_per_kg: 450, notes: "",
};

export default function OrdersPage() {
  const [orders, setOrders]       = useState<Order[]>([]);
  const [chickens, setChickens]   = useState<Chicken[]>([]);
  const [open, setOpen]           = useState(false);
  const [form, setForm]           = useState(emptyOrder);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState("");
  const [payFor, setPayFor]       = useState<Order | null>(null);
  const [payAmt, setPayAmt]       = useState(0);
  const [payMethod, setPayMethod] = useState("cash");

  function load() {
    api<Order[]>("/orders", { auth: true })
      .then(setOrders)
      .catch((e) => setError(e.message));
  }
  useEffect(() => {
    load();
    api<Chicken[]>("/chickens").then(setChickens).catch(() => setChickens([]));
  }, []);

  const total = (Number(form.actual_weight_kg) * Number(form.price_per_kg)).toFixed(2);

  function pickChicken(id: string) {
    const c = chickens.find((x) => String(x.id) === id);
    setForm((f) => ({
      ...f,
      chicken_id: id,
      chicken_label: c?.breed_name ?? "",
      price_per_kg: c ? Number(c.price_per_kg) : f.price_per_kg,
    }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      await api("/orders", {
        method: "POST", auth: true,
        json: {
          customer_name: form.customer_name,
          mobile: form.mobile,
          chicken_id: form.chicken_id ? Number(form.chicken_id) : null,
          chicken_label: form.chicken_label,
          actual_weight_kg: Number(form.actual_weight_kg),
          price_per_kg: Number(form.price_per_kg),
          notes: form.notes,
        },
      });
      setOpen(false); setForm(emptyOrder); load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order");
    } finally {
      setSaving(false);
    }
  }

  async function recordPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!payFor) return;
    setSaving(true); setError("");
    try {
      await api(`/orders/${payFor.id}/payments`, {
        method: "POST", auth: true,
        json: { amount: Number(payAmt), method: payMethod, reference: "" },
      });
      setPayFor(null); setPayAmt(0); load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to record payment");
    } finally {
      setSaving(false);
    }
  }

  const modalBg  = "fixed inset-0 z-50 grid place-items-center bg-forest/40 backdrop-blur-sm p-4";
  const modalBox = "bg-cream rounded-lg shadow-lift border border-forest/10 p-7 w-full";

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="font-serif text-3xl text-forest font-medium mt-1">Orders & Billing</h1>
          <p className="text-sm text-forest/60 mt-1">Record sales after live weighing, and track payments.</p>
        </div>
        <button onClick={() => { setOpen(true); setError(""); }} className="btn-primary shrink-0">
          <Plus className="h-4 w-4" /> New Order
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-sm bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Orders table */}
      <div className="overflow-x-auto card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-forest/10 bg-kraft/30">
            <tr>
              {["Customer", "Bird", "Weight", "Rate", "Total", "Payment", "Action"].map((h) => (
                <th key={h} className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-forest/60">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-forest/5">
            {orders.map((o) => {
              const paid = o.payments.reduce((s, p) => s + Number(p.amount), 0);
              return (
                <tr key={o.id} className="hover:bg-kraft/20 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium text-forest">{o.customer_name}</p>
                    <p className="text-xs text-forest/50">{o.mobile}</p>
                  </td>
                  <td className="px-5 py-3 text-forest/80">{o.chicken_label || "—"}</td>
                  <td className="px-5 py-3 text-forest/80">{Number(o.actual_weight_kg)} kg</td>
                  <td className="px-5 py-3 text-forest/80">₹{Number(o.price_per_kg)}</td>
                  <td className="px-5 py-3 font-medium text-forest">
                    ₹{Number(o.total_amount).toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={o.payment_status} />
                    <p className="mt-1 text-xs text-forest/50">
                      ₹{paid.toLocaleString("en-IN")} paid
                    </p>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => { setPayFor(o); setPayAmt(Number(o.total_amount) - paid); setError(""); }}
                      className="btn-outline px-3 py-1.5 text-xs"
                    >
                      <IndianRupee className="h-3.5 w-3.5" /> Payment
                    </button>
                  </td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-sm uppercase tracking-widest text-forest/30">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New order modal */}
      {open && (
        <div className={modalBg} onClick={() => setOpen(false)}>
          <div
            className={`${modalBox} max-h-[90vh] max-w-lg overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between border-b border-forest/10 pb-4">
              <h2 className="font-serif text-2xl font-medium text-forest">New Order</h2>
              <button onClick={() => setOpen(false)} className="rounded-sm border border-forest/20 p-1 hover:border-forest/40 transition">
                <X className="h-5 w-5 text-forest" />
              </button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Customer Name</label>
                  <input className="input" required value={form.customer_name} onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Mobile</label>
                  <input className="input" required value={form.mobile} onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="label">Select Bird</label>
                <select className="input" value={String(form.chicken_id)} onChange={(e) => pickChicken(e.target.value)}>
                  <option value="">— Custom / not listed —</option>
                  {chickens.map((c) => (
                    <option key={c.id} value={c.id}>{c.breed_name} (₹{Number(c.price_per_kg)}/kg)</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Actual Weight (kg)</label>
                  <input className="input" type="number" step="0.001" required value={form.actual_weight_kg} onChange={(e) => setForm((f) => ({ ...f, actual_weight_kg: Number(e.target.value) }))} />
                </div>
                <div>
                  <label className="label">Price / kg (₹)</label>
                  <input className="input" type="number" required value={form.price_per_kg} onChange={(e) => setForm((f) => ({ ...f, price_per_kg: Number(e.target.value) }))} />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-forest/10 bg-kraft/30 px-4 py-3">
                <span className="flex items-center gap-2 text-forest font-medium">
                  <Receipt className="h-4 w-4 text-amber-farm" /> Total Bill
                </span>
                <span className="font-serif text-2xl font-medium text-forest">₹{total}</span>
              </div>
              <div>
                <label className="label">Notes</label>
                <input className="input" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
              </div>
              {error && (
                <div className="rounded-sm bg-red-50 border border-red-200 px-4 py-2">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} Generate Bill
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment modal */}
      {payFor && (
        <div className={modalBg} onClick={() => setPayFor(null)}>
          <div className={`${modalBox} max-w-sm`} onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between border-b border-forest/10 pb-4">
              <h2 className="font-serif text-xl font-medium text-forest">Record Payment</h2>
              <button onClick={() => setPayFor(null)} className="rounded-sm border border-forest/20 p-1 hover:border-forest/40 transition">
                <X className="h-5 w-5 text-forest" />
              </button>
            </div>
            <p className="mb-4 text-sm text-forest/60">
              Order #{payFor.id} · Total ₹{Number(payFor.total_amount).toLocaleString("en-IN")}
            </p>
            <form onSubmit={recordPayment} className="space-y-4">
              <div>
                <label className="label">Amount (₹)</label>
                <input className="input" type="number" required value={payAmt} onChange={(e) => setPayAmt(Number(e.target.value))} />
              </div>
              <div>
                <label className="label">Method</label>
                <select className="input" value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
                  <option value="cash">Cash</option>
                  <option value="upi">UPI</option>
                  <option value="card">Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>
              {error && (
                <div className="rounded-sm bg-red-50 border border-red-200 px-4 py-2">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save Payment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
