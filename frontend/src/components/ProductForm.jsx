import { useState } from "react";

const initialState = {
  name: "",
  quantity: "",
  price: "",
};

export default function ProductForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await onSubmit({
      name: form.name.trim(),
      quantity: Number(form.quantity),
      price: Number(form.price),
    });
    if (success) {
      setForm(initialState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold text-slate-900">Add Product</h3>
          <p className="mt-1 text-sm text-slate-500">Create inventory items directly from the admin workspace.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <input
          className="form-input"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product name"
          required
        />
        <input
          className="form-input"
          type="number"
          min="0"
          step="1"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <input
          className="form-input"
          type="number"
          min="0.01"
          step="0.01"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Add Product"}
        </button>
      </div>
    </form>
  );
}
