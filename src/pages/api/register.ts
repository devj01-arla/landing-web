// src/pages/api/register.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { prisma } from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendVerificationEmail } from '../../lib/email';

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
      // Verificar conexión y que las tablas existan
      await prisma.$connect();
      
      // 1) Insertar cliente como INACTIVO (activo = 0) usando Prisma
      const cliente = await prisma.cliente.create({
        data: {
          empresa: companyName,
          correo: email,
          password: passwordHash,
          activo: 0,
        },
        select: {
          id: true,
          empresa: true,
          correo: true,
          activo: true,
          fecha_registro: true,
          fecha_modificacion: true,
        },
      });

      // 2) Generar token de verificación
      const token = crypto.randomBytes(32).toString('hex');

      // 3) Calcular fecha de expiración
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + EMAIL_VERIFICATION_EXPIRES_HOURS);

      // 4) Guardar token en BD usando Prisma
      await prisma.emailVerificationToken.create({
        data: {
          cliente_id: cliente.id,
          token: token,
          expires_at: expiresAt,
          used: 0,
        },
      });

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
      // Prisma lanza P2002 para violación de constraint único
      if (err.code === 'P2002') {
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
