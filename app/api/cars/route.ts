import { NextResponse } from 'next/server';
import { listAllCars, createCar } from '@/lib/repos/carsRepo';

export async function GET() {
  try {
    const cars = await listAllCars();
    return NextResponse.json(cars);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const car = await createCar({
      marca: body.marca,
      modelo: body.modelo,
      placa: body.placa,
      precio_por_dia: Number(body.precio_por_dia),
      disponible: body.disponible ?? true,
      imagen_url: body.imagen_url ?? null,
    });
    return NextResponse.json(car, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
