import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="card max-w-lg p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-slate-950">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-slate-500">
          The page you are looking for does not exist or is no longer available.
        </p>
        <Link to="/login" className="btn-primary mt-8">
          Go to Login
        </Link>
      </div>
    </div>
  );
}
