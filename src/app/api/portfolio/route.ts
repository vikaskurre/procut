
import { NextResponse } from 'next/server';

// Portfolio data - hardcoded for Netlify compatibility
const portfolioData = [
  {
    "id": 1,
    "title": "Luxury Real Estate Drone Footage",
    "description": "Professional aerial cinematography for high-end real estate showcasing. Capturing stunning landscapes and property features with cinematic angles.",
    "category": "Real Estate",
    "order": 1,
    "visible": true,
    "media": [
      {
        "type": "video",
        "url": "https://youtu.be/DKrIVfpWAqE?si=JTui1srQWV2ny400"
      }
    ],
    "thumbnailUrl": "",
    "createdAt": "2025-12-26T10:00:00.000Z",
    "updatedAt": "2025-12-26T10:00:00.000Z",
    "ownerId": ""
  },
  {
    "id": 2,
    "title": "Corporate Interview Reel",
    "description": "Professional interview production for corporate clients. High-quality lighting, sound, and editing for executive presentations.",
    "category": "Interviews",
    "order": 2,
    "visible": true,
    "media": [
      {
        "type": "video",
        "url": "https://youtu.be/GzHI1R4KIsk?si=vPA8-eKFIfw202Bm"
      }
    ],
    "thumbnailUrl": "",
    "createdAt": "2025-12-26T10:00:00.000Z",
    "updatedAt": "2025-12-26T10:00:00.000Z",
    "ownerId": ""
  },
  {
    "id": 3,
    "title": "Viral Social Media Reel",
    "description": "Engaging short-form content optimized for Instagram and TikTok. Fast-paced editing with trending music and effects.",
    "category": "Reels",
    "order": 3,
    "visible": true,
    "media": [
      {
        "type": "video",
        "url": "https://youtu.be/UmuvFYXHAFA?si=uDrIUBTB0_hAx4X-"
      }
    ],
    "thumbnailUrl": "",
    "createdAt": "2025-12-26T10:00:00.000Z",
    "updatedAt": "2025-12-26T10:00:00.000Z",
    "ownerId": ""
  },
  {
    "id": 4,
    "title": "Brand Commercial Campaign",
    "description": "Complete brand storytelling through visual narrative. From concept to final delivery with professional post-production.",
    "category": "Ads",
    "order": 4,
    "visible": true,
    "media": [
      {
        "type": "video",
        "url": "https://youtu.be/miBDRJuQ6Cs?si=mqcJHwOublgVU3qf"
      }
    ],
    "thumbnailUrl": "",
    "createdAt": "2025-12-26T10:00:00.000Z",
    "updatedAt": "2025-12-26T10:00:00.000Z",
    "ownerId": ""
  },
  {
    "id": 5,
    "title": "Cinematic Wedding Film",
    "description": "Emotional storytelling through cinematic wedding photography. Artistic composition and professional editing for memorable moments.",
    "category": "Cinematic",
    "order": 5,
    "visible": true,
    "media": [
      {
        "type": "video",
        "url": "https://youtu.be/4rpSmRU-Yi8?si=71Q_8W9UcdYoOg7q"
      }
    ],
    "thumbnailUrl": "",
    "createdAt": "2025-12-26T10:00:00.000Z",
    "updatedAt": "2025-12-26T10:00:00.000Z",
    "ownerId": ""
  }
];

export async function GET() {
  return NextResponse.json(portfolioData);
}

// POST method removed for Netlify compatibility
// Portfolio data is now read-only for the frontend
