import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import Spinner from "../components/Spinner";
import { dashboardService } from "../services/api";
import { getApiErrorMessage } from "../utils/errors";
import { formatCurrency, formatNumber } from "../utils/format";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardService.getStats();
        if (!response?.data || typeof response.data !== "object") {
          throw new Error("Invalid dashboard response received from the server.");
        }
        setStats(response.data);
      } catch (err) {
        setError(getApiErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <Spinner label="Loading admin dashboard..." />;
  }

  if (error) {
    return (
      <div className="card p-6 text-rose-700">
        <h3 className="font-display text-xl font-bold">Unable to load dashboard</h3>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Products" value={formatNumber(stats.totalProducts)} hint="Current inventory items" tone="brand" />
        <StatCard label="Total Orders" value={formatNumber(stats.totalOrders)} hint="Orders processed in the system" tone="accent" />
        <StatCard label="Revenue" value={formatCurrency(stats.totalRevenue)} hint="Combined order value" tone="emerald" />
        <StatCard label="Low Stock" value={formatNumber(stats.lowStockProducts)} hint="Items at or under threshold" tone="slate" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="card p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Admin workflow</p>
          <h3 className="mt-3 font-display text-2xl font-bold text-slate-900">Keep inventory healthy and revenue visible.</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            This dashboard is connected directly to the StockFlow dashboard endpoint. Use the Products page to manage inventory and the Orders page to review all orders in the system.
          </p>
        </div>

        <div className="card p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Alerts</p>
          <div className="mt-4 space-y-4">
            <div className="rounded-3xl bg-orange-50 p-4 text-orange-900">
              <p className="text-sm font-semibold">Low stock products</p>
              <p className="mt-1 text-2xl font-bold">{formatNumber(stats.lowStockProducts)}</p>
            </div>
            <div className="rounded-3xl bg-brand-50 p-4 text-brand-900">
              <p className="text-sm font-semibold">Revenue snapshot</p>
              <p className="mt-1 text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
