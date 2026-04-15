import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const titles = {
  "/admin/dashboard": "Admin Overview",
  "/admin/orders": "All Orders",
  "/user/dashboard": "User Overview",
  "/user/orders": "My Orders",
  "/products": "Products",
};

export default function Header({ onMenuToggle }) {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="btn-secondary lg:hidden"
        >
          Menu
        </button>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">StockFlow</p>
          <h1 className="section-heading">{titles[location.pathname] || "Inventory Workspace"}</h1>
        </div>
      </div>

      <div className="card flex items-center gap-4 px-5 py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 font-display text-lg font-bold text-brand-700">
          {user?.email?.slice(0, 1)?.toUpperCase() || "S"}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{user?.email}</p>
          <span
            className={`status-pill mt-1 ${
              user?.role === "ADMIN"
                ? "bg-orange-100 text-orange-800"
                : "bg-brand-100 text-brand-800"
            }`}
          >
            {user?.role}
          </span>
        </div>
      </div>
    </header>
  );
}
