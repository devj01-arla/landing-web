// src/pages/api/logout.ts
export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async () => {
  const isProd = import.meta.env.PROD;

  const cookie = [
    'auth_token=',
    'Path=/',        // mismo path que el login
    'HttpOnly',
    'SameSite=Lax',
    isProd ? 'Secure' : null,
    'Max-Age=0',     // borrar inmediatamente
  ]
    .filter(Boolean)
    .join('; ');

  return new Response(
    JSON.stringify({ message: 'Logout exitoso' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie,
      },
    }
  );
};
