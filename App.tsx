
import React, { useState, useLayoutEffect, useRef, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import StarryBackground from './components/StarryBackground';
import KnowledgeGraph from './components/KnowledgeGraph';
import type { Particle } from './types';
import { StarIcon } from './components/icons/StarIcon';
// import './globals.css'; // or './index.css'

const getRandomInterval = () => 20000 + Math.random() * 20000; // 20-40s

const App: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [activeSection, setActiveSection] = useState<Element | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastActiveSection = useRef<Element | null>(null);
  const [sectionsList, setSectionsList] = useState<Element[]>([]);
  // Removed skyDarken state since we don't need it anymore
  const [sparkleActive, setSparkleActive] = useState(false);
  const [showWishMsg, setShowWishMsg] = useState(false);
  const sparkleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Prevent scroll restoration and ensure page starts at top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also set scroll position after a brief delay to ensure it takes effect
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    
    const sections = Array.from(document.querySelectorAll('[data-observe-section]'));
    setSectionsList(sections);
    
    if (sections.length > 0) {
      setActiveSection(sections[0]);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);
        if (intersectingEntry) {
            const visibleSections = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
            if(visibleSections.length > 0) {
              setActiveSection(visibleSections[0].target);
            }
        }
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);
  
  useEffect(() => {
    // Remove any existing CSS variables that might affect background
    document.documentElement.style.removeProperty('--sky-darken');
  }, []);
  
  const clearParticles = useCallback(() => {
    setParticles(prev => prev.map(p => ({ ...p, clearing: true })));
  }, []);

  const createParticles = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const newParticles: Particle[] = [];
    const count = Math.floor(Math.random() * 6) + 5; // 5-10 stars

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        newParticles.push({
            id: Math.random(),
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 5,
            size: Math.random() * 12 + 8, // 8-20px
            bounces: 0,
            opacity: 0.8,
        });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  useEffect(() => {
    if (!activeSection) return;
    
    const isHeroSection = sectionsList.length > 0 && activeSection === sectionsList[0];
    
    if (isHeroSection && lastActiveSection.current && lastActiveSection.current !== sectionsList[0]) {
      clearParticles();
    } else if (activeSection !== lastActiveSection.current) {
        const bounds = activeSection.getBoundingClientRect();
        setParticles(prev => {
          if (prev.length === 0) return [];
          return prev.map(p => ({
              ...p,
              y: bounds.top - 30 - Math.random() * 50,
              x: Math.random() * window.innerWidth,
              vy: Math.random() * 2 + 1,
              vx: (Math.random() - 0.5) * 4,
              bounces: 0,
              opacity: 0.8,
              clearing: false,
          }));
        });
    }
    lastActiveSection.current = activeSection;
  }, [activeSection, sectionsList, clearParticles]);

  // Sparkle animation logic: trigger 3 seconds after page load, regardless of scroll or section
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSparkleActive(true);
      setTimeout(() => {
        setSparkleActive(false);
        setShowWishMsg(true);
        setTimeout(() => {
          setShowWishMsg(false);
        }, 2000); // Show message for 1 second
      }, 1800);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);


  useLayoutEffect(() => {
    const animate = () => {
        setParticles(prevParticles => {
            if (prevParticles.length === 0) return [];
            
            const floor = window.innerHeight - 10;
            
            return prevParticles.map(p => {
                if (p.clearing) {
                    return { ...p, opacity: p.opacity - 0.05 };
                }

                let { x, y, vx, vy, rotation, bounces } = p;
                vy += 0.15;
                x += vx;
                y += vy;
                rotation += p.rotationSpeed;

                if (y > floor - p.size / 2 && vy > 0) {
                    y = floor - p.size / 2;
                    vy *= -0.6;
                    vx *= 0.8;
                    bounces++;
                }

                if (bounces >= 2 && Math.abs(vy) < 0.5) {
                    vx *= 0.95;
                    p.rotationSpeed *= 0.95;
                    const targetX = window.innerWidth / 2;
                    vx += (targetX - x) * 0.001;
                }

                if (x < p.size/2 || x > window.innerWidth - p.size/2) {
                    vx *= -0.8;
                    x = Math.max(p.size/2, Math.min(x, window.innerWidth - p.size/2));
                }

                return { ...p, x, y, vx, vy, rotation, bounces };
            }).filter(p => (!p.clearing || p.opacity > 0) && p.y < window.innerHeight + 100);
        });
        animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  const handleClearClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearParticles();
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-[#0A0A0F] to-[#0A0A0F] overflow-x-hidden decorative-sides"
      style={{
        background: `linear-gradient(to bottom, #0A0A0F 0%, #0A0A0F 100%)`,
      }}
      onClick={createParticles}
    >
      {/* Sparkle Star Animation */}
      {sparkleActive && (
        <div
          className="fixed top-1/4 left-[-60px] z-[100] pointer-events-none"
          style={{
            animation: 'star-fall 1.8s cubic-bezier(0.6,0,0.4,1) forwards',
          }}
        >
          {/* Star Tail */}
          <div
            className="absolute left-[-120px] top-1/2 -translate-y-1/2"
            style={{
              width: 160,
              height: 10,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0.95) 100%)',
              filter: 'blur(8px) drop-shadow(0 0 18px #fff)',
              opacity: 0.92,
              borderRadius: 8,
            }}
          />
          <StarIcon
            className="text-white drop-shadow-lg relative"
            style={{ width: 48, height: 48, filter: 'drop-shadow(0 0 20px #fff) drop-shadow(0 0 32px #e0e7ef)' }}
          />
        </div>
      )}
      {/* Wish Message Overlay */}
      {showWishMsg && (
        <>
          {/* Fade/blur overlay */}
          <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm transition-opacity duration-500 opacity-100 pointer-events-auto"></div>
          <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none">
            <div className="bg-slate-900/80 rounded-2xl px-8 py-6 shadow-2xl border border-zinc-400/30 animate-fade-in-wish">
              <p className="text-2xl md:text-3xl font-bold text-zinc-200 text-center mb-2">✨ When a star falls, let your dreams rise.</p>
              <p className="text-2xl md:text-4xl font-extrabold text-zinc-300 text-center tracking-widest mt-2">MAKE A WISH!</p>
            </div>
          </div>
        </>
      )}
      <style>{`
        @keyframes star-fall {
          0% { left: -60px; top: 25vh; opacity: 0; transform: scale(0.7) rotate(-20deg); }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100vw; top: 60vh; opacity: 0; transform: scale(1.2) rotate(20deg); }
        }
        .animate-fade-in-wish {
          animation: fade-in-wish 0.5s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fade-in-wish {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <Navbar />
      <StarryBackground />
      <KnowledgeGraph />
      
      {/* Particle Canvas */}
      <div className="fixed inset-0 pointer-events-none z-50">
          {particles.map(p => (
            <div key={p.id} style={{
                position: 'absolute',
                left: p.x,
                top: p.y,
                transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              }}>
                <StarIcon className="text-slate-200" style={{ 
                    width: p.size, 
                    height: p.size,
                    filter: `drop-shadow(0 0 ${p.size/2}px #f4f4f5)`,
                    opacity: p.opacity
                }}/>
            </div>
          ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <main>
          <Hero />
          <div className="space-y-24 sm:space-y-32 md:space-y-40">
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </div>
        </main>
        <footer data-observe-section className="text-center py-8 mt-24 text-gray-500">
            <button 
                onClick={handleClearClick}
                className="mb-6 bg-slate-800/50 text-slate-400 border border-slate-700 rounded-md px-4 py-2 text-sm hover:bg-slate-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
                Clear Stars & Restart
            </button>
            <p>&copy; {new Date().getFullYear()} Siddhant Kandge. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
