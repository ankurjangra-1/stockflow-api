import { formatCurrency, formatNumber } from "../utils/format";

export default function ProductTable({ products, canManage, onDelete, deletingId }) {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-slate-200 px-6 py-5">
        <h3 className="font-display text-xl font-bold text-slate-900">Inventory</h3>
        <p className="mt-1 text-sm text-slate-500">Browse live product data from your StockFlow API.</p>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {["ID", "Name", "Quantity", "Price", "Actions"].map((heading) => (
                <th key={heading} className="px-6 py-4 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50/60">
                <td className="px-6 py-4 text-sm font-semibold text-slate-500">#{product.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">{product.name}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{formatNumber(product.quantity)}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4">
                  {canManage ? (
                    <button
                      type="button"
                      onClick={() => onDelete(product)}
                      disabled={deletingId === product.id}
                      className="btn-danger"
                    >
                      {deletingId === product.id ? "Deleting..." : "Delete"}
                    </button>
                  ) : (
                    <span className="status-pill bg-brand-50 text-brand-700">Available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 p-4 md:hidden">
        {products.map((product) => (
          <div key={product.id} className="rounded-3xl border border-slate-200 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Product #{product.id}</p>
                <h4 className="mt-2 font-display text-lg font-bold text-slate-900">{product.name}</h4>
              </div>
              <span className="status-pill bg-brand-50 text-brand-700">{product.quantity} in stock</span>
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-700">{formatCurrency(product.price)}</p>
            {canManage ? (
              <button
                type="button"
                onClick={() => onDelete(product)}
                disabled={deletingId === product.id}
                className="btn-danger mt-4 w-full"
              >
                {deletingId === product.id ? "Deleting..." : "Delete"}
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
