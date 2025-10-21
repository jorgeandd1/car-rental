import { NextResponse } from 'next/server';
import { listAllCars } from '@/lib/repos/carsRepo';

export async function GET() {
  try {
    const cars = await listAllCars(); // ← importante
    return NextResponse.json(cars);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
