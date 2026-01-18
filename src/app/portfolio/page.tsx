'use client';

import { useState } from 'react';

type PortfolioCategory = 'All' | 'Shorts / Reels' | 'YouTube Long-form' | 'Ads / Brand Content' | 'Cinematic / Storytelling';

type VideoType = 'short' | 'long';

interface PortfolioItem {
  id: number;
  title: string;
  platform: string;
  goal: string;
  style: string;
  result?: string;
  category: PortfolioCategory;
  media: string;
  videoType: VideoType;
  badgeColor: string;
  badgeText: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "Instagram Reel — Fitness Coach (USA)",
    platform: "Instagram",
    goal: "Engagement & Retention",
    style: "Fast cuts, beat sync, dynamic captions",
    result: "2.1M views in 7 days",
    category: "Shorts / Reels",
    media: "/showreel.mp4",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 2,
    title: "YouTube Long-form — Podcast Edit",
    platform: "YouTube",
    goal: "Watch time",
    style: "Clean cuts, pacing, sound design",
    category: "YouTube Long-form",
    media: "/147290-791334083.mp4",
    videoType: "long",
    badgeColor: "bg-blue-500",
    badgeText: "LONG"
  },
  {
    id: 3,
    title: "Brand Ad — DTC Product",
    platform: "Meta Ads",
    goal: "CTR & Conversions",
    style: "Hook-first storytelling, product focus",
    category: "Ads / Brand Content",
    media: "/showreel.mp4",
    videoType: "long",
    badgeColor: "bg-purple-500",
    badgeText: "AD"
  },
  {
    id: 4,
    title: "Cinematic Short Film — Brand Storytelling",
    platform: "YouTube",
    goal: "Brand Awareness",
    style: "Cinematic angles, emotional pacing",
    category: "Cinematic / Storytelling",
    media: "/147290-791334083.mp4",
    videoType: "long",
    badgeColor: "bg-blue-500",
    badgeText: "CINEMATIC"
  },
  {
    id: 5,
    title: "New Portfolio Video",
    platform: "Various",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "/new-portfolio-video.mp4",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 6,
    title: "Latest Portfolio Video",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1Dm3NCWnf-F8o0NlYe4137NLoXCAvY19b/view?usp=drive_link",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 7,
    title: "Another Portfolio Video",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1XWXvUHoG1nVMC50gh6_1QpF5hzKEs_p9/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 8,
    title: "Additional Portfolio Video",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/12vWktnBuIK-GtL7e4Zppz6nDuLiTd5-9/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 9,
    title: "More Portfolio Video",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/16iQg_rutCbCqhV4uxMPimYpP8ahDjzsy/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 10,
    title: "Portfolio Video 10",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1mko5m8tNf5W8fJW4EibQtDfIvCOsaH6S/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 11,
    title: "Portfolio Video 11",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1ccTfY1W4We06GhohWayEn4bhknBumUIV/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 12,
    title: "Portfolio Video 12",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1NDXhwa4EEVAnGI6eNnWxM-WgS12HvFHR/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 13,
    title: "Portfolio Video 13",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1OE0wAhyMXa3Ol8c1fXYLgYozO82NMB7z/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 14,
    title: "Portfolio Video 14",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1B5_jthdHfauEAIoO6-3b9Y_oIUSbNI7y/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 15,
    title: "Portfolio Video 15",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/11mhBerEVABGcNqio0rC8owhwlPnHYPEg/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 16,
    title: "Portfolio Video 16",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1A6GlxNDPwGu9-810Z9-QClWaRPsl_yUp/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 17,
    title: "Portfolio Video 17",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1V-o7ylVusJTIHaHismutASXERW90mFAd/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 18,
    title: "Portfolio Video 18",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1QpqN8s20jmy4E93XvnJUobKLYRvFYR7v/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 19,
    title: "Portfolio Video 19",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/10nXuSNP1Mzq8GA5Q85A_9qOow2wtkE6a/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 20,
    title: "Portfolio Video 20",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1aRYY5t_ApkQXXuJXjqaqkHrj-EDiCQGS/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 21,
    title: "Portfolio Video 21",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1Rl7e2b8VYXauURWvSk8dqjMWE0Bn0lq-/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 22,
    title: "Portfolio Video 22",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1W-Ig7Qhvkz2FZ6ksmRq_i3UHvfkNn6zy/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  },
  {
    id: 23,
    title: "Portfolio Video 23",
    platform: "Google Drive",
    goal: "Showcase Work",
    style: "Professional Editing",
    category: "Shorts / Reels",
    media: "https://drive.google.com/file/d/1oZqpTeN39Z_jUKyjR6ZlRGV_ruZIjoC4/view?usp=sharing",
    videoType: "short",
    badgeColor: "bg-orange-500",
    badgeText: "SHORT"
  }
];

