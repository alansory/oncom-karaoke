"use client";

import { users, User } from "@/data/users";

interface UserSelectorProps {
  selectedUser: User | null;
  onSelectUser: (user: User | null) => void;
}

export default function UserSelector({ selectedUser, onSelectUser }: UserSelectorProps) {
  return (
    <section className="animate-fadeInUp delay-100 opacity-0" style={{ animationFillMode: 'forwards' }}>
      <h2 className="flex items-center justify-center gap-2 font-display text-xl sm:text-2xl tracking-wider mb-4 text-center">
        <span>👤</span>
        Siapa Kamu?
      </h2>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
        {users.map((user) => (
          <button
            key={user.id}
            type="button"
            onClick={() => onSelectUser(selectedUser?.id === user.id ? null : user)}
            className={`px-2 py-2.5 sm:px-4 sm:py-3 rounded-lg font-medium 
                       text-xs sm:text-sm transition-all duration-300 border-2 active:scale-95
                       ${selectedUser?.id === user.id
                         ? 'bg-neon-pink/20 border-neon-pink text-neon-pink glow-pink'
                         : 'bg-card border-white/10 hover:border-neon-pink/50 hover:bg-card-hover text-foreground'
                       }`}
          >
            {user.name}
          </button>
        ))}
      </div>
    </section>
  );
}
