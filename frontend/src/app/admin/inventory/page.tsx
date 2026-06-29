"use client";
import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Upload, Star } from "lucide-react";
import { api, getToken, mediaUrl, API_BASE } from "@/lib/api";
import type { Chicken, ChickenStatus } from "@/types";

const empty = {
  breed_name: "", description: "", min_weight_kg: 1, max_weight_kg: 1.5,
  price_per_kg: 450, age_months: 6, status: "available" as ChickenStatus,
  is_featured: false, cover_image: "",
};
type Form = typeof empty;

export default function InventoryPage() {
  const [items, setItems] = useState<Chicken[]>([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Form>(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function load() {
    api<Chicken[]>("/chickens").then(setItems).catch(() => setItems([]));
  }
  useEffect(load, []);

  function openNew() {
    setForm(empty); setEditId(null); setError(""); setOpen(true);
  }
  function openEdit(c: Chicken) {
    setForm({
      breed_name: c.breed_name, description: c.description,
      min_weight_kg: Number(c.min_weight_kg), max_weight_kg: Number(c.max_weight_kg),
      price_per_kg: Number(c.price_per_kg), age_months: c.age_months,
      status: c.status, is_featured: c.is_featured, cover_image: c.cover_image,
    });
    setEditId(c.id); setError(""); setOpen(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      if (editId) {
        await api(`/chickens/${editId}`, { method: "PUT", json: form, auth: true });
      } else {
        await api("/chickens", { method: "POST", json: form, auth: true });
      }
      setOpen(false); load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this bird from inventory?")) return;
    await api(`/chickens/${id}`, { method: "DELETE", auth: true }).catch(() => {});
    load();
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${API_BASE}/api/uploads/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setForm((f) => ({ ...f, cover_image: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const set = (k: keyof Form, v: string | number | boolean) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-farm-greenDark">Chicken Inventory</h1>
          <p className="text-stone-500">Add, update and remove your Natu Kodi listings.</p>
        </div>
        <button onClick={openNew} className="btn-primary"><Plus className="h-5 w-5" /> Add Bird</button>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <div key={c.id} className="card">
            <div className="aspect-[4/3] bg-lime-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaUrl(c.cover_image)} alt={c.breed_name} className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-farm-greenDark">{c.breed_name}</h3>
                {c.is_featured && <Star className="h-4 w-4 fill-farm-gold text-farm-gold" />}
              </div>
              <p className="text-sm text-stone-500">
                {Number(c.min_weight_kg)}–{Number(c.max_weight_kg)} KG · ₹{Number(c.price_per_kg)}/KG · {c.age_months} mo
              </p>
              <p className="mt-1 text-xs font-semibold uppercase text-farm-leaf">{c.status}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => openEdit(c)} className="btn-outline flex-1 px-3 py-2 text-sm"><Pencil className="h-4 w-4" /> Edit</button>
                <button onClick={() => remove(c.id)} className="btn px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-stone-500">No birds yet. Add your first one.</p>}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpen(false)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-7" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-farm-greenDark">{editId ? "Edit Bird" : "Add Bird"}</h2>
              <button onClick={() => setOpen(false)}><X className="h-6 w-6 text-stone-400" /></button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div>
                <label className="label">Breed Name</label>
                <input className="input" required value={form.breed_name} onChange={(e) => set("breed_name", e.target.value)} />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea className="input min-h-[80px]" value={form.description} onChange={(e) => set("description", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Min Weight (KG)</label><input className="input" type="number" step="0.1" value={form.min_weight_kg} onChange={(e) => set("min_weight_kg", Number(e.target.value))} /></div>
                <div><label className="label">Max Weight (KG)</label><input className="input" type="number" step="0.1" value={form.max_weight_kg} onChange={(e) => set("max_weight_kg", Number(e.target.value))} /></div>
                <div><label className="label">Price / KG (₹)</label><input className="input" type="number" required value={form.price_per_kg} onChange={(e) => set("price_per_kg", Number(e.target.value))} /></div>
                <div><label className="label">Age (months)</label><input className="input" type="number" value={form.age_months} onChange={(e) => set("age_months", Number(e.target.value))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Status</label>
                  <select className="input" value={form.status} onChange={(e) => set("status", e.target.value)}>
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
                <label className="mt-7 flex items-center gap-2 text-sm font-semibold text-stone-600">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} className="h-4 w-4" />
                  Featured (Premium)
                </label>
              </div>
              <div>
                <label className="label">Cover Image</label>
                <div className="flex items-center gap-3">
                  {form.cover_image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={mediaUrl(form.cover_image)} alt="cover" className="h-16 w-16 rounded-xl object-cover" />
                  )}
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={onUpload} />
                  <button type="button" onClick={() => fileRef.current?.click()} className="btn-outline px-4 py-2 text-sm">
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    {uploading ? "Uploading" : "Upload"}
                  </button>
                </div>
                <input className="input mt-2" placeholder="or paste an image URL / path" value={form.cover_image} onChange={(e) => set("cover_image", e.target.value)} />
              </div>
              {error && <p className="rounded-xl bg-rose-50 px-4 py-2 text-sm text-rose-600">{error}</p>}
              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                {editId ? "Save Changes" : "Add Bird"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
