import { useState } from "react";
import EmptyState from "../components/EmptyState";
import OrderForm from "../components/OrderForm";
import Spinner from "../components/Spinner";
import { useOrders } from "../hooks/useOrders";
import { useProducts } from "../hooks/useProducts";
import { useToast } from "../context/ToastContext";
import { getApiErrorMessage } from "../utils/errors";
import { formatCurrency } from "../utils/format";

export default function OrdersPage() {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
    fetchOrders,
    cancelOrder,
    placeOrder,
  } = useOrders({ scope: "user" });
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts({ pageSize: 1000 });
  const loading = ordersLoading || productsLoading;
  const error = ordersError || productsError;

  const handlePlaceOrder = async ({ productId, quantity }) => {
    setSubmitting(true);
    try {
      await placeOrder({
        items: [{ productId, quantity }],
      });
      showToast({
        type: "success",
        title: "Order placed",
        description: "Your order was submitted successfully.",
      });
      await fetchOrders();
      return true;
    } catch (err) {
      showToast({
        type: "error",
        title: "Unable to place order",
        description: getApiErrorMessage(err),
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    setCancellingId(orderId);
    try {
      await cancelOrder(orderId);
      showToast({
        type: "success",
        title: "Order cancelled",
        description: "Stock was restored and the order was removed.",
      });
      await fetchOrders();
    } catch (err) {
      showToast({
        type: "error",
        title: "Unable to cancel order",
        description: getApiErrorMessage(err),
      });
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return <Spinner label="Loading your orders..." />;
  }

  return (
    <div className="space-y-6">
      <OrderForm products={products} onSubmit={handlePlaceOrder} loading={submitting} />

      {error ? (
        <div className="card border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
      ) : null}

      {orders.length === 0 ? (
        <EmptyState
          title="No orders found"
          description="Place an order from the form above and it will appear here immediately."
        />
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">Order #{order.id}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">{formatCurrency(order.totalAmount)}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="status-pill bg-brand-50 text-brand-700">{order.items.length} item(s)</span>
                  <button
                    type="button"
                    className="btn-secondary"
                    disabled={cancellingId === order.id}
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    {cancellingId === order.id ? "Cancelling..." : "Cancel Order"}
                  </button>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-slate-200 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{item.product.name}</p>
                        <p className="text-sm text-slate-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
