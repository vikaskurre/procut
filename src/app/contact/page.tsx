"use client"; // This is a client component

import { useState } from 'react';
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    emailWhatsApp: '',
    projectDetails: '',
    referenceStyle: '',
    rawFootageLink: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({
          name: '',
          emailWhatsApp: '',
          projectDetails: '',
          referenceStyle: '',
          rawFootageLink: '',
        });
      } else {
        alert('There was an error submitting your request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  const faqItems = [
    {
      question: 'Do you work with international clients?',
      answer: 'Yes — I collaborate with creators and companies worldwide.',
    },
    {
      question: 'Which software do you use?',
      answer: 'Adobe Premiere Pro, After Effects & DaVinci Resolve.',
    },
    {
      question: 'Delivery timeline?',
      answer: '12–48 hours depending on project scope.',
    },
    {
      question: 'Do you offer monthly packages?',
      answer: 'Yes, tailored pricing based on volume.',
    },
    {
      question: 'Can you match a specific editing style?',
      answer: 'Absolutely — Apple, Tesla, modern minimal, or creator-specific styles.',
    },
  ];

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
        📩 HIRE ME / CONTACT
      </motion.h1>
      <motion.p
        className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Let&apos;s create something amazing together.
      </motion.p>

      <div className="flex flex-col lg:flex-row gap-16 w-full max-w-6xl mb-20">
        {/* Contact Form */}
        <motion.div
          className="flex-1 bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl font-semibold text-neon-purple mb-6">Request Premium Quote</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-white mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="emailWhatsApp" className="block text-lg font-medium text-white mb-2">
                Email / WhatsApp
              </label>
              <input
                type="text"
                id="emailWhatsApp"
                name="emailWhatsApp"
                value={formData.emailWhatsApp}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="projectDetails" className="block text-lg font-medium text-white mb-2">
                Project Details
              </label>
              <textarea
                id="projectDetails"
                name="projectDetails"
                rows={4}
                value={formData.projectDetails}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="referenceStyle" className="block text-lg font-medium text-white mb-2">
                Reference Style (optional)
              </label>
              <textarea
                id="referenceStyle"
                name="referenceStyle"
                rows={2}
                value={formData.referenceStyle}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label htmlFor="rawFootageLink" className="block text-lg font-medium text-white mb-2">
                Raw Footage Link (optional)
              </label>
              <input
                type="url"
                id="rawFootageLink"
                name="rawFootageLink"
                value={formData.rawFootageLink}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-neon-blue focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-neon-purple text-white text-lg font-semibold rounded-md hover:bg-neon-blue transition-all duration-300 shadow-md"
            >
              Request Premium Quote
            </button>
          </form>
        </motion.div>

        {/* Contact Details - Removed as per new brief, but keeping the structure for potential future use */}
        <motion.div
          className="flex-1 bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl font-semibold text-neon-blue mb-6">Direct Contact</h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-300">
              <strong className="text-white">WhatsApp:</strong> <a href="https://wa.me/918435324273" className="text-neon-blue hover:underline">+91 84353 24273</a>
            </p>
            <p className="text-lg text-gray-300">
              <strong className="text-white">Email:</strong> <a href="mailto:vikaskurre80@gmail.com" className="text-neon-blue hover:underline">vikaskurre80@gmail.com</a>
            </p>
            <p className="text-lg text-gray-400 mt-6">
              You can also reach out directly via WhatsApp or Email.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Premium FAQ Section */}
      <motion.section
        className="w-full max-w-6xl py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
          ❓ PREMIUM FAQ
        </h2>
        <div className="space-y-8">
          {faqItems.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-neon-blue mb-2">{faq.question}</h3>
              <p className="text-lg text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
