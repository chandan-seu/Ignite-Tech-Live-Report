import { useState, useEffect } from 'react';
import { Entry, Status } from '../types';
import { INITIAL_ENTRIES } from '../constants';
import { supabase } from '../lib/supabase';

export const useEntries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const { data, error } = await supabase
          .from('entries')
          .select('*')
          .order('timestamp', { ascending: false });

        if (error) throw error;

        console.log('Fetched entries from Supabase:', data);

        if (data && data.length > 0) {
          setEntries(data.map(item => ({
            id: item.id,
            maskedId: item.masked_id,
            status: item.status as Status,
            agent: item.agent,
            reason: item.reason,
            timestamp: item.timestamp
          })));
        } else {
          // If no data in Supabase, use initial entries but don't save them yet
          setEntries(INITIAL_ENTRIES);
        }
      } catch (err) {
        console.error('Error fetching entries:', err);
        setEntries(INITIAL_ENTRIES);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();

    // Set up real-time subscription
    const channel = supabase
      .channel('entries_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'entries' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newEntry: Entry = {
              id: payload.new.id,
              maskedId: payload.new.masked_id,
              status: payload.new.status as Status,
              agent: payload.new.agent,
              reason: payload.new.reason,
              timestamp: payload.new.timestamp
            };
            setEntries((prev) => [newEntry, ...prev.filter(e => e.id !== newEntry.id)]);
          } else if (payload.eventType === 'UPDATE') {
            setEntries((prev) =>
              prev.map((entry) =>
                entry.id === payload.new.id
                  ? {
                      ...entry,
                      maskedId: payload.new.masked_id,
                      status: payload.new.status as Status,
                      agent: payload.new.agent,
                      reason: payload.new.reason,
                      timestamp: payload.new.timestamp
                    }
                  : entry
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setEntries((prev) => prev.filter((entry) => entry.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addEntry = async (entry: Omit<Entry, 'id' | 'timestamp'>) => {
    const timestamp = Date.now();
    const { error } = await supabase
      .from('entries')
      .insert([
        {
          masked_id: entry.maskedId,
          status: entry.status,
          agent: entry.agent,
          reason: entry.reason,
          timestamp: timestamp
        }
      ]);

    if (error) {
      console.error('Error adding entry:', error);
      // Fallback to local state if Supabase fails
      const newEntry: Entry = {
        ...entry,
        id: Math.random().toString(36).substr(2, 9),
        timestamp,
      };
      setEntries((prev) => [newEntry, ...prev]);
    }
  };

  const updateEntry = async (id: string, updatedFields: Partial<Entry>) => {
    const { error } = await supabase
      .from('entries')
      .update({
        masked_id: updatedFields.maskedId,
        status: updatedFields.status,
        agent: updatedFields.agent,
        reason: updatedFields.reason,
        timestamp: updatedFields.timestamp // Keep original timestamp unless explicitly updated
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating entry:', error);
      // Fallback to local state
      setEntries((prev) =>
        prev.map((entry) => (entry.id === id ? { ...entry, ...updatedFields } : entry))
      );
    }
  };

  const deleteEntry = async (id: string) => {
    const { error } = await supabase
      .from('entries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting entry:', error);
      // Fallback to local state
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  return { entries, loading, addEntry, updateEntry, deleteEntry };
};
