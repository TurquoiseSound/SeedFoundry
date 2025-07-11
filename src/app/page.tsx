'use client';

import { Suspense } from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';

import GoalsSelect from '../components/GoalsSelect';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 pb-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Startup Ethical
            <span className="text-gradient block mt-2">Economic Design</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Design your organization&#39;s architecture to maximize impact while preserving your
            core mission and values.
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass p-8 rounded-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Define Your Strategic Objectives
            </h2>
            <Suspense fallback={<div className="h-14 skeleton rounded-lg"></div>}>
              <GoalsSelect />
            </Suspense>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/library/entity-types" className="card group">
            <h3 className="text-2xl font-bold mb-4">Legal Entity</h3>
            <p className="text-emerald-200 group-hover:text-emerald-100 transition-colors duration-300">
              Design the optimal legal framework to support your mission and growth trajectory.
            </p>
          </Link>

          <Link href="/library/funding-options" className="card group">
            <h3 className="text-2xl font-bold mb-4">Capital Strategy</h3>
            <p className="text-emerald-200 group-hover:text-emerald-100 transition-colors duration-300">
              Explore aligned funding pathways that preserve your autonomy and values.
            </p>
          </Link>

          <Link href="/library/business-models" className="card group">
            <h3 className="text-2xl font-bold mb-4">Revenue Design</h3>
            <p className="text-emerald-200 group-hover:text-emerald-100 transition-colors duration-300">
              Develop sustainable business models that generate both profit and impact.
            </p>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
