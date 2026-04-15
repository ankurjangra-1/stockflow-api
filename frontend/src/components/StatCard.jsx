export default function StatCard({ label, value, hint, tone = "brand" }) {
  const tones = {
    brand: "from-brand-600/10 to-brand-100",
    accent: "from-orange-500/10 to-orange-100",
    emerald: "from-emerald-500/10 to-emerald-100",
    slate: "from-slate-500/10 to-slate-100",
  };

  return (
    <div className="card overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${tones[tone] || tones.brand}`} />
      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
        <h3 className="mt-3 font-display text-3xl font-bold text-slate-900">{value}</h3>
        {hint ? <p className="mt-2 text-sm text-slate-500">{hint}</p> : null}
      </div>
    </div>
  );
}
