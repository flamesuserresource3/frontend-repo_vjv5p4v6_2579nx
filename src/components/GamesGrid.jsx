import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

// Utility to persist scores in localStorage
const STORAGE_KEY = 'neuroplayScores';
function getScores() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}
function saveScore(gameKey, score) {
  const scores = getScores();
  const entry = scores[gameKey] || { best: 0, history: [] };
  entry.best = Math.max(entry.best || 0, score);
  entry.history = [{ score, ts: Date.now() }, ...(entry.history || [])].slice(0, 20);
  scores[gameKey] = entry;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

const GAMES = [
  {
    key: 'memory-matrix',
    name: 'Memory Matrix',
    color: 'from-sky-400 to-cyan-500',
    desc: 'Memorize and repeat light-up patterns. Trains visual working memory.'
  },
  {
    key: 'word-flex',
    name: 'Word Flex',
    color: 'from-fuchsia-400 to-violet-500',
    desc: 'Unscramble the hidden word fast. Trains verbal fluency.'
  },
  {
    key: 'logic-rush',
    name: 'Logic Rush',
    color: 'from-emerald-400 to-teal-500',
    desc: 'Spot the rule in number sequences. Trains reasoning.'
  },
  {
    key: 'speed-match',
    name: 'Speed Match',
    color: 'from-amber-400 to-orange-500',
    desc: 'Decide quickly if two symbols match. Trains focus & reflexes.'
  }
];

export default function GamesGrid() {
  const [active, setActive] = useState(null); // game key
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (score && active) {
      saveScore(active, score);
    }
  }, [score, active]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Games Library</h2>
          <p className="text-slate-600 dark:text-slate-300">Pick a challenge and start training.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {GAMES.map((g, idx) => (
          <motion.button
            key={g.key}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setActive(g.key); setScore(null); }}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur p-5 text-left`}
          >
            <div className={`absolute inset-0 opacity-70 bg-gradient-to-br ${g.color}`} />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-white/80">NeuroPlay</div>
              <div className="mt-1 text-xl font-semibold text-white drop-shadow">{g.name}</div>
              <p className="mt-3 text-sm text-white/90 drop-shadow-sm min-h-[48px]">{g.desc}</p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/20 text-white px-4 py-2 text-sm">
                Play Now <span aria-hidden>→</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {active && (
        <GameModal
          gameKey={active}
          onClose={() => setActive(null)}
          onScore={(s) => setScore(s)}
        />
      )}
    </div>
  );
}

function GameModal({ gameKey, onClose, onScore }) {
  // Close on escape key
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const gameTitle = useMemo(() => GAMES.find(g => g.key === gameKey)?.name || 'Game', [gameKey]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative max-w-3xl w-[92vw] md:w-[800px] bg-white dark:bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="font-semibold text-lg">{gameTitle}</h3>
          <button onClick={onClose} className="rounded-full px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">Close</button>
        </div>
        <div className="p-5">
          {gameKey === 'memory-matrix' && <MemoryMatrix onScore={onScore} />}
          {gameKey === 'word-flex' && <WordFlex onScore={onScore} />} 
          {gameKey === 'logic-rush' && <LogicRush onScore={onScore} />} 
          {gameKey === 'speed-match' && <SpeedMatch onScore={onScore} />} 
        </div>
      </div>
    </div>
  );
}

// 1) Memory Matrix - simple 3x3 pattern recall
function MemoryMatrix({ onScore }) {
  const size = 3;
  const [pattern, setPattern] = useState([]);
  const [showing, setShowing] = useState(false);
  const [selected, setSelected] = useState([]);
  const [round, setRound] = useState(1);
  const [best, setBest] = useState(0);

  useEffect(() => {
    setBest(getScores()?.['memory-matrix']?.best || 0);
  }, []);

  const startRound = () => {
    const len = Math.min(5, round + 2); // grows slowly
    const cells = new Set();
    while (cells.size < len) {
      cells.add(Math.floor(Math.random() * size * size));
    }
    const newPattern = Array.from(cells);
    setPattern(newPattern);
    setSelected([]);
    setShowing(true);
    setTimeout(() => setShowing(false), 1000 + len * 200);
  };

  const toggle = (idx) => {
    if (showing) return;
    setSelected((prev) => {
      if (prev.includes(idx)) return prev;
      const next = [...prev, idx];
      if (next.length === pattern.length) {
        const ok = pattern.every((p) => next.includes(p));
        const score = ok ? round : round - 1;
        if (ok) setRound((r) => r + 1);
        onScore(score);
      }
      return next;
    });
  };

  return (
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">Remember the highlighted cells, then reproduce the pattern.</p>
      <div className="flex items-center gap-3 mb-4 text-sm">
        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Round: {round}</span>
        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Best: {best}</span>
      </div>
      <div className={`grid grid-cols-3 gap-2 max-w-xs`}>
        {Array.from({ length: size * size }).map((_, idx) => {
          const lit = showing ? pattern.includes(idx) : selected.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => toggle(idx)}
              className={`h-20 w-20 rounded-lg border border-white/10 transition-colors ${lit ? 'bg-sky-400' : 'bg-slate-200 dark:bg-slate-800'}`}
            />
          );
        })}
      </div>
      <div className="mt-4">
        <button onClick={startRound} className="rounded-full bg-sky-500 text-white px-4 py-2">{showing ? 'Memorizing…' : round === 1 ? 'Start' : 'Next Round'}</button>
      </div>
    </div>
  );
}

// 2) Word Flex - simple unscramble from a small list
const WORDS = ['NEURON', 'MEMORY', 'LOGIC', 'FOCUS', 'BRAIN', 'PUZZLE'];
function shuffle(str) {
  return str.split('').sort(() => Math.random() - 0.5).join('');
}
function WordFlex({ onScore }) {
  const [target, setTarget] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [input, setInput] = useState('');
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => { setBest(getScores()?.['word-flex']?.best || 0); }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTimeLeft((t) => {
      if (t <= 1) { clearInterval(id); setRunning(false); onScore(points); }
      return t - 1;
    }), 1000);
    return () => clearInterval(id);
  }, [running, points, onScore]);

  const newWord = () => {
    const w = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTarget(w);
    setScrambled(shuffle(w));
    setInput('');
  };

  const start = () => { setPoints(0); setTimeLeft(30); setRunning(true); newWord(); };

  const submit = () => {
    if (input.toUpperCase() === target) {
      setPoints((p) => p + Math.max(1, 7 - input.length));
      newWord();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3 text-sm">
        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Time: {timeLeft}s</span>
        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Score: {points}</span>
        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Best: {best}</span>
      </div>
      <div className="text-3xl tracking-widest font-black">{scrambled || '—'}</div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2" placeholder="Type the word" />
        <button onClick={submit} className="rounded-lg bg-fuchsia-500 text-white px-4">Submit</button>
      </div>
      <div>
        <button onClick={start} className="rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white px-4 py-2">{running ? 'Restart' : 'Start'}</button>
      </div>
    </div>
  );
}

// 3) Logic Rush - number sequence multiple choice
const SEQS = [
  { seq: [2,4,6,8], options: [10, 12, 9], answer: 10 },
  { seq: [1,1,2,3,5], options: [8, 7, 9], answer: 8 },
  { seq: [3,6,12,24], options: [36, 48, 30], answer: 48 },
  { seq: [10,7,4,1], options: [-2, 0, 2], answer: -2 },
];
function LogicRush({ onScore }) {
  const [idx, setIdx] = useState(0);
  const [points, setPoints] = useState(0);
  const [best, setBest] = useState(0);
  useEffect(() => { setBest(getScores()?.['logic-rush']?.best || 0); }, []);

  const pick = (opt) => {
    const q = SEQS[idx % SEQS.length];
    if (opt === q.answer) setPoints((p) => p + 1);
    if ((idx + 1) % SEQS.length === 0) {
      onScore(points + (opt === q.answer ? 1 : 0));
    }
    setIdx((i) => i + 1);
  };

  const q = SEQS[idx % SEQS.length];
  return (
    <div>
      <div className="mb-3 text-sm flex gap-3">
        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Score: {points}</span>
        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Best: {best}</span>
      </div>
      <div className="text-lg mb-2">Complete the sequence:</div>
      <div className="text-2xl font-bold tracking-wide">{q.seq.join(', ')} , …</div>
      <div className="mt-4 flex flex-wrap gap-3">
        {q.options.map((o) => (
          <button key={o} onClick={() => pick(o)} className="rounded-xl bg-emerald-500 text-white px-4 py-2">{o}</button>
        ))}
      </div>
    </div>
  );
}

// 4) Speed Match - match symbols quickly
const SYMBOLS = ['★', '◆', '●', '▲', '■'];
function SpeedMatch({ onScore }) {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [points, setPoints] = useState(0);
  const [round, setRound] = useState(1);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [running, setRunning] = useState(false);

  useEffect(() => { setBest(getScores()?.['speed-match']?.best || 0); }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTimeLeft((t) => {
      if (t <= 1) { clearInterval(id); setRunning(false); onScore(points); }
      return t - 1;
    }), 1000);
    return () => clearInterval(id);
  }, [running, points, onScore]);

  const next = () => {
    const s1 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const same = Math.random() < 0.5;
    const s2 = same ? s1 : SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    setLeft(s1); setRight(s2);
    setRound((r) => r + 1);
  };

  const start = () => { setPoints(0); setTimeLeft(20); setRunning(true); next(); };

  const answer = (isMatch) => {
    const correct = (left === right) === isMatch;
    if (correct) setPoints((p) => p + 1);
    next();
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3 text-sm">
        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Time: {timeLeft}s</span>
        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Score: {points}</span>
        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Best: {best}</span>
      </div>
      <div className="flex items-center justify-center gap-8 text-6xl font-black">
        <div>{left || '—'}</div>
        <div>{right || '—'}</div>
      </div>
      <div className="flex gap-3">
        <button onClick={() => answer(true)} className="flex-1 rounded-xl bg-amber-500 text-white py-2">Match</button>
        <button onClick={() => answer(false)} className="flex-1 rounded-xl bg-slate-700 text-white py-2">No Match</button>
      </div>
      <div>
        <button onClick={start} className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2">{running ? 'Restart' : 'Start'}</button>
      </div>
    </div>
  );
}