const beforeAfterData = [
  {
    raw: "/showreel.mp4",
    edited: "/147290-791334083.mp4"
  }
];

const caseStudies = [
  {
    client: "Creator Growth Sprint",
    problem: "Low retention on shorts",
    solution: "Hook rewrite, beat mapping, caption system",
    result: "+68% retention, consistent virality"
  },
  {
    client: "Brand Performance Boost",
    problem: "Low ad CTR",
    solution: "Thumb-stop hooks, tighter cuts",
    result: "1.9× CTR in 14 days"
  }
];

const socialProof = [
  '"PROCUT understands content psychology, not just editing."',
  '"Fast delivery with premium quality."'
];

const HeroSection = () => (
  <section className="hero relative bg-black text-white min-h-screen flex items-center px-4 py-16">
    <div className="max-w-7xl mx-auto w-full">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-8 md:items-center">
        {/* Left 55% */}
        <div className="md:col-span-7">
          <h1 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
            Real Results. Premium Edits. Proven Performance.
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-gray-300 font-light leading-relaxed">
            High-converting short-form & cinematic edits for creators and brands.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-8 py-4 font-semibold text-lg hover:bg-gray-200 transition-colors">
              Get a Sample Edit
            </button>
            <button className="border-2 border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-black transition-colors">
              View Case Studies
            </button>
          </div>
        </div>
        {/* Right 45% */}
        <div className="md:col-span-5">
          <video
            src="/showreel.mp4"
            autoPlay
            muted
            loop
            className="w-full rounded-lg shadow-2xl"
          ></video>
          <p className="text-sm text-gray-400 mt-4 text-center">(30–45 sec): Best 5–7 clips • Auto-play (muted) • Beat-sync highlights</p>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden text-center">
        <h1 className="text-4xl font-black mb-6 tracking-tight leading-tight">
          Real Results. Premium Edits. Proven Performance.
        </h1>
        <p className="text-xl mb-8 text-gray-300 font-light leading-relaxed">
          High-converting short-form & cinematic edits for creators and brands.
        </p>
        <div className="flex flex-col gap-4 mb-12">
          <button className="bg-white text-black px-8 py-4 font-semibold text-lg hover:bg-gray-200 transition-colors">
            Get a Sample Edit
          </button>
          <button className="border-2 border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-black transition-colors">
            View Case Studies
          </button>
        </div>
        <video
          src="/showreel.mp4"
          autoPlay
          muted
          loop
          className="w-full rounded-lg shadow-2xl"
        ></video>
        <p className="text-sm text-gray-400 mt-4">(30–45 sec): Best 5–7 clips • Auto-play (muted) • Beat-sync highlights</p>
      </div>
    </div>
  </section>
);

