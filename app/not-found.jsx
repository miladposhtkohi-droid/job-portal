import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="portal-card p-10 sm:p-14 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-2xl font-bold">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-3">
          Sidan kunde inte hittas
        </h1>
        <p className="text-slate-300 text-sm mb-8 leading-relaxed">
          Vi kunde tyvärr inte hitta sidan du letade efter. Den kan ha flyttats eller tagits bort.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-secondary text-sm">
            Gå till startsidan
          </Link>
          <Link href="/jobs" className="btn-accent text-sm">
            Se alla lediga jobb
          </Link>
        </div>
      </div>
    </main>
  );
}
