'use client';
import useSWR from 'swr';
const fetcher = (url:string)=>fetch(url).then(r=>r.json());
export default function MisReservas(){
  const userId = typeof document !== 'undefined'
    ? document.cookie.split('; ').find(c=>c.startsWith('userId='))?.split('=')[1]
    : undefined;
  const {data} = useSWR(userId ? `/api/reservas?usuario_id=${userId}` : null, fetcher);
  if(!userId) return <p>Selecciona un usuario arriba</p>;
  if(!data) return <p>Cargando...</p>;
  return (
    <div className="space-y-3">
      {data.map((r:any)=>(
        <div key={r.id} className="border rounded p-3 bg-white">
          <div className="font-medium">{r.autos?.marca} {r.autos?.modelo} ({r.autos?.placa})</div>
          <div className="text-sm">Del {r.fecha_inicio} al {r.fecha_fin}</div>
          <div className="font-semibold">Total: $ {Number(r.total).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
