'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function CarCard({ car }: { car: any }) {
  const [imgError, setImgError] = useState(false);

  // Usa la URL guardada o una imagen local /public/cars/PLACA.jpg
  const src = car.imagen_url ?? `/cars/${car.placa}.jpg`;

  const fmt = (iso?: string | null) =>
    iso ? new Date(iso + 'T00:00:00').toLocaleDateString('es-CO') : '';

  return (
    <div className="mb-3">
      {/* Imagen a todo el ancho/alto del contenedor, sin textos encima */}
      <div className="mb-3 overflow-hidden rounded-lg border">
        {!imgError ? (
          <Image
            src={src}
            alt={`${car.marca} ${car.modelo}`}
            width={1600}
            height={900}
            className="w-full aspect-[16/9] object-cover"
            onError={() => setImgError(true)}
            priority={false}
          />
        ) : (
          // Fallback limpio, sin texto
          <div className="w-full aspect-[16/9] bg-slate-200" />
        )}
      </div>

      {/* Título + badge */}
      <div className="flex items-center gap-2">
        <div className="text-lg font-semibold">{car.marca} {car.modelo}</div>
        {car.disponible ? (
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Disponible</span>
        ) : (
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">No disponible</span>
        )}
      </div>

      <div className="text-sm text-slate-600">Placa {car.placa}</div>
      <div className="mt-1 font-medium">$ {Number(car.precio_por_dia).toLocaleString()} / día</div>

      {!car.disponible && (
        <div className="mt-2 text-sm text-slate-700 space-y-0.5">
          {car.reservado_por && (
            <div>Reservado por: <span className="font-medium">{car.reservado_por}</span></div>
          )}
        </div>
      )}
    </div>
  );
}
