// src/pages/api/verify-email.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { query } from '../../lib/db';
import { signAuthToken } from '../../lib/auth';
import type { ClienteRow } from '../../types/cliente';

interface TokenRow {
  id: number;
  cliente_id: number;
  token: string;
  expires_at: Date | string;
  used: number;
  created_at: Date | string;
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return new Response('Token de verificación faltante.', {
        status: 400,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // 1) Buscar el token y el cliente
    const tokenResult = await query<TokenRow>(
      `SELECT id, cliente_id, token, expires_at, used, created_at
       FROM tbl_email_verification_tokens
       WHERE token = ?
       LIMIT 1`,
      [token]
    );

    if (tokenResult.rows.length === 0) {
      return new Response('Enlace de verificación inválido o ya utilizado.', {
        status: 400,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const tokenRow = tokenResult.rows[0];

    // 2) Validar expiración
    const now = new Date();
    const expiresAt = new Date(tokenRow.expires_at);

    if (tokenRow.used || expiresAt.getTime() < now.getTime()) {
      return new Response('Enlace de verificación inválido o expirado.', {
        status: 400,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // 3) Obtener el cliente
    const clienteResult = await query<ClienteRow>(
      `SELECT id, empresa, correo, password, activo, fecha_registro, fecha_modificacion
       FROM tbl_clientes
       WHERE id = ?
       LIMIT 1`,
      [tokenRow.cliente_id]
    );

    if (clienteResult.rows.length === 0) {
      return new Response('El usuario asociado a este token no existe.', {
        status: 400,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const cliente = clienteResult.rows[0];

    // 4) Activar la cuenta y marcar token como usado
    await query(
      `UPDATE tbl_clientes
       SET activo = 1, fecha_modificacion = NOW()
       WHERE id = ?`,
      [cliente.id]
    );

    await query(
      `UPDATE tbl_email_verification_tokens
       SET used = 1
       WHERE id = ?`,
      [tokenRow.id]
    );

    // 5) Crear JWT y cookie de sesión
    const jwtToken = signAuthToken({
      id: cliente.id,
      empresa: cliente.empresa,
      correo: cliente.correo,
    });

    const isProd = import.meta.env.PROD;
    const cookie = [
      `auth_token=${jwtToken}`,
      'Path=/', // toda la app
      'HttpOnly',
      'SameSite=Lax',
      isProd ? 'Secure' : null,
      'Max-Age=86400', // 1 día
    ]
      .filter(Boolean)
      .join('; ');

    // 6) Redirigir a la página intermedia de cuenta verificada (NO directo al panel)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/cuenta-verificada',
        'Set-Cookie': cookie,
      },
    });
  } catch (error) {
    console.error('[VERIFY_EMAIL_ERROR]', error);
    return new Response('Error al verificar el correo.', {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
};
