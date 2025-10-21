import { NextResponse } from "next/server";
import { createReserva } from "../../../lib/repos/reservasRepo";
import { calcularTotal } from "../../../domain/rules";
import { supabaseAdmin } from "../../../lib/supabase";

export async function POST(req: Request) {
  try {
    const { usuario_id, auto_id, fecha_inicio, fecha_fin } = await req.json();
    // obtener precio del auto
    const { data: auto, error } = await supabaseAdmin
      .from("autos")
      .select("precio_por_dia")
      .eq("id", auto_id)
      .single();
    if (error || !auto) throw new Error("Auto no encontrado");
    const total = calcularTotal(
      Number(auto.precio_por_dia),
      fecha_inicio,
      fecha_fin
    );
    const reserva = await createReserva({
      usuario_id,
      auto_id,
      fecha_inicio,
      fecha_fin,
      total,
    });
    return NextResponse.json(reserva, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const usuario_id = searchParams.get("usuario_id");
  if (!usuario_id)
    return NextResponse.json(
      { error: "usuario_id requerido" },
      { status: 400 }
    );
  const { data, error } = await supabaseAdmin
    .from("reservas")
    .select("*, autos(*)")
    .eq("usuario_id", usuario_id)
    .order("created_at", { ascending: false });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
