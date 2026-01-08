"use client";

import { useState, useMemo } from "react";
import BackgroundEffects from "@/components/BackgroundEffects";
import Header from "@/components/Header";
import UserSelector from "@/components/UserSelector";
import ModeSelector from "@/components/ModeSelector";
import SongInput from "@/components/SongInput";
import SongQueue from "@/components/SongQueue";
import Toast from "@/components/Toast";
import { User, SongMode } from "@/data/users";
import { useSongQueue } from "@/hooks/useSongQueue";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedMode, setSelectedMode] = useState<SongMode | null>(null);
  const [duetPartner, setDuetPartner] = useState<User | null>(null);
  const [toast, setToast] = useState({ message: "", isVisible: false });
  
  // Supabase real-time queue
  const { queue: songQueue, loading, error, addRequest, removeRequest } = useSongQueue();

  // Track which modes the selected user has already submitted
  const userSubmittedModes = useMemo(() => {
    if (!selectedUser) return new Set<SongMode>();
    return new Set(
      songQueue
        .filter((req) => req.user.id === selectedUser.id)
        .map((req) => req.mode)
    );
  }, [selectedUser, songQueue]);

  // Check if user has submitted all modes
  const hasSubmittedAllModes = userSubmittedModes.size >= 3;

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleSelectUser = (user: User | null) => {
    setSelectedUser(user);
    setSelectedMode(null); // Reset mode when user changes
    if (duetPartner?.id === user?.id) {
      setDuetPartner(null);
    }
  };

  const handleSubmitSong = async (songInput: string) => {
    if (!selectedUser) {
      showToast("⚠️ Pilih nama kamu dulu!");
      return;
    }
    if (!selectedMode) {
      showToast("⚠️ Pilih mode dulu (Solo/Duet/Suffer)!");
      return;
    }
    if (selectedMode === "duet" && !duetPartner) {
      showToast("⚠️ Pilih partner duet dulu!");
      return;
    }

    const parts = songInput.split(" - ");
    if (parts.length < 2) {
      showToast("⚠️ Format salah! Gunakan: Judul - Artist");
      return;
    }

    const songTitle = parts[0].trim();
    const artist = parts.slice(1).join(" - ").trim();

    const success = await addRequest(
      selectedUser,
      selectedMode,
      songTitle,
      artist,
      selectedMode === "duet" ? duetPartner ?? undefined : undefined
    );

    if (success) {
    if (selectedMode === "duet" && duetPartner) {
      showToast(`✅ ${selectedUser.name} & ${duetPartner.name} request "${songTitle}"!`);
    } else {
      showToast(`✅ ${selectedUser.name} request "${songTitle}" berhasil!`);
    }
      // Reset mode setelah submit, user tetap terpilih
    setSelectedMode(null);
    setDuetPartner(null);
    } else {
      showToast("❌ Gagal menambah request. Coba lagi!");
    }
  };

  const handleRemoveRequest = async (id: string) => {
    const success = await removeRequest(id);
    if (success) {
    showToast("🗑️ Request dihapus");
    } else {
      showToast("❌ Gagal menghapus request");
    }
  };

  const isReadyToSubmit = selectedUser && selectedMode && 
    (selectedMode !== "duet" || duetPartner) &&
    !userSubmittedModes.has(selectedMode); // Can't submit already submitted mode

  // Show error if Supabase connection fails
  if (error && !loading) {
    showToast(`⚠️ ${error}`);
  }

  return (
    <>
      <BackgroundEffects />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center">
        {/* Main Content Container - Centered */}
        <div className="w-full max-w-2xl mx-auto px-5 sm:px-8">
          <Header />
          
          <main className="flex flex-col gap-8 sm:gap-10 pb-8">
            <UserSelector 
              selectedUser={selectedUser}
              onSelectUser={handleSelectUser}
            />

            <ModeSelector 
              selectedMode={selectedMode} 
              onSelectMode={setSelectedMode}
              selectedUser={selectedUser}
              duetPartner={duetPartner}
              onSelectDuetPartner={setDuetPartner}
              submittedModes={userSubmittedModes}
            />
            
            <SongInput 
              onSubmit={handleSubmitSong}
              disabled={!isReadyToSubmit}
            />

            <SongQueue 
              queue={songQueue}
              onRemove={handleRemoveRequest}
              loading={loading}
            />
          </main>
        </div>

        {/* Footer */}
        <footer className="w-full mt-auto py-6 text-center text-text-muted text-xs border-t border-white/5">
          <p>Made with ❤️ for karaoke night</p>
          <p className="mt-1 opacity-60">© 2026 ONCOM Karaoke</p>
        </footer>
      </div>

      <Toast message={toast.message} isVisible={toast.isVisible} />
    </>
  );
}
