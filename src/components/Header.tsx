// src/components/Header.tsx
"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-black bg-opacity-70 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-white text-3xl font-bold uppercase">
          PROCUT
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-white hover:text-gray-300 transition-colors duration-300 text-lg font-medium">
              {link.name}
            </Link>
          ))}
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 border border-white text-white text-lg font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Get Quote
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white text-3xl focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
      </nav>

      {/* Mobile Navigation */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.3 }}
        className="lg:hidden absolute top-0 right-0 w-2/3 h-screen bg-black flex flex-col items-center justify-center space-y-8 shadow-xl z-50"
      >
        <button className="absolute top-4 right-4 text-white text-3xl focus:outline-none" onClick={toggleMenu} aria-label="Close menu">
          ✕
        </button>
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} className="text-white text-2xl hover:text-gray-300 transition-colors duration-300" onClick={toggleMenu}>
            {link.name}
          </Link>
        ))}
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-white text-white text-xl font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300"
            onClick={toggleMenu}
          >
            Get Quote
          </motion.button>
        </Link>
      </motion.div>
    </motion.header>
  );
}
