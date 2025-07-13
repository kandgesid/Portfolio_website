
import React, { useMemo } from 'react';

const StarryBackground: React.FC = () => {
  const stars = useMemo(() => {
    const starCount = 150;
    return Array.from({ length: starCount }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      const style = {
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 5 + 5}s`,
      };
      return <div key={i} className="absolute bg-white rounded-full animate-twinkle" style={style}></div>;
    });
  }, []);

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {stars}
      </div>
    </>
  );
};

export default StarryBackground;
