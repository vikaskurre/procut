"use client"; // This is a client component

import { motion } from "framer-motion";
import Link from "next/link"; // Import Link for navigation

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const floatVariants = {
    animate: {
      y: ["0%", "5%", "-5%", "0%"],
      x: ["0%", "3%", "-3%", "0%"],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: Math.random() * 5 + 5, // Random duration between 5 and 10 seconds
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start bg-black text-white overflow-hidden">
      {/* Gradient Background (Video Placeholder) */}
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>

      {/* Overlay for readability and dark theme */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

      {/* Floating Elements (Animated with Framer Motion) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-20 h-20 bg-neon-blue opacity-30 rounded-full mix-blend-screen"
        variants={floatVariants}
        animate="animate"
      ></motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-neon-purple opacity-30 rounded-full mix-blend-screen"
        variants={floatVariants}
        animate="animate"
      ></motion.div>
      <motion.div
        className="absolute top-1/3 right-1/3 w-16 h-16 bg-white opacity-20 rounded-full mix-blend-screen"
        variants={floatVariants}
        animate="animate"
      ></motion.div>
      {/* Further floating elements would be added here */}

      {/* Hero Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center p-4 min-h-screen w-full max-w-7xl px-4 md:px-8 pt-24" // Added pt-24 to ensure content starts below any potential header
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="text-xl md:text-2xl text-neon-blue font-semibold mb-4" variants={itemVariants}>
          ⭐ ULTRA-PREMIUM VIDEO EDITOR SERVICES
        </motion.p>
        <motion.h1
          className="text-4xl md:text-7xl font-bold text-white leading-tight mb-4"
          variants={itemVariants}
        >
          <span className="block">Elevating Your Brand Through</span>
          <motion.span className="block text-neon-purple" variants={itemVariants}>
            Premium Cinematic Editing
          </motion.span>
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed"
          variants={itemVariants}
        >
          I create high-performance, visually refined videos for creators, startups, and global brands — focused on clean aesthetics, smooth motion, and modern sound design inspired by Apple-style visuals.
        </motion.p>
        <motion.div className="mt-10 flex gap-4" variants={itemVariants}>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-neon-purple text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 border border-transparent hover:border-neon-blue"
            >
              Get a Custom Quote
            </motion.button>
          </Link>
          <Link href="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 border border-white hover:border-neon-blue"
            >
              View Premium Portfolio
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Why Premium Clients Work With Me Section */}
      <motion.section
        className="relative z-20 w-full max-w-7xl px-4 md:px-8 py-20 bg-gray-950/70 backdrop-blur-sm rounded-lg my-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-neon-blue mb-12">
          🚀 WHY PREMIUM CLIENTS WORK WITH ME
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            'Apple-inspired clean aesthetic',
            'Fast delivery without compromising quality',
            'Clear & consistent communication',
            'International editing standards',
            '100+ premium SFX & transition library',
            'Pixel-perfect timing & sound sync',
            'Final delivery in Full HD / 4K',
          ].map((reason, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 hover:border-neon-purple transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-xl text-gray-200 font-medium">{reason}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* My Premium Work Process Section */}
      <motion.section
        className="relative z-20 w-full max-w-7xl px-4 md:px-8 py-20 bg-gray-950/70 backdrop-blur-sm rounded-lg mb-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-neon-purple mb-12">
          🧠 MY PREMIUM WORK PROCESS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {[
            { step: '1. Discovery Call / Chat', desc: 'Understanding your brand tone, audience & objective.' },
            { step: '2. Creative Direction', desc: 'References, moodboard & music style alignment.' },
            { step: '3. First Cut Delivery', desc: 'Cinematic pacing with premium transitions.' },
            { step: '4. Revisions (2–3 rounds)', desc: 'Precision refinements to perfection.' },
            { step: '5. Final Master Export', desc: 'Optimized HD / 4K delivery — ready to publish.' },
          ].map((processStep, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 flex flex-col items-center text-center hover:border-neon-blue transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-2xl font-bold text-white mb-2">{processStep.step}</p>
              <p className="text-md text-gray-300">{processStep.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>


    </main>
  );
}