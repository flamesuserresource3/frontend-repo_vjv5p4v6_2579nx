# NeuroPlay – Train Your Brain the Fun Way

NeuroPlay is an interactive, mobile‑friendly website offering bite‑sized cognitive games built with React, Tailwind CSS, Framer Motion, and a 3D Spline scene. It focuses on improving memory, attention, logic, and processing speed in a playful way.

## Tech Stack
- Vite + React
- Tailwind CSS
- Framer Motion (animations)
- Spline (3D brain in hero section)

## Getting Started

1. Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

2. Open the app in your browser:
- Local: http://localhost:3000

## Project Highlights
- Futuristic hero section featuring an interactive 3D brain from Spline
- Dark/Light mode with persistent preference
- Games Library with four mini‑games:
  - Memory Matrix (visual working memory)
  - Word Flex (verbal fluency)
  - Logic Rush (reasoning)
  - Speed Match (attention & reflexes)
- Leaderboard & Progress visualization (client‑side, persisted in localStorage)
- Educational section explaining how each game maps to cognitive functions

## Notes
- Scores are stored locally in your browser (localStorage). You can integrate a backend later for global leaderboards.
- The Spline scene is loaded from: https://prod.spline.design/pDXeCthqjmzYX5Zk/scene.splinecode
- Tailwind classes and gradients are used throughout for a clean, modern, responsive design.

## Development
- Main entry is `src/main.jsx`. The primary UI is assembled in `src/App.jsx`.
- Components live under `src/components/` and are designed to be small and focused.

## Accessibility & Performance
- Keyboard support for modal dismissal (ESC)
- Semantic headings and high‑contrast color palette in dark mode
- Lightweight, client‑only games built in pure React/JS

Enjoy training your brain with NeuroPlay!
