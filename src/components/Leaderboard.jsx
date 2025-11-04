import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'neuroplayScores';
function getScores() {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
}

export default function Leaderboard() {
  const [scores, setScores] = useState({});

  useEffect(() => {
    const update = () => setScores(getScores());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const entries = useMemo(() => Object.entries(scores), [scores]);
  const total = entries.reduce((acc, [, v]) => acc + (v.best || 0), 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Leaderboard & Progress</h2>
          <p className="text-slate-600 dark:text-slate-300">Track your best scores and overall growth.</p>
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-300">No scores yet — play a game to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-white/10 bg-white dark:bg-slate-900 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold capitalize">{key.replace('-', ' ')}</div>
                <div className="text-sm text-slate-500">Best: {value.best}</div>
              </div>
              <div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-500 to-fuchsia-500" style={{ width: `${Math.min(100, value.best * 10)}%` }} />
              </div>
              <div className="mt-3 text-xs text-slate-500">Recent: {value.history?.slice(0, 3).map(h => h.score).join(', ')}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-sky-500/10 to-fuchsia-500/10 p-6">
        <div className="text-sm text-slate-600 dark:text-slate-300">Overall Progress</div>
        <div className="text-3xl font-black mt-1">{total}</div>
        <div className="mt-3 h-3 w-full rounded bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500" style={{ width: `${Math.min(100, total)}%` }} />
        </div>
      </div>
    </div>
  );
}
