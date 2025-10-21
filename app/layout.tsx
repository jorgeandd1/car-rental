import type { ReactNode } from 'react';
import '../styles/globals.css'; // ajusta la ruta si tu globals.css está en /app o /styles
import UserSwitcher from '../components/UserSwitcher'; // usa relativo por ahora

export const metadata = {
  title: 'RentACar - Demo',
  description: 'Prueba Técnica',
};

export default function RootLayout(
  { children }: Readonly<{ children: ReactNode }>
) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <h1 className="font-semibold">RentACar</h1>
            {/* selector de usuario */}
            <UserSwitcher />
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
