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
  const [items, setItems]         = useState<Chicken[]>([]);
  const [open, setOpen]           = useState(false);
  const [editId, setEditId]       = useState<number | null>(null);
  const [form, setForm]           = useState<Form>(empty);
  const [saving, setSaving]       = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function load() {
    api<Chicken[]>("/chickens").then(setItems).catch(() => setItems([]));
  }
  useEffect(load, []);

  function openNew() { setForm(empty); setEditId(null); setError(""); setOpen(true); }
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
    if (form.cover_image.startsWith("data:")) {
      setError("Please use the Upload button to add images — pasting a base64 image is not supported. Use Upload ↑ above.");
      return;
    }
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

  async function remove(id: number, name: string) {
    if (!confirm(`Delete "${name}" from inventory? This cannot be undone.`)) return;
    setError("");
    try {
      await api(`/chickens/${id}`, { method: "DELETE", auth: true });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete bird");
    }
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

  const set = (k: keyof Form, v: string | number | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="font-serif text-3xl text-forest font-medium mt-1">Chicken Inventory</h1>
          <p className="text-sm text-forest/60 mt-1">Add, update and remove your Natu Kodi listings.</p>
        </div>
        <button onClick={openNew} className="btn-primary shrink-0">
          <Plus className="h-4 w-4" /> Add Bird
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-sm bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((c) => (
          <div key={c.id} className="card">
            <div className="aspect-square overflow-hidden bg-kraft/30 border-b border-forest/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaUrl(c.cover_image)} alt={c.breed_name} className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-medium text-forest">{c.breed_name}</h3>
                {c.is_featured && <Star className="h-4 w-4 fill-amber-farm text-amber-farm" />}
              </div>
              <p className="text-sm text-forest/60 mt-1">
                {Number(c.min_weight_kg)}–{Number(c.max_weight_kg)} kg · ₹{Number(c.price_per_kg)}/kg · {c.age_months} mo
              </p>
              <p className={`mt-1.5 text-xs font-semibold uppercase tracking-widest ${
                c.status === "available" ? "text-forest" : "text-amber-farm"
              }`}>{c.status}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => openEdit(c)}
                  className="btn-outline flex-1 px-3 py-2 text-xs"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  onClick={() => remove(c.id, c.breed_name)}
                  className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-red-600
                             hover:bg-red-600 hover:text-white transition"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm uppercase tracking-widest text-forest/30">
            No birds yet. Add your first one.
          </p>
        )}
      </div>

      {/* Add/Edit side drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-forest/40 backdrop-blur-sm flex justify-end"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg h-full bg-cream shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-forest/10 flex justify-between items-center">
              <h2 className="font-serif text-2xl text-forest">{editId ? "Edit Bird" : "Add a bird"}</h2>
              <button onClick={() => setOpen(false)} className="size-8 grid place-items-center rounded-sm hover:bg-forest/5">
                <X className="size-4" />
              </button>
            </div>
            <form onSubmit={save} className="p-6 space-y-5">
              <div>
                <label className="label">Breed Name</label>
                <input className="input" required value={form.breed_name} onChange={(e) => set("breed_name", e.target.value)} />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea className="input min-h-[80px]" value={form.description} onChange={(e) => set("description", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Min Weight (kg)</label>
                  <input className="input" type="number" step="0.1" value={form.min_weight_kg} onChange={(e) => set("min_weight_kg", Number(e.target.value))} />
                </div>
                <div>
                  <label className="label">Max Weight (kg)</label>
                  <input className="input" type="number" step="0.1" value={form.max_weight_kg} onChange={(e) => set("max_weight_kg", Number(e.target.value))} />
                </div>
                <div>
                  <label className="label">Price / kg (₹)</label>
                  <input className="input" type="number" required value={form.price_per_kg} onChange={(e) => set("price_per_kg", Number(e.target.value))} />
                </div>
                <div>
                  <label className="label">Age (months)</label>
                  <input className="input" type="number" value={form.age_months} onChange={(e) => set("age_months", Number(e.target.value))} />
                </div>
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
                <label className="mt-6 flex cursor-pointer items-center gap-2 text-sm text-forest">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} className="h-4 w-4 accent-amber-farm" />
                  Featured (Premium)
                </label>
              </div>
              <div>
                <label className="label">Cover Image</label>
                <div className="flex items-center gap-3">
                  {form.cover_image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={mediaUrl(form.cover_image)} alt="cover" className="h-16 w-16 rounded-sm border border-forest/10 object-cover" />
                  )}
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={onUpload} />
                  <button type="button" onClick={() => fileRef.current?.click()} className="btn-outline px-4 py-2 text-xs">
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    {uploading ? "Uploading…" : "Upload"}
                  </button>
                </div>
                <input
                  className="input mt-2"
                  placeholder="or paste an image URL / path"
                  value={form.cover_image.startsWith("data:") ? "" : form.cover_image}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v.startsWith("data:")) {
                      setError("Use the Upload button to add images — base64 data URLs are not supported.");
                    } else {
                      setError("");
                      set("cover_image", v);
                    }
                  }}
                />
              </div>
              {error && (
                <div className="rounded-sm bg-red-50 border border-red-200 px-4 py-2">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {editId ? "Save Changes" : "Add Bird"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
