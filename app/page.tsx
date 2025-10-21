'use client';
import useSWR from 'swr';
import CarCard from '@/components/CarCard';
import ReserveForm from '@/components/ReserveForm';

const fetcher = (url:string)=>fetch(url).then(r=>r.json());

export default function Home(){
  const {data: cars, mutate} = useSWR('/api/cars', fetcher);
  if(!cars) return <p>Cargando...</p>;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {cars.map((car:any)=>(
        <div key={car.id} className="border rounded-xl p-4 bg-white opacity-100">
          <CarCard car={car} />
          <ReserveForm car={car} onSuccess={mutate}/>
        </div>
      ))}
    </div>
  );
}
