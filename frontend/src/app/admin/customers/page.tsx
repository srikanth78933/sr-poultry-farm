"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, X, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import type { Customer } from "@/types";

const empty = { name: "", mobile: "", email: "", address: "" };

export default function CustomersPage() {
  const [items, setItems]       = useState<Customer[]>([]);
  const [open, setOpen]         = useState(false);
  const [form, setForm]         = useState(empty);
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError]       = useState("");

  function load() {
    api<Customer[]>("/customers", { auth: true })
      .then(setItems)
      .catch((e) => setError(e.message));
  }
  useEffect(load, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      await api("/customers", { method: "POST", json: form, auth: true });
      setOpen(false); setForm(empty); load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save customer");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number, name: string) {
    if (!confirm(`Delete customer "${name}"? This cannot be undone.`)) return;
    setDeleting(id); setError("");
    try {
      await api(`/customers/${id}`, { method: "DELETE", auth: true });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete customer");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="font-serif text-3xl text-forest font-medium mt-1">Customers</h1>
          <p className="text-sm text-forest/60 mt-1">Keep a record of your regular buyers.</p>
        </div>
        <button onClick={() => { setOpen(true); setError(""); }} className="btn-primary shrink-0">
          <Plus className="h-4 w-4" /> Add Customer
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-sm bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Customer cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <div key={c.id} className="card p-5">
            <div className="flex items-start justify-between">
              <h3 className="font-serif text-lg font-medium text-forest">{c.name}</h3>
              <button
                onClick={() => remove(c.id, c.name)}
                disabled={deleting === c.id}
                className="rounded-sm p-1 text-forest/30 transition
                           hover:text-red-600 disabled:opacity-50"
                title="Delete customer"
              >
                {deleting === c.id
                  ? <Loader2 className="h-4 w-4 animate-spin" />
                  : <Trash2 className="h-4 w-4" />
                }
              </button>
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm text-forest/80">
              <Phone className="h-4 w-4 text-amber-farm" /> {c.mobile}
            </p>
            {c.email && (
              <p className="mt-1.5 flex items-center gap-2 text-sm text-forest/80">
                <Mail className="h-4 w-4 text-amber-farm" /> {c.email}
              </p>
            )}
            {c.address && (
              <p className="mt-1.5 flex items-start gap-2 text-sm text-forest/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-farm" /> {c.address}
              </p>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm uppercase tracking-widest text-forest/30">
            No customers recorded yet.
          </p>
        )}
      </div>

      {/* Add customer modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-forest/40 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md bg-cream rounded-lg shadow-lift border border-forest/10 p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between border-b border-forest/10 pb-4">
              <h2 className="font-serif text-2xl font-medium text-forest">Add Customer</h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-sm border border-forest/20 p-1 hover:border-forest/40 transition"
              >
                <X className="h-5 w-5 text-forest" />
              </button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div>
                <label className="label">Name</label>
                <input className="input" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className="label">Mobile</label>
                <input className="input" required value={form.mobile} onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))} />
              </div>
              <div>
                <label className="label">Email</label>
                <input className="input" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className="label">Address</label>
                <textarea className="input" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} />
              </div>
              {error && (
                <div className="rounded-sm bg-red-50 border border-red-200 px-4 py-2">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save Customer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
