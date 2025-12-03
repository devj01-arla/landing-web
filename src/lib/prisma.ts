// src/lib/prisma.ts
// Cliente de Prisma para usar como ORM
import { PrismaClient } from '@prisma/client';

// Construir DATABASE_URL desde variables de entorno si no existe
function getDatabaseUrl(): string | undefined {
  // Si DATABASE_URL ya existe, usarla
  const databaseUrl = import.meta.env.DATABASE_URL ?? process.env.DATABASE_URL;
  if (databaseUrl) {
    return databaseUrl;
  }
  
  // Si no, construir desde variables individuales
  const host = import.meta.env.DB_HOST ?? process.env.DB_HOST;
  const port = import.meta.env.DB_PORT ?? process.env.DB_PORT ?? '5432';
  const user = import.meta.env.DB_USER ?? process.env.DB_USER;
  const password = import.meta.env.DB_PASSWORD ?? process.env.DB_PASSWORD;
  const database = import.meta.env.DB_NAME ?? process.env.DB_NAME;
  const ssl = import.meta.env.DB_SSL === 'true' ? '?sslmode=require' : '';
  
  if (host && user && database) {
    return `postgres://${user}:${password ? encodeURIComponent(password) : ''}@${host}:${port}/${database}${ssl}`;
  }
  
  return undefined;
}

// Configurar DATABASE_URL en process.env si no existe (Prisma lo lee de ahí)
const databaseUrl = getDatabaseUrl();
if (databaseUrl && !process.env.DATABASE_URL) {
  process.env.DATABASE_URL = databaseUrl;
}

// Singleton pattern para evitar múltiples instancias en desarrollo
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

