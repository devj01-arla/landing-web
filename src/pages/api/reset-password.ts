// src/pages/api/reset-password.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { query } from '../../lib/db';
import bcrypt from 'bcryptjs';

interface ResetTokenRow {
  id: number;
  cliente_id: number;
  token: string;
  expires_at: Date | string;
  used: number;
  created_at: Date | string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      return new Response(
        JSON.stringify({ message: 'Token y contraseña son obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (password.length < 8) {
      return new Response(
        JSON.stringify({
          message: 'La contraseña debe tener al menos 8 caracteres.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1) Buscar el token
    const tokenResult = await query<ResetTokenRow>(
      `SELECT id, cliente_id, token, expires_at, used, created_at
       FROM tbl_password_reset_tokens
       WHERE token = ?
       LIMIT 1`,
      [token]
    );

    if (tokenResult.rows.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Enlace inválido o ya utilizado.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const tokenRow = tokenResult.rows[0];

    const now = new Date();
    const expiresAt = new Date(tokenRow.expires_at);

    if (tokenRow.used || expiresAt.getTime() < now.getTime()) {
      return new Response(
        JSON.stringify({ message: 'Enlace inválido o expirado.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2) Actualizar contraseña del usuario
    const passwordHash = await bcrypt.hash(password, 10);

    await query(
      `UPDATE tbl_clientes
       SET password = ?, fecha_modificacion = NOW()
       WHERE id = ?`,
      [passwordHash, tokenRow.cliente_id]
    );

    // 3) Marcar token como usado
    await query(
      `UPDATE tbl_password_reset_tokens
       SET used = 1
       WHERE id = ?`,
      [tokenRow.id]
    );

    return new Response(
      JSON.stringify({ message: 'Contraseña actualizada correctamente.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[RESET_PASSWORD_ERROR]', error);
    return new Response(
      JSON.stringify({ message: 'Error al restablecer la contraseña.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
