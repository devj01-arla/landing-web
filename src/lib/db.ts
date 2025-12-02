// src/lib/db.ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: import.meta.env.DB_HOST ?? process.env.DB_HOST,
  port: Number(import.meta.env.DB_PORT ?? process.env.DB_PORT ?? 3306),
  user: import.meta.env.DB_USER ?? process.env.DB_USER,
  password: import.meta.env.DB_PASSWORD ?? process.env.DB_PASSWORD,
  database: import.meta.env.DB_NAME ?? process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 👇 Versión simple, tipo genérico pero sin pelear con mysql2
export async function query<T = any>(
  sql: string,
  params: any[] = []
): Promise<{ rows: T[] }> {
  const [rows] = await pool.execute(sql, params);
  return { rows: rows as T[] };
}
