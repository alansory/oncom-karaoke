"use client";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated glowing orbs - smaller on mobile */}
      <div 
        className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] 
                   rounded-full blur-[80px] sm:blur-[100px] opacity-30 sm:opacity-40 animate-float"
        style={{ 
          background: 'var(--neon-pink)',
          top: '-50px',
          left: '-50px',
        }}
      />
      <div 
        className="absolute w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] lg:w-[350px] lg:h-[350px] 
                   rounded-full blur-[80px] sm:blur-[100px] opacity-30 sm:opacity-40 animate-float"
        style={{ 
          background: 'var(--neon-cyan)',
          bottom: '-30px',
          right: '-30px',
          animationDelay: '-3s',
        }}
      />
      <div 
        className="absolute w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] lg:w-[300px] lg:h-[300px] 
                   rounded-full blur-[80px] sm:blur-[100px] opacity-30 sm:opacity-40 animate-float"
        style={{ 
          background: 'var(--neon-purple)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animationDelay: '-5s',
        }}
      />
      
      {/* Grid overlay - subtle */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
