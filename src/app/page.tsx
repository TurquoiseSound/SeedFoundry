'use client';

import { Suspense } from "react";
import Image from "next/image";
import Link from 'next/link';
import { motion } from 'framer-motion';
import GoalsSelect from '../components/GoalsSelect';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Plant and Grow Your
            <span className="text-gradient block">Ethical Tech Business</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto">
            Find the perfect structure for your prosocial technology project and maximize your impact without compromising your vision.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">What are your goals?</h2>
            <Suspense fallback={
              <div className="h-12 skeleton rounded-lg"></div>
            }>
              <GoalsSelect />
            </Suspense>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="/library/entity-types" className="card group">
            <h3 className="text-xl font-bold mb-3">Entity Types</h3>
            <p className="text-neutral-400 group-hover:text-neutral-300">
              Discover the perfect legal structure for your mission-driven venture.
            </p>
          </Link>

          <Link href="/library/funding-options" className="card group">
            <h3 className="text-xl font-bold mb-3">Funding Options</h3>
            <p className="text-neutral-400 group-hover:text-neutral-300">
              Explore ethical funding strategies aligned with your values.
            </p>
          </Link>

          <Link href="/library/business-models" className="card group">
            <h3 className="text-xl font-bold mb-3">Business Models</h3>
            <p className="text-neutral-400 group-hover:text-neutral-300">
              Find sustainable revenue models that support your mission.
            </p>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}