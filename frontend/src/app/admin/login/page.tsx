"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { login, setToken } from "@/lib/api";
import LogoMark from "@/components/LogoMark";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = await login(email, password);
      setToken(token);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-forest relative overflow-hidden grid place-items-center px-4">
      <div className="absolute inset-0 kraft-noise opacity-10" />

<div className="relative w-full max-w-md">
        {/* Brand */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8">
          <LogoMark size={72} />
          <div>
            <div className="text-cream font-serif uppercase tracking-tight font-semibold">
              Natu Kodi Farms
            </div>
            <div className="text-[9px] uppercase tracking-[0.22em] text-cream/50">
              Admin Console
            </div>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-cream rounded-lg shadow-lift p-8 border border-forest/10">
          <span className="font-telugu text-amber-farm text-lg block mb-1">స్వాగతం</span>
          <h1 className="font-serif text-2xl text-forest font-medium mb-1">Sign in</h1>
          <p className="text-sm text-forest/60 mb-8">
            Manage inventory, bookings, orders & customers.
          </p>

          <form onSubmit={submit} className="space-y-5">
            <label className="block">
              <span className="label">Email</span>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-forest/40" />
                <input
                  required
                  type="email"
                  autoComplete="username"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-forest/5 border border-forest/15 rounded-sm py-3 pl-10 pr-4 text-sm text-forest focus:border-amber-farm outline-none transition"
                />
              </div>
            </label>

            <label className="block">
              <span className="label">Password</span>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-forest/40" />
                <input
                  required
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-forest/5 border border-forest/15 rounded-sm py-3 pl-10 pr-4 text-sm text-forest focus:border-amber-farm outline-none transition"
                />
              </div>
            </label>

            {error && (
              <p className="rounded-sm bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest text-cream py-3 rounded-sm text-xs uppercase tracking-[0.2em] font-semibold hover:bg-forest-deep transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : null}
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-xs uppercase tracking-widest text-cream/50 hover:text-cream transition-colors"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
