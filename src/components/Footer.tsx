"use client";
// src/components/Footer.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <Link href="/" className="text-3xl font-bold uppercase mb-6 block">
          PROCUT
        </Link>
        <p className="text-gray-400 mb-6">
          Premium video editing for global creators and brands.
        </p>
        <div className="flex justify-center space-x-8 mb-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            Instagram
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            LinkedIn
          </a>
        </div>
        <div className="text-gray-400 mb-4">
          vikaskurre80@gmail.com
        </div>
        <div className="text-gray-400 mb-8">
          +91 84353 24273
        </div>
        <div className="text-gray-500 text-sm">
          © {currentYear} PROCUT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}