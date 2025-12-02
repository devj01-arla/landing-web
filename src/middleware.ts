// src/middleware.ts
import type { MiddlewareHandler } from 'astro';
import { verifyAuthToken } from './lib/auth';

const PROTECTED_PATHS = ['/panel'];

export const onRequest: MiddlewareHandler = async ({ request, redirect }, next) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // ¿Es una ruta protegida?
  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  if (!isProtected) {
    // Ruta pública
    return next();
  }

  // Leer cookies del header
  const cookieHeader = request.headers.get('cookie') ?? '';
  const cookies = Object.fromEntries(
    cookieHeader
      .split(';')
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => {
        const [name, ...rest] = c.split('=');
        return [name, rest.join('=')];
      })
  );

  const token = cookies['auth_token'];

  // Si no hay token -> login
  if (!token) {
    return redirect('/login');
  }

  // Verificar token
  const payload = verifyAuthToken(token);

  if (!payload) {
    return redirect('/login');
  }

  // Opcional: compartir el usuario con la app
  // (context.locals as any).user = payload;

  // Usuario OK, continuar
  return next();
};
