import React, { useState, useRef, useEffect } from 'react';

const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    console.log('Initializing audio component...');
    
    // Create audio element
    const audio = new Audio('resources/ambient-night-sky.mp3');
    audio.loop = true;
    audio.volume = volume; // Use state volume
    audio.preload = 'auto';
    
    // Handle audio loading
    audio.addEventListener('loadstart', () => {
      console.log('Audio loading started');
    });
    
    audio.addEventListener('canplay', () => {
      console.log('Audio can play');
    });
    
    audio.addEventListener('canplaythrough', () => {
      console.log('Audio loaded successfully');
      setIsLoaded(true);
    });

    // Handle audio errors
    audio.addEventListener('error', (e) => {
      console.error('Audio failed to load:', e);
      console.error('Audio error details:', audio.error);
      setHasError(true);
      setIsLoaded(false);
    });

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (!isLoaded) {
        console.warn('Audio loading timeout - showing button anyway');
        setIsLoaded(true);
      }
    }, 3000); // 3 second timeout

    audioRef.current = audio;

    // Cleanup on unmount
    return () => {
      clearTimeout(timeoutId);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) {
      console.warn('No audio element available');
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Add user interaction requirement for autoplay
      audioRef.current.play().catch((error) => {
        console.warn('Failed to play audio:', error);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Handle page visibility changes to pause audio when tab is not active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPlaying]);

  if (!isLoaded) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        {hasError ? (
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 backdrop-blur-sm border border-red-500/50 rounded-full shadow-lg">
            <span className="text-red-400">⚠️</span>
            <span className="text-sm text-red-300">Audio unavailable</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-full shadow-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-400"></div>
            <span className="text-sm text-slate-400">Loading audio...</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <div className="flex flex-col items-end gap-3">
        {/* Volume Slider - only show when playing */}
        {isPlaying && (
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-full px-3 py-2">
            <span className="text-xs text-slate-300">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-12 sm:w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #F4F4F5 0%, #F4F4F5 ${volume * 100}%, #475569 ${volume * 100}%, #475569 100%)`
              }}
            />
          </div>
        )}
        
        {/* Main Button */}
        <button
          onClick={toggleAudio}
                  className={`
          group relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 
          bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 
          rounded-full shadow-lg transition-all duration-300
          hover:bg-slate-800/90 hover:border-zinc-300/50 
          hover:shadow-zinc-300/20 hover:shadow-xl
          focus:outline-none focus:ring-2 focus:ring-zinc-300/50 focus:ring-offset-2 focus:ring-offset-slate-900
          ${isPlaying ? 'text-zinc-200' : 'text-slate-300'}
        `}
          aria-label={isPlaying ? 'Pause ambient audio' : 'Play ambient audio'}
        >
          {/* Music note icon */}
          <span className="text-base sm:text-lg transition-transform duration-300 group-hover:scale-110">
            🎵
          </span>
          
          {/* Text - hidden on very small screens */}
          <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">
            Listen to the night sky
          </span>
          
          {/* Play/Pause button icon */}
          <div className="flex items-center gap-1">
            {isPlaying ? (
              // Pause Icon (two vertical bars)
              <div className="flex items-center gap-0.5">
                <div className="w-1 h-3 bg-current rounded-sm"></div>
                <div className="w-1 h-3 bg-current rounded-sm"></div>
              </div>
            ) : (
              // Play Icon (triangle pointing right)
              <div className="w-0 h-0 border-l-[6px] border-l-current border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
            )}
          </div>

          {/* Hover glow effect */}
          <div 
            className={`
              absolute inset-0 rounded-full opacity-0 transition-opacity duration-300
              group-hover:opacity-100 pointer-events-none
              ${isPlaying 
                ? 'bg-gradient-to-r from-zinc-300/20 to-zinc-500/20' 
                : 'bg-gradient-to-r from-slate-400/10 to-slate-600/10'
              }
            `}
          />
        </button>
      </div>
      
      {/* Custom slider styles */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #F4F4F5;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(244, 244, 245, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #F4F4F5;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(244, 244, 245, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AudioToggle; 