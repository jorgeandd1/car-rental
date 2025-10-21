import { Reserva, UUID } from "../../domain/types";
import { supabaseAdmin } from "../supabase";

export async function createReserva(
  input: Omit<Reserva, "id" | "total" | "created_at"> & { total: number }
) {
  const { data, error } = await supabaseAdmin
    .from("reservas")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data as Reserva;
}
export async function listReservasByUsuario(usuarioId: UUID) {
  const { data, error } = await supabaseAdmin
    .from("reservas")
    .select("*, autos(*)")
    .eq("usuario_id", usuarioId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
