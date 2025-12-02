export const prerender = false;

import type { APIRoute } from 'astro';
import { query } from '../../lib/db';
import crypto from 'crypto';
import { sendVerificationEmail } from '../../lib/email';
import type { ClienteRow } from '../../types/cliente';

interface VerificationTokenRow {
  id: number;
  cliente_id: number;
  token: string;
  created_at: Date | string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => null);
    const username = body?.username as string | undefined;

    if (!username) {
      return new Response(
        JSON.stringify({ message: 'Usuario o correo es obligatorio.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const isEmail = username.includes('@');

    // 1) Buscar cliente por correo o empresa
    const result = await query<ClienteRow>(
      isEmail
        ? `SELECT id, empresa, correo, activo, fecha_registro, fecha_modificacion
           FROM tbl_clientes
           WHERE correo = ?
           LIMIT 1`
        : `SELECT id, empresa, correo, activo, fecha_registro, fecha_modificacion
           FROM tbl_clientes
           WHERE empresa = ?
           LIMIT 1`,
      [username]
    );

    // Respuesta genérica si no existe
    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({
          message:
            'Si tu cuenta existe y no está verificada, hemos reenviado el correo de verificación.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cliente = result.rows[0];

    // Si ya está activo, no tiene sentido reenviar
    if (cliente.activo) {
      return new Response(
        JSON.stringify({
          message: 'Tu cuenta ya está verificada. Puedes iniciar sesión normalmente.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2) Chequear si ya se envió hace poco (rate limit, p.ej. 5 min)
    const lastTokenResult = await query<VerificationTokenRow>(
      `SELECT id, cliente_id, token, created_at
       FROM tbl_email_verification_tokens
       WHERE cliente_id = ?
       ORDER BY created_at DESC
       LIMIT 1`,
      [cliente.id]
    );

    if (lastTokenResult.rows.length > 0) {
      const lastCreatedAt = new Date(lastTokenResult.rows[0].created_at);
      const now = new Date();
      const diffMs = now.getTime() - lastCreatedAt.getTime();
      const diffMinutes = diffMs / (1000 * 60);

      if (diffMinutes < 5) {
        return new Response(
          JSON.stringify({
            message:
              'Ya hemos enviado un correo hace poco. Por favor, espera unos minutos antes de solicitar otro.',
          }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // 3) Generar nuevo token
    const token = crypto.randomBytes(32).toString('hex');

    // 4) Guardar token (expira en 24 horas; si lo tienes en .env, cámbialo aquí)
    await query(
      `INSERT INTO tbl_email_verification_tokens (cliente_id, token, expires_at)
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 DAY))`,
      [cliente.id, token]
    );

    // 5) Construir URL de verificación
    const baseUrl =
      import.meta.env.SITE_URL ?? process.env.SITE_URL ?? 'http://localhost:4321';

    const verificationUrl = `${baseUrl}/api/verify-email?token=${encodeURIComponent(
      token
    )}`;

    // 6) Enviar correo
    await sendVerificationEmail({
      to: cliente.correo,
      empresa: cliente.empresa,
      verificationUrl,
    });

    return new Response(
      JSON.stringify({
        message:
          'Hemos reenviado el correo de verificación. Revisa tu bandeja de entrada y carpeta de spam.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[RESEND_VERIFICATION_ERROR]', error);
    return new Response(
      JSON.stringify({ message: 'Error al reenviar el correo de verificación.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
