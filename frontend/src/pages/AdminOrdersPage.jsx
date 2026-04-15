import EmptyState from "../components/EmptyState";
import Spinner from "../components/Spinner";
import { useOrders } from "../hooks/useOrders";
import { formatCurrency } from "../utils/format";

export default function AdminOrdersPage() {
  const { orders, loading, error } = useOrders({ scope: "admin" });

  if (loading) {
    return <Spinner label="Loading all orders..." />;
  }

  if (error) {
    return (
      <div className="card p-6 text-rose-700">
        <h3 className="font-display text-xl font-bold">Unable to load orders</h3>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders in the system"
        description="Orders created by users will appear here for admin review."
      />
    );
  }

  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <div key={order.id} className="card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Order #{order.id}</p>
              <h3 className="mt-2 font-display text-xl font-bold text-slate-900">{order.userEmail}</h3>
            </div>
            <p className="font-display text-2xl font-bold text-slate-900">{formatCurrency(order.totalAmount)}</p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {order.items.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">{item.product.name}</p>
                <p className="mt-1 text-sm text-slate-500">Quantity: {item.quantity}</p>
                <p className="mt-2 text-sm font-semibold text-slate-700">{formatCurrency(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
