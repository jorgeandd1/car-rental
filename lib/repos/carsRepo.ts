// lib/repos/carsRepo.ts
import { supabaseAdmin } from "../supabase";
import { Auto, UUID } from "@/domain/types";

/** Vista: autos + última reserva */
export type AutoWithLast = Auto & {
  reservado_por?: string | null;
  reservado_inicio?: string | null; // YYYY-MM-DD
  reservado_fin?: string | null;
};

/** LISTADOS (usan la VISTA) */
export async function listAllCars(): Promise<AutoWithLast[]> {
  const { data, error } = await supabaseAdmin
    .from("autos_with_last_reservation")
    .select("*");
  // .order('created_at', { ascending: false }) // opcional en la vista
  if (error) throw error;
  return data as AutoWithLast[];
}

export async function listAvailableCars(): Promise<AutoWithLast[]> {
  const { data, error } = await supabaseAdmin
    .from("autos_with_last_reservation")
    .select("*")
    .eq("disponible", true);
  if (error) throw error;
  return data as AutoWithLast[];
}

/** CRUD (operan sobre la TABLA autos) */
export async function createCar(input: {
  marca: string;
  modelo: string;
  placa: string;
  precio_por_dia: number;
  disponible?: boolean;
  imagen_url?: string | null;
}) {
  const { data, error } = await supabaseAdmin
    .from("autos")
    .insert({
      marca: input.marca,
      modelo: input.modelo,
      placa: input.placa,
      precio_por_dia: input.precio_por_dia,
      disponible: input.disponible ?? true,
      imagen_url: input.imagen_url ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data as Auto;
}

export async function updateCar(id: UUID, patch: Partial<Auto>) {
  const { data, error } = await supabaseAdmin
    .from("autos")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Auto;
}

export async function deleteCar(id: UUID) {
  const { error } = await supabaseAdmin.from("autos").delete().eq("id", id);
  if (error) throw error;
  return { ok: true };
}
