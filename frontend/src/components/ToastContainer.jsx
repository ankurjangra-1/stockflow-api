const styles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-rose-200 bg-rose-50 text-rose-900",
  info: "border-brand-200 bg-brand-50 text-brand-900",
};

export default function ToastContainer({ toasts, onClose }) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
            className={`pointer-events-auto animate-slideUp rounded-2xl border px-4 py-3 shadow-soft ${styles[toast.type] || styles.info}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description ? (
                <p className="mt-1 text-sm opacity-90">{toast.description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => onClose(toast.id)}
              className="rounded-full px-2 py-1 text-xs font-semibold transition hover:bg-white/60"
            >
              Close
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
