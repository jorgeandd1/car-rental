'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  fecha_inicio: z.string().min(1, 'Selecciona la fecha de inicio'),
  fecha_fin: z.string().min(1, 'Selecciona la fecha de fin'),
});
type FormValues = z.infer<typeof schema>;

export default function ReserveForm({
  car,
  
  onSuccess,
}: {
  car: any;
  onSuccess?: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      fecha_inicio: car?.reservado_inicio ?? '',
      fecha_fin: car?.reservado_fin ?? '',
    },
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  // ---- Toast ----
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (m: string) => {
    setToastMsg(m);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // helpers
  const formatCOP = (v: number) =>
    v.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

  // días incluidos (ej. 21→23 = 3 días)
  const diffDaysInclusive = (ini: string, fin: string) => {
    const d1 = new Date(ini + 'T00:00:00');
    const d2 = new Date(fin + 'T00:00:00');
    const ms = d2.getTime() - d1.getTime();
    const days = Math.floor(ms / 86400000) + 1;
    return Math.max(days, 0);
  };

  // Sincroniza fechas cuando el auto ya está reservado y SWR refresca
  useEffect(() => {
    if (car?.reservado_inicio) setValue('fecha_inicio', car.reservado_inicio);
    if (car?.reservado_fin) setValue('fecha_fin', car.reservado_fin);
  }, [car?.reservado_inicio, car?.reservado_fin, setValue]);

  const disabled = !car.disponible || isSubmitting;

  function onInvalid() {
    showToast('Necesitas asignar las fechas para reservar');
  }

  async function onValid(values: FormValues) {
    if (!car.disponible) {
      showToast('Este auto ya no está disponible');
      return;
    }
    const userId = document.cookie
      .split('; ')
      .find((c) => c.startsWith('userId='))?.split('=')[1];
    if (!userId) {
      showToast('Selecciona un usuario arriba');
      return;
    }

    // Pre-calcula por si el backend no regresa total
    const dias = diffDaysInclusive(values.fecha_inicio, values.fecha_fin);
    const totalCalc = dias * Number(car.precio_por_dia || 0);

    const res = await fetch('/api/reservas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, usuario_id: userId, auto_id: car.id }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.error || 'Error al crear la reserva');
      return;
    }

    // Usa el total del backend si viene; si no, el calculado
    const total = typeof data?.total === 'number' ? data.total : totalCalc;

    showToast(
      `Reserva creada correctamente ✅\n` +
      `Total: ${formatCOP(total)} (${dias} ${dias === 1 ? 'día' : 'días'} × ${formatCOP(Number(car.precio_por_dia))}/día)`
    );

    onSuccess?.();
  }

  return (
    <>
      {/* Toast global (más grande y legible) */}
      {toastMsg && (
        <div
          className="fixed top-5 right-5 z-50
                     bg-slate-900 text-white text-base font-medium
                     px-6 py-3 rounded-xl shadow-2xl whitespace-pre-line
                     max-w-sm leading-snug border border-slate-700 animate-fadeIn"
        >
          {toastMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onValid, onInvalid)} className="flex gap-2 items-end" noValidate>
        <label className="text-sm">
          Inicio
          <input
            type="date"
            {...register('fecha_inicio')}
            disabled={disabled}
            className="border rounded px-2 py-1 ml-1 disabled:bg-slate-100 cursor-pointer disabled:cursor-not-allowed"
          />
        </label>

        <label className="text-sm">
          Fin
          <input
            type="date"
            {...register('fecha_fin')}
            disabled={disabled}
            className="border rounded px-2 py-1 ml-1 disabled:bg-slate-100 cursor-pointer disabled:cursor-not-allowed"
          />
        </label>

        <button
          disabled={disabled}
          className="bg-black text-white px-3 py-2 rounded
                     cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
                     hover:bg-black/90"
          title={disabled ? 'No disponible' : 'Reservar'}
        >
          {isSubmitting ? 'Guardando...' : car.disponible ? 'Reservar' : 'Reservado'}
        </button>
      </form>
    </>
  );
}
