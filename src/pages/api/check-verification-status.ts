// src/pages/api/check-verification-status.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { query } from '../../lib/db';
import type { ClienteRow } from '../../types/cliente';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);
    const email = body?.email;

    if (!email) {
      return new Response(
        JSON.stringify({ message: 'El correo es obligatorio.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await query<ClienteRow>(
      `SELECT id, empresa, correo, activo
       FROM tbl_clientes
       WHERE correo = ?
       LIMIT 1`,
      [email]
    );

    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No encontramos un usuario con ese correo.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cliente = result.rows[0];

    return new Response(
      JSON.stringify({
        verified: cliente.activo === 1,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[CHECK_VERIFICATION_STATUS_ERROR]', error);
    return new Response(
      JSON.stringify({ message: 'Error al comprobar el estado de verificación.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
