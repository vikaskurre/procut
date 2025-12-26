// Trigger rebuild
// src/app/portfolio/page.tsx
import fs from 'fs/promises';
import path from 'path';
import React from 'react';

// Updated interface to match the new structure in db.json
interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: 'Reels' | 'Real Estate' | 'Interviews' | 'Ads' | 'Cinematic';
  order: number;
  visible: boolean;
  media: {
    type: 'video' | 'image';
    url: string;
  }[];
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

// This component will handle rendering the correct video player
// It doesn't use any client-side hooks, so it can be part of a Server Component file.
const VideoPlayer = ({ src, poster }: { src: string; poster: string }) => {
  let embedUrl = '';
  let isSupportedEmbed = false;

  try {
    if (src) {
      const url = new URL(src);
      if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
        const videoId = url.hostname.includes('youtu.be')
          ? url.pathname.substring(1)
          : url.searchParams.get('v');
        if (videoId) {
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
          isSupportedEmbed = true;
        }
      } else if (url.hostname.includes('vimeo.com')) {
        const videoId = url.pathname.split('/').pop();
        if (videoId) {
          embedUrl = `https://player.vimeo.com/video/${videoId}`;
          isSupportedEmbed = true;
        }
      }
    }
  } catch (error) {
    console.error("Invalid video URL provided:", src, error);
  }

  if (embedUrl && isSupportedEmbed) {
    return (
      <div className="aspect-video w-full overflow-hidden">
        <iframe
          className="w-full h-full"
          src={embedUrl}
          title="Video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  } 
  
  // Fallback for direct video links or unsupported URLs
  const isDirectVideoFile = src && /\.(mp4|webm|ogg|mov|avi|flv)$/i.test(src);
  if (isDirectVideoFile) {
    return (
      <video
        className="w-full h-auto object-cover"
        src={src}
        controls
        preload="none"
        poster={poster || '/placeholder-thumbnail.jpg'} // Use a default placeholder if none
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  // Final fallback for empty or invalid URLs
  return (
    <div className="aspect-video w-full bg-gray-900 flex flex-col items-center justify-center text-gray-500 p-4 text-center">
      <p className="font-semibold">Video Not Available</p>
      <p className="text-sm mt-1">The video link is either missing or unsupported.</p>
    </div>
  );
};

const PortfolioPage = async () => {
  // Fetch data directly from db.json on the server
  const filePath = path.join(process.cwd(), 'db.json');
  let portfolioItems: PortfolioItem[] = [];
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    // Filter for items that should be public/visible and sort by order
    portfolioItems = (data.portfolio || [])
      .filter((item: any) => item.visible === true)
      .sort((a: any, b: any) => a.order - b.order);
  } catch (error) {
    console.error("Failed to read or parse db.json:", error);
    // You could return an error message here if you want
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Our Work
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400 font-light">
            Check out some of the projects we're proud to have worked on.
          </p>
        </div>
        
        {portfolioItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {portfolioItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-gray-900 border border-gray-800 overflow-hidden transition-all duration-300 ease-in-out hover:border-gray-600 group"
              >
                <div className="relative">
                  <VideoPlayer src={item.media[0]?.url || ''} poster={item.thumbnailUrl} />
                  <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-2 truncate uppercase tracking-tight">{item.title}</h2>
                  <p className="text-gray-400 leading-relaxed line-clamp-3 font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-white uppercase tracking-tight">No Projects to Display</h2>
            <p className="mt-2 text-gray-500">
              We're currently updating our portfolio. Please check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;