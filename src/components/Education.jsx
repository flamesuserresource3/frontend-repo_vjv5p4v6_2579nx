import { motion } from 'framer-motion';

const ITEMS = [
  {
    title: 'Memory Matrix',
    desc: 'Strengthens visual working memory by rehearsing spatial patterns under brief exposure.',
    color: 'from-sky-400 to-cyan-500',
  },
  {
    title: 'Word Flex',
    desc: 'Improves verbal fluency and lexical access speed through rapid unscrambling.',
    color: 'from-fuchsia-400 to-violet-500',
  },
  {
    title: 'Logic Rush',
    desc: 'Exercises inductive reasoning by identifying rules behind numeric sequences.',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Speed Match',
    desc: 'Trains sustained attention and response inhibition under time pressure.',
    color: 'from-amber-400 to-orange-500',
  },
];

export default function Education() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold">Science, Simplified</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          These games are inspired by research in cognitive psychology and neuroscience. Consistent,
          short sessions can lead to measurable improvements in targeted cognitive domains.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white dark:bg-slate-900 p-5"
          >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`} />
            <div className="relative">
              <div className="text-sm font-semibold">{item.title}</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