const PortfolioFilters = ({ activeFilter, setActiveFilter }: { activeFilter: PortfolioCategory; setActiveFilter: (filter: PortfolioCategory) => void }) => {
  const filters: PortfolioCategory[] = ['All', 'Shorts / Reels', 'YouTube Long-form', 'Ads / Brand Content', 'Cinematic / Storytelling'];

  return (
    <section className="bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 font-semibold transition-colors ${
                activeFilter === filter ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const PortfolioGrid = ({ activeFilter }: { activeFilter: PortfolioCategory }) => {
  const filteredItems = activeFilter === 'All' ? portfolioData : portfolioData.filter(item => item.category === activeFilter);

  // Determine grid layout based on filter
  const getGridClasses = () => {
    if (activeFilter === 'Shorts / Reels') {
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'; // 3 columns for shorts
    } else if (activeFilter === 'YouTube Long-form' || activeFilter === 'Ads / Brand Content' || activeFilter === 'Cinematic / Storytelling') {
      return 'grid-cols-1 lg:grid-cols-2'; // 2 columns for long-form
    } else {
      return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'; // Mixed layout for All
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className={`grid ${getGridClasses()} gap-8 ${activeFilter === 'All' ? 'all-view' : activeFilter === 'Shorts / Reels' ? 'short-view' : 'long-view'}`}>
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 video-card">
              {/* Badge - Hide for All tab */}
              {activeFilter !== 'All' && (
                <div className={`inline-block px-3 py-1 text-xs font-semibold text-white uppercase tracking-wider rounded-md mb-4 ${
                  item.badgeText === 'SHORT' ? 'bg-orange-500' :
                  item.badgeText === 'LONG' ? 'bg-blue-600' :
                  item.badgeText === 'AD' ? 'bg-purple-600' : 'bg-blue-600'
                }`}>
                  {item.badgeText}
                </div>
              )}

              {/* Title - Pure Dark */}
              <h3 className="text-xl font-semibold mb-4 text-gray-900 leading-tight hover:text-black transition-colors">{item.title}</h3>

              {/* Meta Info */}
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Platform:</span>
                  <span className="text-gray-700 font-medium">{item.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Goal:</span>
                  <span className="text-gray-700 font-medium">{item.goal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Style:</span>
                  <span className="text-gray-700 font-medium">{item.style}</span>
                </div>
                {item.result && (
                  <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
                    <span className="text-gray-500 font-medium">Result:</span>
                    <span className="text-green-600 font-semibold">{item.result}</span>
                  </div>
                )}
              </div>

              {/* Video with proper aspect ratio */}
              <div className={`video-wrapper relative overflow-hidden rounded-lg bg-black shadow-lg ${
                activeFilter === 'All' ? 'aspect-[16/9]' :
                item.videoType === 'short' ? 'aspect-[9/16]' : 'aspect-[16/9]'
              }`}>
                {item.media.includes('drive.google.com') ? (
                  <iframe
                    src={item.media.replace('/view?', '/preview?')}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    src={item.media}
                    controls
                    className="absolute inset-0 w-full h-full object-cover"
                  ></video>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BeforeAfterSection = () => (
  <section className="before-after-section">
    <h2 className="before-after-title">Editing That Changes Everything</h2>
    <p className="before-after-subtitle">
      Raw Clip → Final PROCUT Edit<br />
      Focus: pacing, sound sync, captions, color
    </p>
    <div className="before-after-grid">
      <div className="before-after-card">
        <div className="before-label">Raw Clip</div>
        <div className="before-after-video">
          <video src={beforeAfterData[0].raw} controls className="raw-video" />
        </div>
      </div>
      <div className="before-after-card">
        <div className="after-label">Final PROCUT Edit</div>
        <div className="before-after-video">
          <video src={beforeAfterData[0].edited} controls className="edited-video" />
        </div>
      </div>
    </div>
  </section>
);

const CaseStudiesSection = () => (
  <section className="bg-black text-white py-16">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">Case Studies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies.map((study, index) => (
          <div key={index} className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">{study.client}</h3>
            <p className="mb-2"><strong>Problem:</strong> {study.problem}</p>
            <p className="mb-2"><strong>PROCUT Did:</strong> {study.solution}</p>
            <p className="text-green-400 font-semibold"><strong>Result:</strong> {study.result}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SocialProofSection = () => (
  <section className="bg-white py-16">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-black mb-8 text-black">Social Proof</h2>
      <div className="space-y-4">
        {socialProof.map((quote, index) => (
          <p key={index} className="text-lg italic text-gray-700">{quote}</p>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTASection = () => (
  <section className="bg-black text-white py-16">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-black mb-8">
        Want Your Content to Look This Premium?
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <button className="bg-white text-black px-8 py-4 font-semibold text-lg hover:bg-gray-200 transition-colors">
          Get a Free Sample
        </button>
        <button className="border-2 border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-black transition-colors">
          Book a Call
        </button>
        <button className="border-2 border-white text-white px-8 py-4 font-semibold text-lg hover:bg-white hover:text-black transition-colors">
          DM on Instagram
        </button>
      </div>
    </div>
  </section>
);

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('All');

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <PortfolioFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <PortfolioGrid activeFilter={activeFilter} />
      <BeforeAfterSection />
      <CaseStudiesSection />
      <SocialProofSection />
      <FinalCTASection />
    </div>
  );
}

