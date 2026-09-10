import Link from "next/link";

export default function JobNotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="portal-card p-10 sm:p-14 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-2xl font-bold">
          !
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-3">
          Tjänsten hittades inte
        </h1>
        <p className="text-slate-300 text-sm mb-8 leading-relaxed">
          Jobbannonsen du söker är antingen avslutad eller så har adressen ändrats.
        </p>
        <Link href="/jobs" className="btn-accent text-sm">
          Utforska alla aktuella jobb
        </Link>
      </div>
    </main>
  );
}
