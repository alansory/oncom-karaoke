"use client";

import { useSearchParams } from "next/navigation";
import { SongRequest } from "@/data/users";

interface SongQueueProps {
  queue: SongRequest[];
  onRemove: (id: string) => void;
  loading?: boolean;
}

const modeColors = {
  solo: { bg: "bg-neon-pink/20", text: "text-neon-pink", label: "SOLO" },
  duet: { bg: "bg-neon-cyan/20", text: "text-neon-cyan", label: "DUET" },
  suffer: { bg: "bg-neon-purple/20", text: "text-neon-purple", label: "SUFFER" },
};

export default function SongQueue({ queue, onRemove, loading }: SongQueueProps) {
  const searchParams = useSearchParams();
  // URL param ?reveal=true untuk melihat siapa yang request suffer mode
  const revealSuffer = searchParams.get("reveal") === "true";
  // Loading state
  if (loading) {
    return (
      <section className="animate-fadeInUp delay-400 opacity-0" style={{ animationFillMode: 'forwards' }}>
        <h2 className="flex items-center justify-center gap-2 font-display text-xl sm:text-2xl tracking-wider mb-4 text-center">
          <span>📋</span>
          Antrian Lagu
        </h2>
        <div className="bg-card rounded-xl p-8 text-center border-2 border-white/5">
          <div className="animate-pulse flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-full" />
            <div className="w-32 h-4 bg-white/10 rounded" />
            <div className="w-24 h-3 bg-white/5 rounded" />
          </div>
        </div>
      </section>
    );
  }

  if (queue.length === 0) {
    return (
      <section className="animate-fadeInUp delay-400 opacity-0" style={{ animationFillMode: 'forwards' }}>
        <h2 className="flex items-center justify-center gap-2 font-display text-xl sm:text-2xl tracking-wider mb-4 text-center">
          <span>📋</span>
          Antrian Lagu
          <span className="text-sm font-normal text-text-muted">(0)</span>
        </h2>
        <div className="bg-card rounded-xl p-8 text-center border-2 border-white/5">
          <span className="text-4xl block mb-3 opacity-40">🎶</span>
          <p className="text-text-muted text-sm">Belum ada request lagu</p>
          <p className="text-text-muted text-xs mt-1 opacity-60">Ayo request lagu pertama!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="animate-fadeInUp delay-400 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <h2 className="flex items-center justify-center gap-2 font-display text-xl sm:text-2xl tracking-wider mb-4 text-center">
        <span>📋</span>
        Antrian Lagu
        <span className="text-sm font-normal text-text-muted">({queue.length})</span>
      </h2>
      
      <div className="space-y-2">
        {queue.map((request, index) => {
          const modeStyle = modeColors[request.mode];
          return (
            <div
              key={request.id}
              className="bg-card rounded-xl p-3 sm:p-4 flex items-center gap-3 
                        border-2 border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              {/* Queue Number */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center
                            font-display text-sm sm:text-base text-text-secondary flex-shrink-0">
                {index + 1}
              </div>
              
              {/* Song Info */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm sm:text-base text-foreground truncate">
                  {request.mode === "suffer" && !revealSuffer ? (
                    <span className="text-neon-purple/70 italic">🎵 Lagu Rahasia...</span>
                  ) : (
                    <>{request.songTitle} <span className="text-text-muted font-normal">-</span> <span className="text-text-secondary font-normal">{request.artist}</span></>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  {request.mode === "duet" && request.duetPartner ? (
                    <span className="text-xs text-text-muted">
                      <span className="text-neon-pink">{request.user.name}</span>
                      <span className="text-neon-cyan"> & {request.duetPartner.name}</span>
                    </span>
                  ) : request.mode === "suffer" && !revealSuffer ? (
                    <span className="text-xs text-neon-purple/70 italic">??? (siapa ya? 🤫)</span>
                  ) : (
                    <span className="text-xs text-neon-pink">{request.user.name}</span>
                  )}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-display tracking-wider
                                  ${modeStyle.bg} ${modeStyle.text}`}>
                    {modeStyle.label}
                  </span>
                </div>
              </div>
              
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => onRemove(request.id)}
                className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center
                          opacity-60 hover:opacity-100 transition-all duration-300
                          hover:bg-red-500/20 hover:text-red-400 text-text-muted text-xs flex-shrink-0"
                title="Hapus"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
