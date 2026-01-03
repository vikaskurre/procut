"use client"; // Client component for Framer Motion

import { motion } from "framer-motion";
import Link from "next/link";

export default function Pricing() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-4 bg-black text-white">
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        💰 Pricing That Fits Your Project
      </motion.h1>
      <motion.p
        className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Premium work needs a tailored approach. Let&apos;s talk about your vision and build something impactful together.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link href="/contact">
          <button className="px-8 py-4 bg-neon-purple text-white text-lg font-semibold rounded-md hover:bg-neon-blue transition-all duration-300 shadow-md">
            👉 Book a Call
          </button>
        </Link>
      </motion.div>

      <motion.p
        className="mt-16 text-lg text-gray-400 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        Have a project in mind? Let&apos;s create something powerful.
      </motion.p>
    </main>
  );
}
