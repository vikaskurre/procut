"use client"; // Client component for Framer Motion

import { motion } from "framer-motion";

const specializationAreas = [
  {
    title: '🔹 Short-Form Content (High Retention)',
    description: [
      'High-conversion Reels & Shorts',
      'Fast cuts with punchy pacing',
      'Clean captions & kinetic typography',
      'Modern SFX & smooth transitions',
      'Optimized for brands, founders & influencers',
    ],
  },
  {
    title: '🔹 Corporate & Brand Films (Luxury Standard)',
    description: [
      'Minimal, elegant, Apple-inspired edits',
      'SaaS / App / Website showcase videos',
      'Business promo & brand films',
      'Investor pitch & presentation visuals',
      'Clean CEO / talking-head edits',
      'Ideal for startups, SaaS companies, agencies & global brands',
    ],
  },
  {
    title: '🔹 Product Commercials',
    description: [
      'Aesthetic product storytelling',
      'Studio-style composition',
      'Premium lighting & color grading',
      'Smooth motion & physics-based animations',
    ],
  },
  {
    title: '🔹 YouTube Premium Editing',
    description: [
      'Story-driven cinematic editing',
      'J-cut / L-cut transitions',
      'Music & beat-perfect sync',
      'Cinematic color grading',
      'Thumbnail guidance (optional)',
    ],
  },
  {
    title: '🔹 Motion & Visual Design',
    description: [
      'Minimal UI animations',
      'Apple-style smooth swipes',
      'Kinetic typography',
      'Logo intro / outro',
      'Precision-timed SFX sync',
    ],
  },
  {
    title: '🔹 Sound Engineering',
    description: [
      'Clean airy clicks & swipes',
      'Subtle pop transitions',
      'Voice EQ & noise reduction',
      'Atmosphere & depth enhancement',
    ],
  },
];

export default function Services() {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-4 bg-black text-white">
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        💎 WHAT I SPECIALIZE IN
      </motion.h1>
      <motion.p
        className="mt-4 text-xl md:text-2xl text-gray-300 max-w-4xl text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        For High-End Brands, Startups & Corporate Clients
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl w-full">
        {specializationAreas.map((area, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 rounded-lg p-8 shadow-lg flex flex-col hover:shadow-neon-purple transition-shadow duration-300 border border-gray-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-neon-blue mb-4">{area.title}</h2>
            <ul className="list-none space-y-2 text-gray-300 text-lg flex-grow">
              {area.description.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-neon-purple mr-2 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
