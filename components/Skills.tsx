
import React, { useMemo, useState, useRef, useEffect } from 'react';
import Section from './Section';
import { SKILLS_DATA } from '../constants';

const Skills: React.FC = () => {
  const backgroundStars = useMemo(() => (
    [...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-white/70 rounded-full"
        style={{
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationName: 'subtle-twinkle',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDuration: `${Math.random() * 10 + 10}s`,
          animationDelay: `${Math.random() * 10}s`,
        }}
      />
    ))
  ), []);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleIndices, setVisibleIndices] = useState(new Set<number>());
  const [showCards, setShowCards] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowCards(true);
          } else {
            setShowCards(false);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '-1');
            if (index > -1) {
              setVisibleIndices((prev) => new Set(prev).add(index));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="skills" title="Technical Skills">
      <div className="relative" ref={sectionRef}>
        <style>{`
          @keyframes subtle-twinkle {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.6; }
          }
        `}</style>
        <div className="absolute inset-0 z-0 pointer-events-none">
          {backgroundStars}
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {SKILLS_DATA.map((category, index) => (
            <div
              key={category.title}
              ref={el => { cardRefs.current[index] = el; }}
              data-index={index}
              className={`group relative transition-all duration-700 ease-out ${showCards && visibleIndices.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ minHeight: 260 }}
            >
              {/* Glowing background on hover */}
              <div className="absolute inset-[-15px] bg-zinc-300/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <div className="relative bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg border border-slate-700 w-full transition-all duration-300 group-hover:border-zinc-300/50 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-zinc-500/10 flex flex-col items-center justify-center h-full overflow-hidden">
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-300 mb-4 text-center">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="bg-zinc-900/60 text-zinc-200 text-base font-medium px-4 py-2 rounded-full cursor-default border border-zinc-400/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Skills;
