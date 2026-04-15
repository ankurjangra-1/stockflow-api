import { useMemo } from "react";
import EmptyState from "../components/EmptyState";
import Spinner from "../components/Spinner";
import StatCard from "../components/StatCard";
import { useOrders } from "../hooks/useOrders";
import { useProducts } from "../hooks/useProducts";
import { formatCurrency, formatNumber } from "../utils/format";

export default function UserDashboardPage() {
  const { orders, loading: ordersLoading, error: ordersError } = useOrders({ scope: "user" });
  const { products, loading: productsLoading, error: productsError } = useProducts({ pageSize: 1000 });

  const totalSpend = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0),
    [orders]
  );
  const latestOrder = orders[0];
  const loading = ordersLoading || productsLoading;
  const error = ordersError || productsError;

  if (loading) {
    return <Spinner label="Loading your dashboard..." />;
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
        <StatCard label="My Orders" value={formatNumber(orders.length)} hint="Orders placed with this account" tone="brand" />
        <StatCard label="Total Spend" value={formatCurrency(totalSpend)} hint="Lifetime order value" tone="accent" />
        <StatCard label="Products Available" value={formatNumber(products.length)} hint="Live inventory you can order" tone="emerald" />
        <StatCard
          label="Latest Order"
          value={latestOrder ? `#${latestOrder.id}` : "No orders"}
          hint="Most recent order number"
          tone="slate"
        />
      </section>

      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="You can place your first order from the My Orders page once products are available."
        />
      ) : (
        <div className="card p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Recent order summary</p>
          <div className="mt-4 space-y-4">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="rounded-3xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Order #{order.id}</p>
                    <p className="text-sm text-slate-500">{order.items.length} item(s)</p>
                  </div>
                  <p className="font-display text-xl font-bold text-slate-900">{formatCurrency(order.totalAmount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
