import { supabase } from '../lib/supabase';
import type { DisneyMovie } from '../types/movie';

export async function fetchMovies(): Promise<DisneyMovie[]> {
  const { data, error } = await supabase
    .from('disney_movies')
    .select('*')
    .order('year', { ascending: false });

  if (error) {
    console.error('Error fetching movies:', error);
    return [];
  }

  return data || [];
}
