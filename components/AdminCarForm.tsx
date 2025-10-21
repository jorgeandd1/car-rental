'use client';
import { useForm } from 'react-hook-form';
export default function AdminCarForm({onSaved}:{onSaved:()=>void}){
  const {register, handleSubmit, reset, formState:{isSubmitting}} = useForm();
  async function onSubmit(v:any){
    await fetch('/api/cars',{method:'POST',headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ ...v, precio_por_dia: Number(v.precio_por_dia), disponible:true })});
    reset(); onSaved();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border rounded p-4 flex flex-wrap gap-3">
      <input {...register('marca')} placeholder="Marca" className="border rounded px-2 py-1" />
      <input {...register('modelo')} placeholder="Modelo" className="border rounded px-2 py-1" />
      <input {...register('placa')}  placeholder="Placa"  className="border rounded px-2 py-1" />
      <input type="number" {...register('precio_por_dia')} placeholder="Precio día" className="border rounded px-2 py-1" />
      <button disabled={isSubmitting} className="bg-black text-white px-3 py-1 rounded">Crear</button>
    </form>
  );
}
