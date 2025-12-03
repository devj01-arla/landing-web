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

// Configurar DATABASE_URL
const databaseUrl = getDatabaseUrl();
if (databaseUrl && !process.env.DATABASE_URL) {
  process.env.DATABASE_URL = databaseUrl;
}

// Singleton pattern para evitar múltiples instancias en desarrollo
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Configuración de Prisma Client para Prisma 7
const prismaConfig: any = {
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
};

// Prisma 7 requiere adapter o accelerateUrl
if (databaseUrl) {
  // Si es una URL de Prisma Accelerate, usar accelerateUrl
  if (databaseUrl.startsWith('prisma+')) {
    prismaConfig.accelerateUrl = databaseUrl;
  } else {
    // Si no, usar adapter con la URL
    prismaConfig.adapter = {
      url: databaseUrl,
    };
  }
} else if (process.env.DATABASE_URL) {
  // Si DATABASE_URL está en process.env, usar adapter
  if (process.env.DATABASE_URL.startsWith('prisma+')) {
    prismaConfig.accelerateUrl = process.env.DATABASE_URL;
  } else {
    prismaConfig.adapter = {
      url: process.env.DATABASE_URL,
    };
  }
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient(prismaConfig);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

