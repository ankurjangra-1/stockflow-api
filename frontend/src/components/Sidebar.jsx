import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const linkStyles =
  "group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition";

const getNavItems = (role) => {
  if (role === "ADMIN") {
    return [
      { to: "/admin/dashboard", label: "Dashboard", meta: "Stats" },
      { to: "/products", label: "Products", meta: "Manage" },
      { to: "/admin/orders", label: "Orders", meta: "Review" },
    ];
  }

  return [
    { to: "/user/dashboard", label: "Dashboard", meta: "Overview" },
    { to: "/products", label: "Products", meta: "Browse" },
    { to: "/user/orders", label: "My Orders", meta: "Track" },
  ];
};

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const navItems = getNavItems(user?.role);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/30 transition lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-slate-200/70 bg-white/95 p-6 shadow-soft transition lg:static lg:w-full lg:translate-x-0 lg:rounded-[2rem] lg:border lg:shadow-soft ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="rounded-[2rem] bg-mesh p-6 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">StockFlow</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900">API Frontend</h2>
          <p className="mt-3 max-w-xs text-sm text-slate-600">
            Clean inventory workspace for products, orders, and role-based dashboards.
          </p>
        </div>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `${linkStyles} ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <span>{item.label}</span>
              <span className="text-xs uppercase tracking-[0.18em] opacity-70">{item.meta}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl bg-slate-900 p-5 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Signed in as</p>
          <p className="mt-2 font-semibold">{user?.email}</p>
          <button type="button" onClick={handleLogout} className="btn-primary mt-5 w-full bg-white text-slate-900 hover:bg-slate-100">
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
