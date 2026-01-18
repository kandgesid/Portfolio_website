import React, { useMemo, useRef, useLayoutEffect } from 'react';
import Section from './Section';
import { EDUCATION_DATA } from '../constants';
import type { EducationItem } from '../types';

const EducationCard: React.FC<{ item: EducationItem }> = ({ item }) => (
      <div className="group relative pl-12">
      {/* Timeline Marker */}
      <div className="absolute left-0 top-1 w-4 h-4 bg-zinc-200 rounded-full border-4 border-slate-900 transition-all duration-300 group-hover:scale-110 pulse-glow-moonlight"></div>
      
      {/* Card Content */}
      <div className="bg-slate-800/60 backdrop-blur-sm p-5 rounded-lg border border-slate-700 transition-all duration-300 group-hover:border-zinc-300/50 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-zinc-500/10 overflow-hidden">
        <div className="absolute inset-[-15px] bg-zinc-300/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      <h3 className="text-lg md:text-xl font-bold text-white">{item.degree}</h3>
      <p className="text-sm md:text-base text-slate-400 mb-1">{item.institution}</p>
      {item.courses && item.courses.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {item.courses.map((course, idx) => (
            <span
              key={idx}
              className="inline-block bg-zinc-900/60 text-zinc-200 rounded-full px-2.5 py-0.5 text-xs font-medium border border-zinc-400/30"
            >
              {course}
            </span>
          ))}
        </div>
      )}
      <p className="text-xs md:text-sm text-slate-500 mt-2">{item.period} | {item.gpa}</p>
    </div>
  </div>
);

const About: React.FC = () => {
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

  const educationSectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const rayRef = useRef<HTMLDivElement>(null);
  
  const animState = useRef({
    currentY: -1,
    targetY: 0,
    velocity: 0,
    animFrameId: 0,
  });

  useLayoutEffect(() => {
    const sectionEl = educationSectionRef.current;
    const lineEl = lineRef.current;
    const rayEl = rayRef.current;

    if (!sectionEl || !lineEl || !rayEl) return;

    const onScroll = () => {
      const { top, height } = sectionEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (height === 0) return;

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
    <Section id="about" title="About Me">
      <div className="relative">
        <style>{`
          @keyframes subtle-twinkle {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.6; }
          }
        `}</style>
        <div className="absolute inset-0 z-0 pointer-events-none">{backgroundStars}</div>

        <div className="relative z-10 max-w-4xl mx-auto text-left text-sm md:text-base text-slate-300">
          <p className="leading-relaxed mb-4">
            Hi, I'm Siddhant Kandge, a Software Engineer and graduate student in Computer Science at Santa Clara University. I'm currently pursuing my master's degree while working on <span className="text-zinc-300 font-semibold">scalable backend systems</span>, <span className="text-zinc-300 font-semibold">distributed platforms</span>, and <span className="text-zinc-300 font-semibold">intelligent applications</span>.
          </p>
          <p className="leading-relaxed mb-4">
            My academic and professional journey has been shaped by a strong interest in <span className="text-zinc-300 font-semibold">Distributed Systems</span> and <span className="text-zinc-300 font-semibold">Databases</span>, with a focus on building robust, production-quality backend systems that balance correctness, performance, and maintainability.
          </p>
          <p className="leading-relaxed mb-4">
            I'm currently working as a Software Engineer at <span className="text-zinc-300 font-semibold">Lam Research</span>, and previously worked as a Software Engineer at <span className="text-zinc-300 font-semibold">Persistent Systems</span>, gaining hands-on experience building enterprise backend services and microservices. Alongside industry work, I serve as a Graduate Research Assistant at Santa Clara University, contributing to cloud-native and research-driven systems.
          </p>
          <p className="leading-relaxed">
            Outside of engineering, I enjoy participating in hackathons, playing cricket, and horse riding, and I value experiences that challenge me both technically and personally. Feel free to reach out if you'd like to connect, collaborate, or share an idea.
          </p>
        </div>

        <div className="relative z-10 my-8 md:my-10 h-px max-w-lg mx-auto bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"></div>

        <div ref={educationSectionRef} className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">Education</h3>
          <div className="relative max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
            <div ref={lineRef} className="absolute left-[7px] top-0 h-full w-0.5 bg-slate-700"></div>
            <div ref={rayRef} className="absolute top-0 left-[7px] w-1 h-32 -translate-x-1/2 bg-gradient-to-b from-slate-300/0 via-slate-300/80 to-slate-300/0 rounded-full" style={{ filter: 'blur(4px)', willChange: 'transform' }}></div>
            <div className="space-y-12">
              {EDUCATION_DATA.map((item, index) => (
                <EducationCard key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;