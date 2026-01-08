"use client";

import { SongMode, User, users } from "@/data/users";

interface ModeSelectorProps {
  selectedMode: SongMode | null;
  onSelectMode: (mode: SongMode) => void;
  selectedUser: User | null;
  duetPartner: User | null;
  onSelectDuetPartner: (user: User | null) => void;
  submittedModes: Set<SongMode>;
}

const modes: { id: SongMode; label: string; icon: string; color: string }[] = [
  { id: "solo", label: "SOLO", icon: "🎙️", color: "pink" },
  { id: "duet", label: "DUET", icon: "👥", color: "cyan" },
  { id: "suffer", label: "SUFFER", icon: "😈", color: "purple" },
];

export default function ModeSelector({ 
  selectedMode, 
  onSelectMode, 
  selectedUser,
  duetPartner,
  onSelectDuetPartner,
  submittedModes
}: ModeSelectorProps) {
  const availablePartners = users.filter(u => u.id !== selectedUser?.id);
  const allModesSubmitted = submittedModes.size >= 3;

  return (
    <section className="animate-fadeInUp delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <h2 className="flex items-center justify-center gap-2 font-display text-xl sm:text-2xl tracking-wider mb-4 text-center">
        <span>🎯</span>
        Pilih Mode
        {selectedUser && (
          <span className="text-sm font-normal text-text-muted">
            ({submittedModes.size}/3)
          </span>
        )}
      </h2>

      {/* Show completion message */}
      {allModesSubmitted && selectedUser && (
        <div className="mb-4 p-4 bg-green-500/10 border-2 border-green-500/40 rounded-xl text-center">
          <span className="text-2xl">🎉</span>
          <p className="text-green-400 font-medium mt-1">
            {selectedUser.name} sudah submit semua mode!
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {modes.map((mode) => {
          const isSubmitted = submittedModes.has(mode.id);
          const isDisabled = isSubmitted;
          
          return (
            <button
              key={mode.id}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (!isDisabled) {
                  onSelectMode(mode.id);
                  if (mode.id !== "duet") {
                    onSelectDuetPartner(null);
                  }
                }
              }}
              className={`relative bg-card rounded-xl p-4 sm:p-6 text-center
                         transition-all duration-300 border-2 overflow-hidden group
                         ${isDisabled 
                           ? 'opacity-50 cursor-not-allowed' 
                           : 'cursor-pointer hover:-translate-y-1 active:scale-95'
                         }
                         ${selectedMode === mode.id && !isDisabled
                           ? mode.color === 'pink' 
                             ? 'border-neon-pink glow-pink bg-neon-pink/10' 
                             : mode.color === 'cyan'
                               ? 'border-neon-cyan glow-cyan bg-neon-cyan/10'
                               : 'border-neon-purple glow-purple bg-neon-purple/10'
                           : isSubmitted
                             ? 'border-green-500/50 bg-green-500/10'
                             : 'border-white/10 hover:border-white/30'
                         }`}
            >
              {/* Checkmark for submitted modes */}
              {isSubmitted && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </div>
              )}
              
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl mb-2">{mode.icon}</div>
                <h3 className={`font-display text-base sm:text-xl tracking-wider
                  ${isSubmitted 
                    ? 'text-green-400' 
                    : mode.color === 'pink' ? 'text-neon-pink' : 
                      mode.color === 'cyan' ? 'text-neon-cyan' : 'text-neon-purple'
                  }`}>
                  {mode.label}
                </h3>
                {isSubmitted && (
                  <p className="text-green-400/70 text-xs mt-1">Sudah submit</p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Duet Partner Selection */}
      {selectedMode === "duet" && !submittedModes.has("duet") && (
        <div className="mt-5 p-4 bg-card/80 rounded-xl border-2 border-neon-cyan/40 animate-fadeInUp">
          <h3 className="flex items-center justify-center gap-2 font-display text-base sm:text-lg tracking-wider mb-3 text-neon-cyan text-center">
            <span>💑</span>
            Duet Sama Siapa?
          </h3>
          
          {!selectedUser ? (
            <p className="text-text-muted text-sm text-center">Pilih nama kamu dulu di atas!</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availablePartners.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => onSelectDuetPartner(duetPartner?.id === user.id ? null : user)}
                  className={`px-2 py-2 sm:px-3 sm:py-2.5 rounded-lg font-medium 
                             text-xs sm:text-sm transition-all duration-300 border-2 active:scale-95
                             ${duetPartner?.id === user.id
                               ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan'
                               : 'bg-card border-white/10 hover:border-neon-cyan/50 text-foreground'
                             }`}
                >
                  {user.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
