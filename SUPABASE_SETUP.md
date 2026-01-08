# Setup Supabase untuk ONCOM Karaoke

## 1. Buat Project di Supabase

1. Buka https://supabase.com dan login/register
2. Klik "New Project"
3. Pilih organization dan beri nama project (misal: `oncom-karaoke`)
4. Set password database (simpan baik-baik!)
5. Pilih region terdekat (Singapore)
6. Klik "Create new project" dan tunggu selesai

## 2. Buat Table `song_requests`

Buka **SQL Editor** di Supabase dashboard, lalu jalankan query ini:

```sql
-- Create table for song requests
CREATE TABLE song_requests (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('solo', 'duet', 'suffer')),
  duet_partner_id INTEGER,
  duet_partner_name TEXT,
  song_title TEXT NOT NULL,
  artist TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE song_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read
CREATE POLICY "Allow public read" ON song_requests
  FOR SELECT USING (true);

-- Policy: Allow anyone to insert
CREATE POLICY "Allow public insert" ON song_requests
  FOR INSERT WITH CHECK (true);

-- Policy: Allow anyone to delete
CREATE POLICY "Allow public delete" ON song_requests
  FOR DELETE USING (true);

-- Enable realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE song_requests;
```

## 3. Dapatkan API Keys

1. Buka **Settings** > **API** di Supabase dashboard
2. Copy nilai berikut:
   - **Project URL** (contoh: `https://xxxxx.supabase.co`)
   - **anon public** key (di bagian "Project API keys")

## 4. Setup Environment Variables

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```

⚠️ **Ganti dengan nilai yang kamu copy dari Supabase!**

## 5. Jalankan Aplikasi

```bash
npm run dev
```

Buka http://localhost:3000 dan coba request lagu!

## 6. Test Real-time Sync

1. Buka aplikasi di 2 browser/device berbeda
2. Request lagu dari salah satu device
3. Lihat antrian update otomatis di device lain! 🎉

---

## Troubleshooting

### Error: "relation song_requests does not exist"
- Pastikan sudah menjalankan SQL di step 2

### Error: "Invalid API key"
- Pastikan `.env.local` sudah benar
- Restart dev server setelah edit `.env.local`

### Data tidak sync real-time
- Pastikan sudah jalankan: `ALTER PUBLICATION supabase_realtime ADD TABLE song_requests;`
- Cek di Supabase dashboard > Database > Replication, pastikan table `song_requests` ada di list

