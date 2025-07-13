import React from 'react';
import { AvatarPlaceholderIcon, StarIcon } from './icons';

const Hero: React.FC = () => {
  return (
    <section 
      id="home"
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden" 
      data-observe-section
    >
      <div className="flex flex-col items-center gap-8 relative z-10 text-center px-4">
        {/* Avatar */}
        <div className="flex justify-center animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
                {/* Soft radial glow */}
                <div className="absolute inset-0 bg-zinc-300/10 rounded-full blur-3xl"></div>

                {/* Floating image container */}
                <div className="absolute inset-0 rounded-full overflow-hidden" style={{ animation: 'animate-float 5s ease-in-out infinite' }}>
                    <img
                        src="/resources/6E96A931-27C7-4F3B-8F15-45E963E434ED_1_105_c.jpeg"
                        alt="Siddhant Kandge"
                        className="w-full h-full object-cover object-center"
                        style={{ filter: 'drop-shadow(0 10px 15px rgba(244, 244, 245, 0.15))' }}
                    />
                </div>
            </div>
        </div>

        {/* Text Content */}
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white whitespace-nowrap leading-tight mb-4 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
            Siddhant Kandge
          </h1>
          <div className="inline-block mb-4">
             <p className="text-xl md:text-2xl text-slate-300 animate-typing">
              Software Engineer & Full-Stack Developer
            </p>
          </div>
          <div className="animate-fade-slide-up" style={{ animationDelay: '4.5s' }}>
            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
               <span className="inline-block bg-green-500/10 text-green-300 text-xs font-semibold px-2 py-1 rounded-full">Available for Hire</span>
               <span>Building scalable apps & intelligent systems.</span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-slide-up" style={{ animationDelay: '4.8s' }}>
            <a href="#contact" className="group relative bg-zinc-300 text-slate-900 font-bold py-3 px-8 rounded-lg shadow-lg shadow-zinc-300/20 hover:bg-zinc-200 transition-all duration-300 transform hover:scale-105 text-lg">
              Contact Me
              <span className="sparkle absolute top-0 left-0 opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.2s' }}></span>
              <span className="sparkle absolute top-0 right-1/2 opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.3s' }}></span>
              <span className="sparkle absolute bottom-1/2 left-1/4 opacity-0 group-hover:opacity-100" style={{ animationDelay: '0s' }}></span>
            </a>
            <a href="https://drive.google.com/file/d/1X9an1KN_pAsuryorlSb-7nD3iWP9XjJF/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="group relative bg-slate-800/50 border border-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-slate-700/70 hover:border-white transition-all duration-300 transform hover:scale-105 text-lg">
              View Resume
              <span className="sparkle absolute top-0 left-0 w-2 h-2 opacity-0 group-hover:opacity-100" style={{ animationDelay: '0s' }}></span>
              <span className="sparkle absolute top-0 right-0 w-2 h-2 opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.1s' }}></span>
              <span className="sparkle absolute bottom-0 left-0 w-2 h-2 opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.2s' }}></span>
              <span className="sparkle absolute bottom-0 right-0 w-2 h-2 opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.3s' }}></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;