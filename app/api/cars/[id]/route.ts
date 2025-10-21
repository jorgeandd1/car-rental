import { NextResponse } from "next/server";
import { deleteCar, updateCar } from "../../../../lib/repos/carsRepo";

export async function PUT(_: Request, { params }: { params: { id: string } }) {
  try {
    return NextResponse.json(await updateCar(params.id, await _.json()));
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteCar(params.id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
