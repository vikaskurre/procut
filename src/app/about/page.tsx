export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-4 bg-black text-white">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">About Procut Web</h1>
      <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl text-center mb-16">
        We are a passionate team of video editing professionals dedicated to transforming raw footage into captivating visual stories.
      </p>

      <section className="w-full max-w-6xl mb-20">
        <h2 className="text-4xl font-semibold text-neon-blue mb-6 border-b-2 border-neon-purple pb-4">
          Our Mission
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          At Procut Web, our mission is to empower brands and individuals with high-quality, engaging video content that stands out. We believe every frame tells a story, and we are here to ensure yours is told brilliantly, precisely, and with maximum impact across all digital platforms.
        </p>
      </section>

      <section className="w-full max-w-6xl mb-20">
        <h2 className="text-4xl font-semibold text-neon-purple mb-6 border-b-2 border-neon-blue pb-4">
          Our Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray-300">
          <p>
            With years of experience in the industry, our editors are proficient in the latest software and techniques. From dynamic Instagram Reels and compelling ad campaigns to cinematic YouTube videos and intricate motion graphics, we handle projects of all scales and complexities.
          </p>
          <p>
            We pride ourselves on our meticulous attention to detail, creative problem-solving, and commitment to delivering projects on time and exceeding client expectations. Our expertise extends to color grading, sound design, and visual effects to ensure a polished final product.
          </p>
        </div>
      </section>

      <section className="w-full max-w-6xl">
        <h2 className="text-4xl font-semibold text-neon-blue mb-6 border-b-2 border-neon-purple pb-4">
          The Team
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Our diverse team brings together a blend of creative vision and technical mastery. While we can't show you their faces just yet, rest assured you're working with dedicated professionals who live and breathe video.
        </p>
        {/* Placeholder for team member cards if desired later */}
      </section>
    </main>
  );
}
