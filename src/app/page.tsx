"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <main className="bg-black text-white font-light">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/showreel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight"
            variants={itemVariants}
          >
            Cinematic Video Editing for Modern Brands
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            High-end video editing crafted for creators, startups, and companies worldwide.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={itemVariants}
          >
            <Link href="/portfolio">
              <button className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors duration-300">
                View Work
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-all duration-300">
                Get a Quote
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Snapshot */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-medium text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            🌍 Working with International Clients
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: "🎬", title: "300+ Projects Delivered", desc: "" },
              { icon: "⚡", title: "Fast & Reliable Turnaround", desc: "" },
              { icon: "⭐", title: "Consistent 5-Star Feedback", desc: "" },
              { icon: "🌎", title: "", desc: "Trusted by creators and businesses worldwide." },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                {item.desc && <p className="text-gray-400">{item.desc}</p>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Clients Choose PROCUT */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Why Clients Choose PROCUT
          </motion.h2>
          <motion.ul
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              "Apple-inspired clean aesthetic",
              "International editing standards",
              "Pixel-perfect timing & sound sync",
              "Premium SFX & smooth transitions",
              "Fast delivery without quality loss",
              "Clear, professional communication",
            ].map((reason, index) => (
              <motion.li
                key={index}
                className="text-lg text-gray-300"
                variants={itemVariants}
              >
                {reason}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
            <p className="text-lg text-gray-400">Focused. High-end. Purpose-driven.</p>
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              "Cinematic Video Editing",
              "Short-Form Content (Reels / Ads)",
              "YouTube Long-Form Editing",
              "Brand & Corporate Videos",
              "Creator Content Editing",
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Link href="/services" className="text-xl text-white hover:text-gray-300 transition-colors duration-300 hover:underline">
                  {service}
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-center mt-12"
            variants={itemVariants}
          >
            <Link href="/pricing">
              <button className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-all duration-300">
                View Pricing
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Selected Work
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 text-center mb-12"
            variants={itemVariants}
          >
            A selection of projects crafted for global clients.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            {["All", "Reels", "YouTube", "Ads", "Brand Films"].map((filter) => (
              <button key={filter} className="px-4 py-2 border border-gray-600 text-gray-400 hover:border-white hover:text-white transition-all duration-300 rounded">
                {filter}
              </button>
            ))}
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {["Reel Editing", "YouTube", "Ads", "Brand Films", "Cinematic", "Short Form"].map((category, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={itemVariants}
              >
                <div className="bg-gray-800 h-48 rounded-lg flex items-center justify-center overflow-hidden">
                  <span className="text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    {category}
                  </span>
                  <span className="text-6xl opacity-20">🎥</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-center mt-12"
            variants={itemVariants}
          >
            <Link href="/portfolio">
              <button className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-all duration-300">
                View Full Portfolio
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Work Process */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Work Process
          </motion.h2>
          <motion.p
            className="text-lg text-gray-400 text-center mb-12"
            variants={itemVariants}
          >
            A Simple, Proven Workflow
          </motion.p>
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-700"></div>
            {[
              { step: "Discovery Call / Brief", desc: "Understanding your brand, audience, and goals." },
              { step: "Creative Direction", desc: "Style, references, pacing, and music alignment." },
              { step: "First Cut Delivery", desc: "Clean, cinematic edit with strong storytelling." },
              { step: "Revisions", desc: "2–3 focused refinement rounds." },
              { step: "Final Delivery", desc: "Optimized Full HD / 4K export, ready to publish." },
            ].map((processStep, index) => (
              <motion.div
                key={index}
                className="flex items-start mb-12"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mr-6 relative z-10">
                  <span className="text-white text-lg font-bold opacity-60">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{processStep.step}</h3>
                  <p className="text-gray-400">{processStep.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.blockquote
              className="text-2xl md:text-3xl text-gray-300 italic mb-8"
              variants={itemVariants}
            >
              "PROCUT delivers clean, cinematic edits with great attention to detail. Communication is smooth and delivery is always on point."
            </motion.blockquote>
            <motion.p
              className="text-gray-400"
              variants={itemVariants}
            >
              — International Client
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12"
              variants={itemVariants}
            >
              Let’s Elevate Your Content
            </motion.h2>
            <motion.div
              variants={itemVariants}
            >
              <Link href="/contact">
                <button className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors duration-300">
                  Get a Quote
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}