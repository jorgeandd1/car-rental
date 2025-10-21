import { supabaseAdmin } from "../supabase";
export async function listUsuarios() {
  const { data, error } = await supabaseAdmin
    .from("usuarios")
    .select("*")
    .order("nombre");
  if (error) throw error;
  return data;
}
