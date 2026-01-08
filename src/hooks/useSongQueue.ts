"use client";

import { useEffect, useState, useCallback } from 'react';
import { supabase, SongRequestDB, isSupabaseConfigured } from '@/lib/supabase';
import { SongRequest, User, SongMode } from '@/data/users';

// Convert DB format to app format
function dbToSongRequest(db: SongRequestDB): SongRequest {
  return {
    id: db.id,
    user: { id: db.user_id, name: db.user_name },
    mode: db.mode as SongMode,
    duetPartner: db.duet_partner_id 
      ? { id: db.duet_partner_id, name: db.duet_partner_name! }
      : undefined,
    songTitle: db.song_title,
    artist: db.artist,
    timestamp: new Date(db.created_at),
  };
}

export function useSongQueue() {
  const [queue, setQueue] = useState<SongRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  const fetchQueue = useCallback(async () => {
    // Skip if Supabase is not configured (during build)
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('song_requests')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase error:', error.message, error.code, error.details);
        throw new Error(error.message || 'Database error');
      }
      
      setQueue((data || []).map(dbToSongRequest));
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error fetching queue:', errorMessage);
      setError(`Gagal load antrian: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // Subscribe to real-time changes
  useEffect(() => {
    // Skip if Supabase is not configured (during build)
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    fetchQueue();

    const channel = supabase
      .channel('song_requests_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'song_requests',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newRequest = dbToSongRequest(payload.new as SongRequestDB);
            setQueue((prev) => [...prev, newRequest]);
          } else if (payload.eventType === 'DELETE') {
            setQueue((prev) => prev.filter((r) => r.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            const updated = dbToSongRequest(payload.new as SongRequestDB);
            setQueue((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchQueue]);

  // Add song request
  const addRequest = async (
    user: User,
    mode: SongMode,
    songTitle: string,
    artist: string,
    duetPartner?: User
  ): Promise<boolean> => {
    if (!isSupabaseConfigured) {
      setError('Database tidak terkonfigurasi');
      return false;
    }

    try {
      const { error } = await supabase.from('song_requests').insert({
        id: Date.now().toString(),
        user_id: user.id,
        user_name: user.name,
        mode,
        duet_partner_id: duetPartner?.id,
        duet_partner_name: duetPartner?.name,
        song_title: songTitle,
        artist,
      });

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error adding request:', err);
      setError('Gagal menambah request');
      return false;
    }
  };

  // Remove song request
  const removeRequest = async (id: string): Promise<boolean> => {
    if (!isSupabaseConfigured) {
      setError('Database tidak terkonfigurasi');
      return false;
    }

    try {
      const { error } = await supabase
        .from('song_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Error removing request:', err);
      setError('Gagal menghapus request');
      return false;
    }
  };

  return {
    queue,
    loading,
    error,
    addRequest,
    removeRequest,
    refetch: fetchQueue,
  };
}

