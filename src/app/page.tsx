"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from 'lenis';
import AnimatedHeadline from "../components/AnimatedHeadline";
import WhyProcut from "../components/WhyProcut";
import Script from 'next/script';

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

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value as number) : lenis.scroll || 0
      }
    })

    // Parallax for hero video
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: videoRef.current.parentElement,
          scrub: true
        }
      });
    }

    // WORD-BY-WORD HEADLINE
    const words = document.querySelectorAll('#headline span');
    if (words.length > 0) {
      gsap.set(words, { className: 'inactive' });
      ScrollTrigger.create({
        trigger: '.word-story',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: self => {
          const progress = self.progress;
          const numWords = words.length;
          const currentIndex = Math.floor(progress * numWords);
          words.forEach((w, i) => {
            if (i < currentIndex) {
              w.classList.add('previous');
              w.classList.remove('active', 'inactive');
            } else if (i === currentIndex) {
              w.classList.add('active');
              w.classList.remove('previous', 'inactive');
            } else {
              w.classList.add('inactive');
              w.classList.remove('active', 'previous');
            }
          });
        }
      });
    }

    // Animate sections
    // @ts-ignore
    gsap.utils.toArray('.animate-section').forEach((section: any) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
        }
      );
    });

    // Animate work videos
    gsap.utils.toArray('.work-video').forEach((el: any) => {
      gsap.fromTo(el, { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, duration: 1, ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });

  }, []);

  return (
    <main className="bg-black text-white font-light">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 animate-section hero-section">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/showreel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6 tracking-tight">Your Story, Perfectly Edited with Procut</h1>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <button className="px-8 py-4 bg-cinematic-orange text-black font-medium rounded-2xl hover:shadow-lg hover:shadow-cinematic-orange/50 hover:scale-102 transition-all duration-300">
                Request a Sample Edit
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="px-8 py-4 border border-white/30 text-heading-white font-medium rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                View Selected Work
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Word Story */}
      <section className="word-story h-screen flex items-center justify-center px-4">
        <div className="sticky">
          <AnimatedHeadline
            text="We Don't Edit Videos. We Engineer Visual Impact."
            className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-center"
          />
        </div>
      </section>

      {/* Support */}
      <section className="support h-screen flex items-center justify-center px-4">
        <p className="text-lg md:text-xl text-body-grey text-center max-w-2xl">High-impact cinematic edits for creators and brands.</p>
      </section>

      {/* WHY PROCUT */}
      <WhyProcut />

      {/* Services */}
      <section className="services h-screen flex items-center justify-center px-4 animate-section">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider text-heading-white">Services</h2>
            <p className="text-lg text-body-grey">Focused. High-end. Purpose-driven.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Cinematic Video Editing", desc: "High-end edits crafted with precision, pacing, and emotion." },
              { title: "Short-Form Content (Reels / Ads)", desc: "Scroll-stopping edits designed for reach and retention." },
              { title: "YouTube Long-Form Editing", desc: "Story-driven, audience-focused, retention-optimized videos." },
              { title: "Brand & Corporate Films", desc: "Premium visuals for brands that care about perception." },
            ].map((service, index) => (
              <div key={index} className="service-card text-center">
                <h3 className="text-xl font-medium text-heading-white mb-2">{service.title}</h3>
                <p className="text-body-grey">{service.desc}</p>
              </div>
            ))}
          </div>
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

      {/* Work / Proof */}
      <section className="h-screen flex items-center justify-center px-4 animate-section bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-wider"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Work / Proof
          </motion.h2>
          <motion.p
            className="text-lg text-body-grey text-center mb-12"
            variants={itemVariants}
          >
            ye bolte nahi, dikhaate hain
          </motion.p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { src: "/showreel.mp4", title: "Cinematic Showreel" },
              { src: "/147290-791334083.mp4", title: "Brand Edit" }
            ].map((video, index) => (
              <motion.div
                key={index}
                className="work-video group relative overflow-hidden rounded-lg"
                variants={itemVariants}
              >
                <video
                  className="w-full h-48 object-cover transition-transform duration-300"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center pb-4 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
                  <h3 className="text-white text-lg font-medium">{video.title}</h3>
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
      <section className="h-screen flex items-center justify-center px-4 animate-section">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-wider"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Work Process
          </motion.h2>
          <motion.p
            className="text-lg text-soft-grey text-center mb-12"
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
              { step: "01. Creative Direction", desc: "Understanding your brand, audience, and objective." },
              { step: "02. Cinematic Editing", desc: "Precision cuts, pacing, color, and sound design." },
              { step: "03. Review & Refinement", desc: "Detail-focused revisions for perfection." },
              { step: "04. Final Master Delivery", desc: "Full HD / 4K / 6K — platform-ready output." },
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
                  <p className="text-soft-grey">{processStep.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Client Reviews */}
      <section className="h-screen flex items-center justify-center px-4 animate-section bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 tracking-wider"
              variants={itemVariants}
            >
              Client Reviews
            </motion.h2>
            <motion.blockquote
              className="text-2xl md:text-3xl text-body-grey italic mb-8"
              variants={itemVariants}
            >
              "PROCUT doesn't just edit videos — they elevate brands."
            </motion.blockquote>
            <motion.p
              className="text-muted-grey mb-8"
              variants={itemVariants}
            >
              — International Client
            </motion.p>
            <motion.blockquote
              className="text-2xl md:text-3xl text-body-grey italic"
              variants={itemVariants}
            >
              "Fast delivery. Insane quality. Zero compromises."
            </motion.blockquote>
            <motion.p
              className="text-muted-grey"
              variants={itemVariants}
            >
              — Satisfied Customer
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta h-screen flex items-center justify-center px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 tracking-wider text-heading-white">Ready to engineer impact?</h3>
          <Link href="/contact">
            <button className="primary px-8 py-4 bg-cinematic-orange text-black font-medium rounded-2xl hover:shadow-lg hover:shadow-cinematic-orange/50 hover:scale-102 transition-all duration-300">Request a Sample Edit</button>
          </Link>
        </div>
      </section>
      <Script>{`
        gsap.registerPlugin(ScrollTrigger);

        // HERO FADE IN
        gsap.from('.hero h1', { opacity: 0, y: 20, duration: 1 });
        gsap.from('.hero .flex button', { opacity: 0, y: 20, duration: 1, delay: 0.2, stagger: 0.1 });

        // SUPPORTING LINE (AFTER)
        gsap.from('.support p', {
          scrollTrigger: { trigger: '.support', start: 'top 50%' },
          opacity: 0, duration: 0.8
        });



        // SERVICES — ONE PER SCROLL
        gsap.utils.toArray('.service-card').forEach((card)=>{
          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          });
        });
      `}</Script>
    </main>
  );
}
