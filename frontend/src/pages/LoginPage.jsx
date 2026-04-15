import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../context/ToastContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, getLoginErrorMessage } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { redirectTo } = await login(form);
      showToast({
        type: "success",
        title: "Welcome back",
        description: "You are signed in successfully.",
      });
      navigate(from || redirectTo, { replace: true });
    } catch (error) {
      showToast({
        type: "error",
        title: "Login failed",
        description: getLoginErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh px-4 py-8 md:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-6 overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-soft backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden overflow-hidden p-10 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.18),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.15),transparent_24%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">StockFlow Frontend</p>
              <h1 className="mt-6 max-w-lg font-display text-5xl font-bold leading-tight text-slate-950">
                Inventory and order operations in one simple workspace.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Manage products, review orders, and monitor admin stats through a clean React dashboard built for your Spring Boot API.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="card animate-float p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Role-aware UI</p>
                <p className="mt-3 text-2xl font-bold text-slate-900">ADMIN + USER</p>
                <p className="mt-3 text-sm text-slate-500">Separate dashboards, route guards, and protected actions.</p>
              </div>
              <div className="card p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Backend connected</p>
                <p className="mt-3 text-2xl font-bold text-slate-900">JWT + Axios</p>
                <p className="mt-3 text-sm text-slate-500">Automatic token attach, error handling, and live inventory flows.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 md:px-10">
          <div className="w-full max-w-md">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">Welcome back</p>
              <h2 className="mt-4 font-display text-4xl font-bold text-slate-950">Login to StockFlow</h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Use your backend account credentials. JWT is stored in local storage and used for every protected request.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3.5" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Protected access</p>
              <p className="mt-2 text-sm text-slate-600">
                Admin users can manage products and view dashboard stats. User accounts can browse products and place orders.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
