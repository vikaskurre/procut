// src/components/WhatsAppButton.tsx
"use client"; // This is a client component

import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '918435324273'; // Replace with your WhatsApp number
  const message = 'Hello! I am interested in your video editing services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50 flex items-center justify-center"
      aria-label="Chat with us on WhatsApp"
    >
      {/* Basic WhatsApp Icon (SVG for better styling) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.235 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.923 3.576 1.442 5.557 1.442 5.062 0 9.172-4.11 9.173-9.171s-4.11-9.171-9.173-9.171-9.171 4.11-9.171 9.171c0 1.765.507 3.452 1.462 4.935l-.949 3.483 3.482-.949zm8.138-5.349c-.074-.124-.272-.198-.57-.34-.297-.142-1.867-.915-2.164-1.028-.297-.113-.514-.113-.73-.113-.216 0-.57.073-.883.437-.313.364-1.213 1.029-1.485 1.383-.271.354-.543.398-1.007.113-.464-.285-1.933-.713-3.68-.225-1.45.379-2.313 1.537-2.586 1.934-.272.396-.026.609.244.857.269.249.57.34 1.117 1.164.547.825 1.094 1.477 1.676 1.773.58.297 1.164.473 1.773.437.61-.035 1.867-.768 2.164-1.593.297-.824.297-1.499.204-1.675zm-3.083 1.51c.001.001.001.001.001.001z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
