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
  const [orders, setOrders] = useState<Order[]>([]);
  const [chickens, setChickens] = useState<Chicken[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyOrder);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [payFor, setPayFor] = useState<Order | null>(null);
  const [payAmt, setPayAmt] = useState(0);
  const [payMethod, setPayMethod] = useState("cash");

  function load() {
    api<Order[]>("/orders", { auth: true }).then(setOrders).catch(() => setOrders([]));
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
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setSaving(false);
    }
  }

  async function recordPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!payFor) return;
    await api(`/orders/${payFor.id}/payments`, {
      method: "POST", auth: true,
      json: { amount: Number(payAmt), method: payMethod, reference: "" },
    }).catch(() => {});
    setPayFor(null); setPayAmt(0); load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-farm-greenDark">Orders & Billing</h1>
          <p className="text-stone-500">Record sales after live weighing, and track payments.</p>
        </div>
        <button onClick={() => setOpen(true)} className="btn-primary"><Plus className="h-5 w-5" /> New Order</button>
      </div>

      <div className="mt-7 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-farm-green/5 text-stone-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Bird</th>
              <th className="px-5 py-3 font-semibold">Weight</th>
              <th className="px-5 py-3 font-semibold">Rate</th>
              <th className="px-5 py-3 font-semibold">Total</th>
              <th className="px-5 py-3 font-semibold">Payment</th>
              <th className="px-5 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {orders.map((o) => {
              const paid = o.payments.reduce((s, p) => s + Number(p.amount), 0);
              return (
                <tr key={o.id} className="hover:bg-stone-50">
                  <td className="px-5 py-3">
                    <p className="font-semibold text-stone-800">{o.customer_name}</p>
                    <p className="text-xs text-stone-400">{o.mobile}</p>
                  </td>
                  <td className="px-5 py-3 text-stone-600">{o.chicken_label || "—"}</td>
                  <td className="px-5 py-3 text-stone-600">{Number(o.actual_weight_kg)} KG</td>
                  <td className="px-5 py-3 text-stone-600">₹{Number(o.price_per_kg)}</td>
                  <td className="px-5 py-3 font-bold text-farm-green">₹{Number(o.total_amount).toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={o.payment_status} />
                    <p className="mt-1 text-xs text-stone-400">₹{paid.toLocaleString("en-IN")} paid</p>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => { setPayFor(o); setPayAmt(Number(o.total_amount) - paid); }}
                      className="btn-outline px-3 py-1.5 text-xs"><IndianRupee className="h-3.5 w-3.5" /> Payment</button>
                  </td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-8 text-center text-stone-400">No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* New order modal */}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-7" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-farm-greenDark">New Order</h2>
              <button onClick={() => setOpen(false)}><X className="h-6 w-6 text-stone-400" /></button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Customer Name</label><input className="input" required value={form.customer_name} onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))} /></div>
                <div><label className="label">Mobile</label><input className="input" required value={form.mobile} onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))} /></div>
              </div>
              <div>
                <label className="label">Select Bird</label>
                <select className="input" value={String(form.chicken_id)} onChange={(e) => pickChicken(e.target.value)}>
                  <option value="">— Custom / not listed —</option>
                  {chickens.map((c) => <option key={c.id} value={c.id}>{c.breed_name} (₹{Number(c.price_per_kg)}/KG)</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Actual Weight (KG)</label><input className="input" type="number" step="0.001" required value={form.actual_weight_kg} onChange={(e) => setForm((f) => ({ ...f, actual_weight_kg: Number(e.target.value) }))} /></div>
                <div><label className="label">Price / KG (₹)</label><input className="input" type="number" required value={form.price_per_kg} onChange={(e) => setForm((f) => ({ ...f, price_per_kg: Number(e.target.value) }))} /></div>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-farm-green/5 px-4 py-3">
                <span className="flex items-center gap-2 font-semibold text-stone-600"><Receipt className="h-4 w-4" /> Total Bill</span>
                <span className="text-2xl font-bold text-farm-green">₹{total}</span>
              </div>
              <div><label className="label">Notes</label><input className="input" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} /></div>
              {error && <p className="rounded-xl bg-rose-50 px-4 py-2 text-sm text-rose-600">{error}</p>}
              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : null} Generate Bill
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment modal */}
      {payFor && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setPayFor(null)}>
          <div className="w-full max-w-sm rounded-3xl bg-white p-7" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-farm-greenDark">Record Payment</h2>
              <button onClick={() => setPayFor(null)}><X className="h-6 w-6 text-stone-400" /></button>
            </div>
            <p className="text-sm text-stone-500">Order #{payFor.id} · Total ₹{Number(payFor.total_amount).toLocaleString("en-IN")}</p>
            <form onSubmit={recordPayment} className="mt-4 space-y-4">
              <div><label className="label">Amount (₹)</label><input className="input" type="number" required value={payAmt} onChange={(e) => setPayAmt(Number(e.target.value))} /></div>
              <div>
                <label className="label">Method</label>
                <select className="input" value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
                  <option value="cash">Cash</option>
                  <option value="upi">UPI</option>
                  <option value="card">Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full">Save Payment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
