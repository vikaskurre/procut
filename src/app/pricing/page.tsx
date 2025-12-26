"use client"; // Client component for Framer Motion

import { motion } from "framer-motion";

const pricingPlans = [
  {
    name: 'Short-Form Edits',
    price: '₹1,000 – ₹2,500 / video',
    description: '(High-retention, Apple-style motion & SFX)',
    features: [
      'Up to 60 seconds video',
      'Fast cuts with punchy pacing',
      'Clean captions & kinetic typography',
      'Modern SFX & smooth transitions',
      'Optimized for brands & influencers',
    ],
    buttonText: 'Get Quote for Short-Form',
  },
  {
    name: 'Corporate / Promo Videos',
    price: '₹2,500 – ₹6,500',
    description: '(Clean, minimal, brand-level edits)',
    features: [
      'SaaS / App / Website showcases',
      'Business promo & brand films',
      'Investor pitch visuals',
      'Clean CEO / talking-head edits',
      'Minimal, elegant, Apple-inspired edits',
    ],
    buttonText: 'Get Quote for Corporate',
  },
  {
    name: 'Product Commercials / Ads',
    price: '₹3,000 – ₹8,000',
    description: '(Motion, SFX, color grading)',
    features: [
      'Aesthetic product storytelling',
      'Studio-style composition',
      'Premium lighting & color grading',
      'Smooth motion & physics-based animations',
      'High-conversion ad spots',
    ],
    buttonText: 'Get Quote for Commercials',
  },
  {
    name: 'YouTube Full Edit',
    price: '₹1,200 – ₹3,500',
    description: '(Timeline, sound sync & cinematic grading)',
    features: [
      'Story-driven cinematic editing',
      'J-cut / L-cut transitions',
      'Music & beat-perfect sync',
      'Cinematic color grading',
      'Thumbnail guidance (optional)',
    ],
    buttonText: 'Get Quote for YouTube',
  },
];

export default function Pricing() {
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
        💰 PREMIUM PRICING
      </motion.h1>
      <motion.p
        className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Transparent & Value-Based. Custom monthly packages available for agencies & brands.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-7xl">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 rounded-lg p-8 shadow-lg flex flex-col hover:shadow-neon-purple transition-shadow duration-300 border border-gray-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-neon-blue mb-4">{plan.name}</h2>
            <p className="text-4xl font-extrabold text-white mb-4">{plan.price}</p>
            <p className="text-gray-400 mb-6 flex-grow text-lg">{plan.description}</p>
            <ul className="list-none space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-300 text-base">
                  <svg
                    className="w-5 h-5 text-green-400 mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="mt-auto w-full px-6 py-3 bg-neon-purple text-white text-lg font-semibold rounded-md hover:bg-neon-blue transition-all duration-300 shadow-md">
              {plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
