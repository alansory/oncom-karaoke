# 🎤 ONCOM Karaoke

Aplikasi karaoke web dengan Next.js - pilih lagu favorit, mode Solo atau Duet, dan mulai bernyanyi!

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Fitur

- 🔍 **Pencarian Lagu** - Cari lagu berdasarkan judul atau nama artis
- 🎙️ **Mode Solo** - Nyanyi sendiri dengan satu mic
- 👥 **Mode Duet** - Nyanyi berdua dengan teman atau pasangan (lirik berbeda warna)
- 🔥 **Lagu Populer** - Akses cepat ke lagu-lagu hits
- 🎨 **Neon Theme** - Desain nightclub aesthetic dengan glow effects
- 📱 **Responsive** - Tampil baik di desktop dan mobile

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka di browser
# http://localhost:3000
```

## 🎮 Cara Menggunakan

1. **Cari atau Pilih Lagu**
   - Ketik di search box, atau
   - Klik lagu dari "Lagu Populer"

2. **Pilih Mode**
   - **Solo** (pink) - Nyanyi sendiri
   - **Duet** (cyan) - Nyanyi berdua

3. **Mulai Karaoke**
   - Tekan tombol "MULAI KARAOKE!"
   - Lirik akan muncul di modal player
   - Gunakan kontrol play/stop

## 📁 Struktur Project

```
oncom-karaoke/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles + neon theme
│   │   ├── layout.tsx       # Root layout dengan fonts
│   │   └── page.tsx         # Halaman utama
│   ├── components/
│   │   ├── BackgroundEffects.tsx  # Animated glow orbs
│   │   ├── Header.tsx             # Logo & tagline
│   │   ├── SearchBox.tsx          # Song search
│   │   ├── ModeSelector.tsx       # Solo/Duet cards
│   │   ├── SongPreview.tsx        # Selected song display
│   │   ├── PopularSongs.tsx       # Popular songs grid
│   │   ├── StartButton.tsx        # CTA button
│   │   ├── KaraokeModal.tsx       # Karaoke player modal
│   │   └── Toast.tsx              # Notification toast
│   └── data/
│       └── songs.ts         # Song database
├── package.json
├── tailwind.config.ts
└── README.md
```

## 🎵 Database Lagu

Menyertakan 20 lagu sample Indonesia & internasional:
- Dewa 19, Noah, Peterpan, Armada
- Ed Sheeran, Lady Gaga, dll.

Beberapa lagu (A Whole New World, Shallow, Endless Love) adalah **duet-only** 💑

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Fonts**: Bebas Neue + Outfit (Google Fonts)

## 🔧 Pengembangan Lebih Lanjut

- [ ] Integrasi YouTube/Spotify API
- [ ] Sistem scoring
- [ ] Audio visualization
- [ ] User login & playlist
- [ ] Database lagu lebih lengkap

---

Made with ❤️ for karaoke lovers | © 2026 ONCOM Karaoke
