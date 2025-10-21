export type UUID = string;

export interface Usuario {
  id: UUID;
  nombre: string;
}
export interface Auto {
  id: UUID;
  marca: string;
  modelo: string;
  placa: string;
  precio_por_dia: number;
  disponible: boolean;
  created_at?: string;
}
export interface Reserva {
  id: UUID;
  usuario_id: UUID;
  auto_id: UUID;
  fecha_inicio: string;
  fecha_fin: string;
  total: number;
  created_at?: string;
}
