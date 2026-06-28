"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Egg, Loader2, Lock } from "lucide-react";
import { login, setToken } from "@/lib/api";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@srpoultryfarm.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="grid min-h-screen place-items-center bg-farm-greenDark p-5">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-farm-green text-farm-sand">
            <Egg className="h-7 w-7" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold text-farm-greenDark">SR Poultry Farm</h1>
          <p className="text-sm text-stone-500">Admin Dashboard Login</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-stone-400">
          Default seed credentials are set via backend environment variables.
        </p>
      </div>
    </div>
  );
}
