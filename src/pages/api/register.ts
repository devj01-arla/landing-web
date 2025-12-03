// src/pages/api/register.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { query } from '../../lib/db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendVerificationEmail } from '../../lib/email';
import type { ClienteRow } from '../../types/cliente';

const EMAIL_VERIFICATION_EXPIRES_HOURS = Number(
  import.meta.env.EMAIL_VERIFICATION_EXPIRES_HOURS ??
    process.env.EMAIL_VERIFICATION_EXPIRES_HOURS ??
    24
);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { companyName, email, password } = body;

    if (!companyName || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'Faltan campos obligatorios.' }),
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

    const passwordHash = await bcrypt.hash(password, 10);

    try {
      // 1) Insertar cliente como INACTIVO (activo = 0)
      await query(
        `INSERT INTO tbl_clientes (empresa, correo, password, activo, fecha_registro, fecha_modificacion)
         VALUES (?, ?, ?, 0, NOW(), NOW())`,
        [companyName, email, passwordHash]
      );

      // 2) Obtener el id del cliente recién creado
      const result = await query<ClienteRow>(
        `SELECT id, empresa, correo, activo, fecha_registro, fecha_modificacion
         FROM tbl_clientes
         WHERE correo = ?
         LIMIT 1`,
        [email]
      );

      if (result.rows.length === 0) {
        console.error(
          '[REGISTER] No se encontró el cliente después de insertarlo'
        );
        return new Response(
          JSON.stringify({
            message: 'Error interno al registrar el usuario.',
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const cliente = result.rows[0];

      // 3) Generar token de verificación
      const token = crypto.randomBytes(32).toString('hex');

      // 4) Guardar token en BD (expira en N horas)
      await query(
        `INSERT INTO tbl_email_verification_tokens (cliente_id, token, expires_at)
         VALUES (?, ?, NOW() + INTERVAL '${EMAIL_VERIFICATION_EXPIRES_HOURS} hours')`,
        [cliente.id, token]
      );

      // 5) Construir URL de verificación
      const baseUrl =
        import.meta.env.SITE_URL ??
        process.env.SITE_URL ??
        'http://localhost:4321';
      const verificationUrl = `${baseUrl}/api/verify-email?token=${encodeURIComponent(
        token
      )}`;

      // 6) Intentar enviar correo (si falla, no rompemos el registro)
      try {
        await sendVerificationEmail({
          to: cliente.correo,
          empresa: cliente.empresa,
          verificationUrl,
        });
      } catch (emailError) {
        console.error('[REGISTER_EMAIL_ERROR]', emailError);
        // No lanzamos error aquí para permitir que el usuario luego use "reenviar verificación"
      }

      // 7) Respuesta al frontend
      return new Response(
        JSON.stringify({
          message:
            'Registro exitoso. Revisa tu correo para activar tu cuenta. Si no lo recibes, podrás solicitar un reenvío desde el inicio de sesión.',
          email,
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (err: any) {
      // PostgreSQL usa código 23505 para violación de constraint único
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        return new Response(
          JSON.stringify({ message: 'El correo ya está registrado.' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }

      console.error('[REGISTER_ERROR]', err);
      return new Response(
        JSON.stringify({ message: 'Error al registrar.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('[REGISTER_JSON_ERROR]', error);
    return new Response(
      JSON.stringify({ message: 'JSON inválido.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
