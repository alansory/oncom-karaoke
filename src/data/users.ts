export interface User {
  id: number;
  name: string;
}

export const users: User[] = [
  { id: 1, name: "Mira K" },
  { id: 2, name: "Choi Rendy" },
  { id: 3, name: "Bang Batre" },
  { id: 4, name: "Yanman" },
  { id: 5, name: "Chintya" },
  { id: 6, name: "Lanrik" },
  { id: 7, name: "Panji" },
  { id: 8, name: "Azaria" },
  { id: 9, name: "Evita" },
  { id: 10, name: "Bedul" },
  { id: 11, name: "Betharia" },
  { id: 12, name: "Micel" },
];

export type SongMode = "solo" | "duet" | "suffer";

export interface SongRequest {
  id: string;
  user: User;
  mode: SongMode;
  duetPartner?: User; // Partner untuk mode duet
  songTitle: string;
  artist: string;
  timestamp: Date;
}

