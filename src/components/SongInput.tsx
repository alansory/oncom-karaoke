"use client";

import { useState } from "react";

interface SongInputProps {
  onSubmit: (song: string) => void;
  disabled: boolean;
}

export default function SongInput({ onSubmit, disabled }: SongInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSubmit(input.trim());
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !disabled) {
      handleSubmit();
    }
  };

  return (
    <section className="animate-fadeInUp delay-300 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <h2 className="flex items-center justify-center gap-2 font-display text-xl sm:text-2xl tracking-wider mb-4 text-center">
        <span>🎵</span>
        Request Lagu
      </h2>
      
      <div className="flex flex-col gap-3">
        {/* Input Field */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Judul - Artist"
          disabled={disabled}
          className={`w-full px-5 py-4 text-base sm:text-lg bg-card rounded-xl border-2 
                     outline-none transition-all duration-300 text-foreground text-center
                     placeholder:text-text-muted
                     ${disabled 
                       ? 'opacity-40 cursor-not-allowed border-white/5' 
                       : 'border-white/20 focus:border-neon-cyan focus:glow-cyan hover:border-white/30'
                     }`}
        />
        
        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || !input.trim()}
          className={`w-full py-4 font-display text-lg sm:text-xl tracking-wider
                     rounded-xl transition-all duration-300 border-2
                     ${disabled || !input.trim()
                       ? 'bg-card border-white/5 text-text-muted cursor-not-allowed opacity-40'
                       : 'bg-gradient-neon border-transparent hover:scale-[1.02] hover:glow-pink text-white active:scale-[0.98]'
                     }`}
        >
          SUBMIT
        </button>
      </div>
      
      {disabled && (
        <p className="text-text-muted text-xs sm:text-sm mt-3 text-center">
          ☝️ Pilih nama & mode dulu ya!
        </p>
      )}
    </section>
  );
}
