// src/lib/db.ts
// Conexión directa a PostgreSQL usando pg (para queries SQL directas y creación de tablas)
import pg from 'pg';
const { Pool } = pg;

// Construir configuración de conexión desde variables de entorno
// Compatible con Vercel y servicios que proporcionan DATABASE_URL o variables individuales
function getConnectionConfig(): pg.PoolConfig {
  // Si tenemos DATABASE_URL (como Vercel Postgres, Prisma Postgres, etc.)
  const databaseUrl = import.meta.env.DATABASE_URL ?? process.env.DATABASE_URL;
  
  if (databaseUrl && (databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://'))) {
    // pg.Pool acepta directamente la URL de conexión
    return {
      connectionString: databaseUrl,
      ssl: databaseUrl.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
    };
  }
  
  // Fallback a variables individuales (compatible con PostgreSQL tradicional)
  return {
    host: import.meta.env.DB_HOST ?? process.env.DB_HOST,
    port: Number(import.meta.env.DB_PORT ?? process.env.DB_PORT ?? 5432),
    user: import.meta.env.DB_USER ?? process.env.DB_USER,
    password: import.meta.env.DB_PASSWORD ?? process.env.DB_PASSWORD,
    database: import.meta.env.DB_NAME ?? process.env.DB_NAME,
    ssl: import.meta.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  };
}

const pool = new Pool(getConnectionConfig());

// 👇 Versión simple, tipo genérico compatible con PostgreSQL
// Útil para queries SQL directas y creación de tablas manualmente
// Convierte placeholders ? a $1, $2, $3 que PostgreSQL requiere
export async function query<T = any>(
  sql: string,
  params: any[] = []
): Promise<{ rows: T[] }> {
  // Convertir placeholders ? a $1, $2, $3 para PostgreSQL
  let paramIndex = 1;
  const convertedSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
  
  // Debug (temporal para identificar el problema)
  console.log('[DB Query]', convertedSql.replace(/\s+/g, ' ').trim());
  console.log('[DB Params]', params);
  console.log('[DB Params Count]', params.length);
  console.log('[Placeholders in SQL]', (sql.match(/\?/g) || []).length);
  
  try {
    const result = await pool.query(convertedSql, params);
    return { rows: result.rows as T[] };
  } catch (error: any) {
    console.error('[DB Error Details]', {
      sql: convertedSql.replace(/\s+/g, ' ').trim(),
      params,
      errorCode: error.code,
      errorMessage: error.message,
      errorPosition: error.position
    });
    throw error;
  }
}

// Función para obtener una conexión directa (útil para transacciones o DDL)
export async function getConnection() {
  const config = getConnectionConfig();
  const client = new pg.Client(config);
  await client.connect();
  return client;
}
