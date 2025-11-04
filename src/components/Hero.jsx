import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 md:py-24">
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-tight"
          >
            NeuroPlay
            <span className="block mt-2 bg-gradient-to-r from-sky-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">Train Your Brain the Fun Way</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl"
          >
            Bite‑sized cognitive workouts designed with inspiration from neuroscience. Build memory,
            attention, logic, creativity, and processing speed through playful challenges.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex items-center gap-4"
          >
            <a
              href="#games"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white px-6 py-3 font-semibold shadow-lg shadow-sky-500/20 hover:shadow-fuchsia-500/30"
            >
              Start Playing Now
            </a>
            <a href="#learn" className="text-sky-500 hover:underline">How it works</a>
          </motion.div>
        </div>

        {/* 3D Brain - Spline scene */}
        <div className="relative h-[360px] md:h-[520px] lg:h-[600px] w-full">
          {/* Subtle gradient glow behind the scene (won't block pointer) */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.25),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(217,70,239,0.18),transparent_50%)]" />
          <Spline
            scene="https://prod.spline.design/pDXeCthqjmzYX5Zk/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}
