"use client";

export default function Header() {
  return (
    <header className="text-center py-8 sm:py-12 animate-fadeInDown">
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
        <span className="text-4xl sm:text-5xl animate-bounce-slow">🎤</span>
        <h1 className="font-display">
          <span className="text-4xl sm:text-5xl tracking-widest text-gradient-neon drop-shadow-lg">
            ONCOM
          </span>
          <span className="block text-xl sm:text-2xl tracking-[0.5em] text-gradient-cyan">
            Karaoke
          </span>
        </h1>
      </div>
      <p className="text-text-secondary text-sm sm:text-base mt-2">
        Request lagu favoritmu! 🎵
      </p>
    </header>
  );
}
