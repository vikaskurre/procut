"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyProcut = () => {
  const component = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);

  const words = ["Precision", "Speed", "Consistency", "Impact"];

  useEffect(() => {
    let ctx = gsap.context(() => {
      wordsRef.current.forEach((word, i) => {
        if (word) {
          gsap.set(word, { opacity: i === 0 ? 1 : 0 });
        }
      });

      ScrollTrigger.create({
        trigger: component.current,
        start: "top top",
        end: `+=${window.innerHeight * words.length}`,
        pin: true,
        scrub: true,
        onUpdate: self => {
          const progress = self.progress;
          const totalSteps = words.length;
          const overallIndex = progress * totalSteps;
          const currentIndex = Math.floor(overallIndex);
          const stepProgress = overallIndex - currentIndex;

          wordsRef.current.forEach((word, i) => {
            if (word) {
              let opacity = 0;
              if (i === currentIndex) {
                // First half: fade out current
                if (stepProgress < 0.5) {
                  opacity = 1 - stepProgress * 2;
                }
              } else if (i === currentIndex + 1) {
                // Second half: fade in next
                if (stepProgress >= 0.5) {
                  opacity = (stepProgress - 0.5) * 2;
                }
              }
              gsap.set(word, { opacity });
            }
          });
        }
      });
    }, component);
    return () => ctx.revert();
  }, [words.length]);

  return (
    <section ref={component} className="h-screen flex flex-col items-center justify-center px-4 bg-black">
      <div className="text-center mb-4">
        <h2 className="text-lg md:text-xl font-light text-gray-400 uppercase tracking-wider">Why Procut</h2>
      </div>
      <div className="text-center">
        {words.map((word, i) => (
          <div
            key={i}
            ref={el => { wordsRef.current[i] = el; }}
            className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight"
            style={{
              background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {word}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyProcut;