// lib/repos/carsRepo.ts
import { supabaseAdmin } from '../supabase';
import { Auto } from '@/domain/types';

type AutoWithLast = Auto & {
  reservado_por?: string | null;
  reservado_inicio?: string | null;
  reservado_fin?: string | null;
};

export async function listAllCars(): Promise<AutoWithLast[]> {
  const { data, error } = await supabaseAdmin
    .from('autos_with_last_reservation') // ← VISTA, no tabla
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as AutoWithLast[];
}

export async function listAvailableCars(): Promise<AutoWithLast[]> {
  const { data, error } = await supabaseAdmin
    .from('autos_with_last_reservation') // ← VISTA, no tabla
    .select('*')
    .eq('disponible', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as AutoWithLast[];
}
