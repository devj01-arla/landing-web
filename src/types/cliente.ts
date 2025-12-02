// src/types/cliente.ts
export interface ClienteRow {
  id: number;
  empresa: string;
  correo: string;
  password: string;            // hash
  activo: number;              // 0 = inactivo, 1 = activo
  fecha_registro: Date | string;
  fecha_modificacion: Date | string;
}
