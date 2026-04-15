import { useEffect, useMemo, useState } from "react";

export default function OrderForm({ products, onSubmit, loading }) {
  const availableProducts = useMemo(
    () => products.filter((product) => Number(product.quantity) > 0),
    [products]
  );
  const [selectedProductId, setSelectedProductId] = useState(availableProducts[0]?.id || "");
  const [quantity, setQuantity] = useState(1);

  const activeProduct = availableProducts.find((product) => String(product.id) === String(selectedProductId));

  useEffect(() => {
    if (!availableProducts.length) {
      setSelectedProductId("");
      return;
    }

    if (!availableProducts.some((product) => String(product.id) === String(selectedProductId))) {
      setSelectedProductId(availableProducts[0].id);
    }
  }, [availableProducts, selectedProductId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await onSubmit({
      productId: Number(selectedProductId),
      quantity: Number(quantity),
    });
    if (success) {
      setQuantity(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900">Place Order</h3>
          <p className="mt-1 text-sm text-slate-500">Create a new order using the currently available products.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr_auto]">
        <select
          className="form-input"
          value={selectedProductId}
          onChange={(event) => setSelectedProductId(event.target.value)}
          disabled={availableProducts.length === 0}
        >
          {availableProducts.length === 0 ? (
            <option value="">No products available</option>
          ) : (
            availableProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.quantity} available)
              </option>
            ))
          )}
        </select>
        <input
          className="form-input"
          type="number"
          min="1"
          max={activeProduct?.quantity || 1}
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          disabled={availableProducts.length === 0}
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={loading || availableProducts.length === 0}
        >
          {loading ? "Placing..." : "Place Order"}
        </button>
      </div>

      {activeProduct ? (
        <p className="mt-4 text-sm text-slate-500">
          Selected product price: <span className="font-semibold text-slate-700">₹{Number(activeProduct.price).toFixed(2)}</span>
        </p>
      ) : null}
    </form>
  );
}
