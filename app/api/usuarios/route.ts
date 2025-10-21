import { NextResponse } from "next/server";
import { listUsuarios } from "../../../lib/repos/usuariosRepo";
export async function GET() {
  return NextResponse.json(await listUsuarios());
}
