import { useState, useEffect } from 'react';
import { Entry } from '../types';
import { supabase } from '../supabaseClient';

export const useEntries = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching entries:', error);
    } else if (data) {
      const mappedData: Entry[] = data.map((item: any) => ({
        id: item.id,
        maskedId: item.maskedId,
        status: item.status,
        reason: item.reason,
        timestamp: new Date(item.created_at).getTime(),
      }));
      setEntries(mappedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();

    // Set up real-time subscription
    const subscription = supabase
      .channel('entries-realtime')
      .on('postgres_changes', { event: '*', table: 'entries', schema: 'public' }, () => {
        fetchEntries();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const addEntry = async (entry: Omit<Entry, 'id' | 'timestamp'>) => {
    const { error } = await supabase
      .from('entries')
      .insert([
        {
          maskedId: entry.maskedId,
          status: entry.status,
          reason: entry.reason,
        },
      ]);

    if (error) {
      console.error('Error adding entry:', error);
    }
  };

  const updateEntry = async (id: string, updatedFields: Partial<Entry>) => {
    const { error } = await supabase
      .from('entries')
      .update({
        maskedId: updatedFields.maskedId,
        status: updatedFields.status,
        reason: updatedFields.reason,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating entry:', error);
    }
  };

  const deleteEntry = async (id: string) => {
    const { error } = await supabase
      .from('entries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return { entries, addEntry, updateEntry, deleteEntry, loading };
};
