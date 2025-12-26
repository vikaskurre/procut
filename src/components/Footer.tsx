"use client";
// src/components/Footer.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="bg-gray-950 text-white py-12 px-4 md:px-8 border-t border-gray-800"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-0">
          <Link href="/" className="text-gray-100 text-3xl font-bold font-poppins mb-4 block uppercase">
            PROCUT
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium video editing services for high-end brands, startups, and corporate clients.
          </p>
          <div className="flex space-x-4 mt-6">
            {/* Social Media Links Placeholder */}
            <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
              {/* Replace with actual SVG icons */}
              <i className="fab fa-instagram text-2xl"></i> Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
              {/* Replace with actual SVG icons */}
              <i className="fab fa-linkedin text-2xl"></i> LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold text-neon-purple mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/services" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
                Services
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
                Client Reviews
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold text-neon-blue mb-4">Contact</h3>
          <ul className="space-y-3">
            <li className="text-gray-400">Email: vikaskurre80@gmail.com</li>
            <li className="text-gray-400">WhatsApp: +91 84353 24273</li>
            <li className="text-gray-400">Phone: +91 84353 24273</li>
            <li>
              <Link href="/contact" className="text-neon-purple hover:underline transition-colors duration-300">
                Send a Message
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Newsletter (Optional Placeholder) */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold text-neon-purple mb-4">Newsletter</h3>
          <p className="text-gray-400 text-sm mb-4">
            Stay updated with our latest projects and offers.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent flex-grow"
            />
            <button
              type="submit"
              className="bg-neon-blue text-white p-2 rounded-r-md hover:bg-neon-purple transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="text-center mt-12 text-gray-500 text-sm border-t border-gray-800 pt-8">
        © {currentYear} PROCUT. All rights reserved.
        <div className="mt-4">
          <Link href="/admin" className="text-gray-600 hover:text-gray-400 text-xs">
            Admin Panel
          </Link>
        </div>
      </motion.div>
    </motion.footer>
  );
}