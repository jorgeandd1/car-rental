'use client';
import useSWR from 'swr';
import AdminCarForm from '../../../components/AdminCarForm';

const fetcher = (u:string)=>fetch(u).then(r=>r.json());

export default function AdminCars(){
  const {data: cars, mutate} = useSWR('/api/cars', fetcher);
  if(!cars) return <p>Cargando...</p>;
  return (
    <div className="space-y-6">
      <AdminCarForm onSaved={mutate}/>
      <table className="w-full text-sm bg-white border rounded">
        <thead><tr className="bg-slate-100">
          <th className="p-2">Marca</th><th>Modelo</th><th>Placa</th><th>$ Día</th><th>Disp.</th><th></th>
        </tr></thead>
        <tbody>
        {cars.map((c:any)=>(
          <tr key={c.id} className="border-t">
            <td className="p-2">{c.marca}</td><td>{c.modelo}</td><td>{c.placa}</td>
            <td>{Number(c.precio_por_dia).toLocaleString()}</td><td>{c.disponible ? 'Sí':'No'}</td>
            <td className="text-right pr-2">
              <button onClick={async()=>{await fetch(`/api/cars/${c.id}`,{method:'DELETE'}); mutate();}}
                className="text-red-600">Eliminar</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
