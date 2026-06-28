"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, X, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import type { Customer } from "@/types";

const empty = { name: "", mobile: "", email: "", address: "" };

export default function CustomersPage() {
  const [items, setItems] = useState<Customer[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  function load() {
    api<Customer[]>("/customers", { auth: true }).then(setItems).catch(() => setItems([]));
  }
  useEffect(load, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await api("/customers", { method: "POST", json: form, auth: true });
      setOpen(false); setForm(empty); load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this customer?")) return;
    await api(`/customers/${id}`, { method: "DELETE", auth: true }).catch(() => {});
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-farm-greenDark">Customers</h1>
          <p className="text-stone-500">Keep a record of your regular buyers.</p>
        </div>
        <button onClick={() => setOpen(true)} className="btn-primary"><Plus className="h-5 w-5" /> Add Customer</button>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <div key={c.id} className="card p-5">
            <div className="flex items-start justify-between">
              <h3 className="font-display text-lg font-bold text-farm-greenDark">{c.name}</h3>
              <button onClick={() => remove(c.id)} className="text-stone-300 hover:text-rose-500"><Trash2 className="h-4 w-4" /></button>
            </div>
            <p className="mt-2 flex items-center gap-2 text-sm text-stone-600"><Phone className="h-4 w-4 text-farm-leaf" /> {c.mobile}</p>
            {c.email && <p className="mt-1 flex items-center gap-2 text-sm text-stone-600"><Mail className="h-4 w-4 text-farm-leaf" /> {c.email}</p>}
            {c.address && <p className="mt-1 flex items-start gap-2 text-sm text-stone-500"><MapPin className="mt-0.5 h-4 w-4 text-farm-leaf" /> {c.address}</p>}
          </div>
        ))}
        {items.length === 0 && <p className="text-stone-500">No customers recorded yet.</p>}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-3xl bg-white p-7" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-farm-greenDark">Add Customer</h2>
              <button onClick={() => setOpen(false)}><X className="h-6 w-6 text-stone-400" /></button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div><label className="label">Name</label><input className="input" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} /></div>
              <div><label className="label">Mobile</label><input className="input" required value={form.mobile} onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))} /></div>
              <div><label className="label">Email</label><input className="input" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} /></div>
              <div><label className="label">Address</label><textarea className="input" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} /></div>
              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : null} Save Customer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
