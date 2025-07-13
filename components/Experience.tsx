import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Section from './Section';
import { PROFESSIONAL_EXPERIENCE } from '../constants';
import type { ExperienceItem } from '../types';

const ExperienceCard: React.FC<{
  item: ExperienceItem;
  side: 'left' | 'right';
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ item, side, onMouseEnter, onMouseLeave }) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="group relative bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg border border-slate-700 w-full transition-all duration-300 group-hover:border-zinc-300/50 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-zinc-500/10 overflow-hidden"
  >
    {/* Moonlight Glow */}
    <div className="absolute inset-[-15px] bg-zinc-300/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

    {/* Pointer Arrow */}
    <div className={`absolute top-7 -mt-2 w-4 h-4 bg-slate-800/95 transform rotate-45 ${
      side === 'left' 
        ? 'right-0 -mr-2 border-t border-r border-slate-700' 
        : 'left-0 -ml-2 border-b border-l border-slate-700'
    }`}></div>

    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.role}</h3>
    <p className="text-base md:text-lg text-zinc-300 mb-4">{item.company} | {item.period}</p>
    <ul className="space-y-3 text-base md:text-lg text-slate-300">
      {item.tasks.map((task, i) => (
        <li key={i} className="flex items-start">
          <span className="text-zinc-300 mr-3 mt-1.5 flex-shrink-0">•</span>
          <span className="leading-relaxed">{task}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rayRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleIndices, setVisibleIndices] = useState(new Set<number>());

  const animState = useRef({
    currentY: -1,
    targetY: 0,
    velocity: 0,
    animFrameId: 0,
  });
  
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


  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const lineEl = lineRef.current;
    const rayEl = rayRef.current;

    if (!sectionEl || !lineEl || !rayEl) return;

    const onScroll = () => {
      const { top, height } = sectionEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const progress = (viewportHeight / 2 - top) / height;
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      const timelineHeight = lineEl.offsetHeight;
      const rayHeight = rayEl.offsetHeight;

      animState.current.targetY = clampedProgress * (timelineHeight - rayHeight);

      if (animState.current.animFrameId === 0) {
        animate();
      }
    };

    const animate = () => {
      const state = animState.current;
      if (state.currentY < 0) {
          state.currentY = state.targetY;
      }

      const distance = state.targetY - state.currentY;
      
      if (Math.abs(distance) < 0.1 && Math.abs(state.velocity) < 0.1) {
        state.currentY = state.targetY;
        state.animFrameId = 0;
      } else {
        const stiffness = 0.1;
        const damping = 0.8;
        const acceleration = distance * stiffness;
        state.velocity += acceleration;
        state.velocity *= damping;
        state.currentY += state.velocity;
        state.animFrameId = requestAnimationFrame(animate);
      }
      
      if(rayEl) {
        rayEl.style.transform = `translateY(${state.currentY}px)`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animState.current.animFrameId) {
        cancelAnimationFrame(animState.current.animFrameId);
      }
    };
  }, []);

  return (
    <Section id="experience" title="Professional Experience">
      <div ref={sectionRef} className="relative mx-auto px-4">
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 md:-translate-x-1/2">
            <div ref={lineRef} className="h-full w-full bg-slate-700"></div>
            <div ref={rayRef} className="absolute top-0 left-1/2 w-1 h-32 -translate-x-1/2 bg-gradient-to-b from-zinc-300/0 via-zinc-300/80 to-zinc-300/0 rounded-full" style={{ filter: 'blur(4px)', willChange: 'transform' }}></div>
        </div>
        
        <div className="space-y-12">
          {PROFESSIONAL_EXPERIENCE.map((item, index) => (
            <div
              key={index}
              data-index={index}
              ref={el => { cardRefs.current[index] = el; }}
              className={`transition-all duration-700 ease-out ${visibleIndices.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
                <div className={`absolute left-4 md:left-1/2 top-6 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-300 rounded-full border-4 border-slate-900 z-10 pulse-glow transition-all duration-300 ${hoveredIndex === index ? 'scale-125 shadow-[0_0_25px_#f4f4f5]' : ''}`}>
                </div>

                {/* Mobile View */}
                <div className="pl-12 md:hidden">
                    <ExperienceCard
                        item={item}
                        side="right"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    />
                </div>

                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-x-12">
                    <div className="flex justify-end">
                        {index % 2 === 0 && (
                            <ExperienceCard
                            item={item}
                            side="left"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            />
                        )}
                    </div>
                    <div className="flex justify-start">
                        {index % 2 !== 0 && (
                            <ExperienceCard
                            item={item}
                            side="right"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            />
                        )}
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;