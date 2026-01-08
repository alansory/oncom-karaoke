"use client";

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50
                 bg-card border-2 border-neon-cyan/50 rounded-xl sm:rounded-2xl 
                 px-4 sm:px-6 py-3 sm:py-4 
                 shadow-lg shadow-neon-cyan/20
                 transition-all duration-300 max-w-[90vw] sm:max-w-md
                 ${isVisible 
                   ? 'opacity-100 translate-y-0' 
                   : 'opacity-0 translate-y-4 pointer-events-none'
                 }`}
    >
      <p className="text-sm sm:text-base text-foreground text-center">{message}</p>
    </div>
  );
}
