import { useCallback, useEffect, useState } from "react";
import { orderService } from "../services/api";
import { getApiErrorMessage } from "../utils/errors";

export function useOrders({ scope = "user", autoLoad = true } = {}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response =
        scope === "admin" ? await orderService.getAllOrders() : await orderService.getMyOrders();

      if (!Array.isArray(response?.data)) {
        throw new Error("Invalid order response received from the server.");
      }

      setOrders(response.data);
      setError("");
      return response.data;
    } catch (err) {
      const message = getApiErrorMessage(err);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, [scope]);

  useEffect(() => {
    if (!autoLoad) {
      return;
    }

    fetchOrders().catch(() => {});
  }, [autoLoad, fetchOrders]);

  const placeOrder = useCallback(async (payload) => orderService.createOrder(payload), []);
  const cancelOrder = useCallback(async (orderId) => orderService.cancelOrder(orderId), []);

  return {
    orders,
    loading,
    error,
    setError,
    fetchOrders,
    placeOrder,
    cancelOrder,
  };
}
