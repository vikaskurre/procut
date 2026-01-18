"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WordHighlight = () => {
  const component = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const text = "We Don’t Edit Videos. We Engineer Visual Impact.";
  const words = text.split(" ");

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(wordsRef.current, {
        scrollTrigger: {
          trigger: component.current,
          scrub: true,
          start: "top top",
          end: `+=${window.innerHeight * (words.length / 4)}`,
          pin: true,
        },
        color: (index) => {
            // This is a dummy animation to create the ScrollTrigger. 
            // The real work is done in the onUpdate callback.
            return '#333';
        },
        onUpdate: self => {
            const progress = self.progress;
            const wordIndex = Math.floor(progress * words.length);

            wordsRef.current.forEach((word, i) => {
                if (word) {
                    if (i === wordIndex) {
                        // Active word
                        word.style.color = 'transparent';
                        word.style.backgroundImage = 'linear-gradient(90deg, #ff8a00, #e52e71)';
                        word.style.backgroundClip = 'text';
                        word.style.webkitBackgroundClip = 'text';
                    } else if (i < wordIndex) {
                        // Words that have been passed
                        word.style.color = '#444444'; 
                        word.style.backgroundImage = 'none';
                    } else {
                        // Upcoming words
                        word.style.color = '#222222';
                        word.style.backgroundImage = 'none';
                    }
                }
            });

             // Initially, before any scroll, make the first word visible but not fully active
            if (self.progress === 0 && wordsRef.current[0]) {
                wordsRef.current[0].style.color = '#444444';
            }
        },
      });
    }, component);
    return () => ctx.revert();
  }, [words.length]);

  return (
    <div ref={component} className="h-screen flex items-center justify-center">
      <div className="text-center text-4xl md:text-6xl font-semibold leading-tight tracking-tight p-4" style={{textShadow: '0 0 10px rgba(0,0,0,0.5)'}}>
        <p>
            {words.map((word, i) => (
                <span 
                    key={i} 
                    ref={el => wordsRef.current[i] = el}
                    className="transition-colors duration-300 ease-in-out"
                    style={{color: '#222222'}} // Initial color for upcoming words
                >
                    {word}{' '}
                </span>
            ))}
        </p>
      </div>
    </div>
  );
};

export default WordHighlight;
