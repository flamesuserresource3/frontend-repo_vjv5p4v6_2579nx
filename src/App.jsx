import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import GamesGrid from './components/GamesGrid';
import Leaderboard from './components/Leaderboard';
import Education from './components/Education';

// Simple theme persistence (light/dark)
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
}

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-[#0b0f17] dark:text-slate-100 transition-colors">
      {/* Top navigation with theme toggle */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/30 border-b border-white/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight text-xl md:text-2xl">
            <span className="bg-gradient-to-r from-sky-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">Neuro</span>Play
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#games" className="hover:text-sky-400">Games</a>
            <a href="#leaderboard" className="hover:text-sky-400">Progress</a>
            <a href="#learn" className="hover:text-sky-400">Why it works</a>
          </nav>
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-xs md:text-sm hover:bg-white/10"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300 dark:bg-sky-300 shadow shadow-yellow-200 dark:shadow-sky-600" />
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </header>

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="games" className="py-16 md:py-24">
          <GamesGrid />
        </section>

        <section id="leaderboard" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
          <Leaderboard />
        </section>

        <section id="learn" className="py-16 md:py-24">
          <Education />
        </section>
      </main>

      <footer className="py-10 text-center text-xs text-slate-500">
        “Your brain is like a muscle — the more you exercise it, the stronger it gets.”
      </footer>
    </div>
  );
}
