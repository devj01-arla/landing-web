// src/pages/api/forgot-password.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { query } from '../../lib/db';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '../../lib/email';
import type { ClienteRow } from '../../types/cliente';

const PASSWORD_RESET_HOURS = Number(
  import.meta.env.PASSWORD_RESET_HOURS ??
    process.env.PASSWORD_RESET_HOURS ??
    1
);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ message: 'El correo es obligatorio.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Buscamos el usuario por correo
    const result = await query<ClienteRow>(
      `SELECT id, empresa, correo, activo, fecha_registro, fecha_modificacion
       FROM tbl_clientes
       WHERE correo = ?
       LIMIT 1`,
      [email]
    );

    // Respuesta genérica siempre, pero si existe generamos el token
    if (result.rows.length > 0) {
      const user = result.rows[0];

      // opcional: solo generamos token si el usuario está activo
      if (user.activo) {
        const token = crypto.randomBytes(32).toString('hex');

        const expiresAt = new Date(
          Date.now() + PASSWORD_RESET_HOURS * 60 * 60 * 1000
        );

        await query(
          `INSERT INTO tbl_password_reset_tokens (cliente_id, token, expires_at)
           VALUES (?, ?, ?)`,
          [user.id, token, expiresAt]
        );

        const baseUrl =
          import.meta.env.SITE_URL ??
          process.env.SITE_URL ??
          'http://localhost:4321';
        const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(
          token
        )}`;

        await sendPasswordResetEmail({
          to: user.correo,
          empresa: user.empresa,
          resetUrl,
        });
      }
    }

    return new Response(
      JSON.stringify({
        message:
          'Si el correo existe en nuestro sistema, se ha enviado un enlace para restablecer la contraseña.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[FORGOT_PASSWORD_ERROR]', error);
    return new Response(
      JSON.stringify({ message: 'Error al procesar la solicitud.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
