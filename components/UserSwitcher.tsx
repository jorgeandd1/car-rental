'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function getCookie(name: string) {
  const match = document.cookie.split('; ').find(c => c.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

export default function UserSwitcher() {
  const { data: users } = useSWR('/api/usuarios', fetcher);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const current = getCookie('userId');
    setSelected(current);
  }, []);

  useEffect(() => {
    if (users && users.length > 0 && !selected) {
      const first = users[0].id as string;
      document.cookie = `userId=${first}; path=/`;
      setSelected(first);
    }
  }, [users, selected]);

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    setSelected(val);
    document.cookie = `userId=${val}; path=/`;
    location.reload();
  }

  if (!users) return null;

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="user-select" className="text-sm text-slate-600">
        Seleccione el usuario
      </label>
      <select
        id="user-select"
        value={selected ?? ''}
        onChange={onChange}
        className="border rounded px-2 py-1 cursor-pointer"
        aria-label="Seleccionar usuario"
        title="Seleccionar usuario"
      >
        {users.map((u: any) => (
          <option key={u.id} value={u.id}>{u.nombre}</option>
        ))}
      </select>
    </div>
  );
}
