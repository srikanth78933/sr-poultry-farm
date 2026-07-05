"use client";
import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Upload, Star } from "lucide-react";
import { api, getToken, API_BASE } from "@/lib/api";

type EggAvailability = "available" | "limited" | "out_of_stock";
type EggItem = {
  id: number;
  name: string;
  telugu_name: string;
  description: string;
  availability: EggAvailability;
  cover_image: string;
  is_featured: boolean;
};

const empty = {
  name: "", telugu_name: "", description: "",
  availability: "available" as EggAvailability,
  is_featured: false, cover_image: "",
};
type Form = typeof empty;

const availabilityStyle: Record<EggAvailability, string> = {
  available:    "bg-forest/10 text-forest",
  limited:      "bg-amber-farm/10 text-amber-700",
  out_of_stock: "bg-red-50 text-red-600",
};

export default function EggsAdminPage() {
  const [items, setItems]         = useState<EggItem[]>([]);
  const [open, setOpen]           = useState(false);
  const [editId, setEditId]       = useState<number | null>(null);
  const [form, setForm]           = useState<Form>(empty);
  const [saving, setSaving]       = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function load() {
    api<EggItem[]>("/eggs").then(setItems).catch(() => setItems([]));
  }
  useEffect(load, []);

  function openNew()  { setForm(empty); setEditId(null); setError(""); setOpen(true); }
  function openEdit(e: EggItem) {
    setForm({ name: e.name, telugu_name: e.telugu_name, description: e.description,
      availability: e.availability, is_featured: e.is_featured, cover_image: e.cover_image });
    setEditId(e.id); setError(""); setOpen(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (form.cover_image.startsWith("data:")) {
      setError("Please use the Upload button — pasting base64 is not supported.");
      return;
    }
    setSaving(true); setError("");
    try {
      if (editId) {
        await api(`/eggs/${editId}`, { method: "PUT", json: form, auth: true });
      } else {
        await api("/eggs", { method: "POST", json: form, auth: true });
      }
      setOpen(false); load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this egg entry?")) return;
    await api(`/eggs/${id}`, { method: "DELETE", auth: true });
    load();
  }

  async function upload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${API_BASE}/uploads/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setForm((f) => ({ ...f, cover_image: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-medium text-forest">Egg Inventory</h1>
          <p className="text-sm text-forest/50 mt-1">{items.length} egg types</p>
        </div>
        <button onClick={openNew}
          className="inline-flex items-center gap-2 bg-forest text-cream px-4 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold hover:bg-forest-deep transition-colors">
          <Plus className="size-4" /> Add Egg
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((egg) => (
          <div key={egg.id} className="bg-cream rounded-lg border border-forest/10 shadow-craft overflow-hidden">
            <div className="aspect-square relative bg-kraft/30">
              {egg.cover_image
                ? <img src={egg.cover_image} alt={egg.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-4xl">🥚</div>
              }
              {egg.is_featured && (
                <Star className="absolute top-2 left-2 size-4 fill-amber-farm text-amber-farm" />
              )}
              <span className={`absolute top-2 right-2 px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold rounded-sm ${availabilityStyle[egg.availability]}`}>
                {egg.availability.replace("_", " ")}
              </span>
            </div>
            <div className="p-3">
              <div className="font-serif text-sm font-medium text-forest">{egg.name}</div>
              {egg.telugu_name && <div className="font-telugu text-xs text-amber-farm mt-0.5">{egg.telugu_name}</div>}
              <p className="text-xs text-forest/50 mt-1 line-clamp-2">{egg.description}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEdit(egg)}
                  className="flex items-center gap-1 text-xs text-forest/60 hover:text-forest border border-forest/15 rounded-sm px-2 py-1 transition-colors">
                  <Pencil className="size-3" /> Edit
                </button>
                <button onClick={() => remove(egg.id)}
                  className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 border border-red-100 rounded-sm px-2 py-1 transition-colors">
                  <Trash2 className="size-3" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="w-full max-w-md bg-cream shadow-2xl flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-forest/10">
              <h2 className="font-serif text-lg font-medium text-forest">
                {editId ? "Edit Egg" : "New Egg"}
              </h2>
              <button onClick={() => setOpen(false)} className="text-forest/50 hover:text-forest">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={save} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {error && (
                <p className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-sm">{error}</p>
              )}

              <label className="block">
                <span className="label">Egg Name *</span>
                <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="input w-full" placeholder="Desi Country Eggs" />
              </label>

              <label className="block">
                <span className="label">Telugu Name</span>
                <input value={form.telugu_name} onChange={(e) => setForm((f) => ({ ...f, telugu_name: e.target.value }))}
                  className="input w-full font-telugu" placeholder="నాటు గుడ్లు" />
              </label>

              <label className="block">
                <span className="label">Description</span>
                <textarea rows={3} value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="input w-full resize-none" />
              </label>

              <label className="block">
                <span className="label">Availability</span>
                <select value={form.availability}
                  onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value as EggAvailability }))}
                  className="input w-full">
                  <option value="available">Available</option>
                  <option value="limited">Limited</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </label>

              <label className="block">
                <span className="label">Cover Image</span>
                <div className="flex gap-2">
                  <input value={form.cover_image}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v.startsWith("data:")) { setError("Use the Upload button instead."); return; }
                      setForm((f) => ({ ...f, cover_image: v }));
                    }}
                    className="input flex-1 text-xs" placeholder="/eggs-desi.jpg or uploaded URL" />
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-1 border border-forest/20 rounded-sm px-3 py-2 text-xs text-forest/70 hover:border-forest/40 transition-colors">
                    {uploading ? <Loader2 className="size-3 animate-spin" /> : <Upload className="size-3" />}
                    Upload
                  </button>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
                {form.cover_image && !form.cover_image.startsWith("data:") && (
                  <img src={form.cover_image} alt="" className="mt-2 h-24 rounded-sm object-cover" />
                )}
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_featured}
                  onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))}
                  className="accent-forest" />
                <span className="text-sm text-forest/80">Featured</span>
              </label>

              <button type="submit" disabled={saving}
                className="w-full bg-forest text-cream py-3 rounded-sm text-xs uppercase tracking-widest font-semibold hover:bg-forest-deep transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {saving && <Loader2 className="size-4 animate-spin" />}
                {editId ? "Save Changes" : "Add Egg"}
              </button>
            </form>
          </aside>
        </div>
      )}
    </div>
  );
}
