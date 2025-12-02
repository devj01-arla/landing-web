// src/pages/api/login.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { query } from '../../lib/db';
import bcrypt from 'bcryptjs';
import type { ClienteRow } from '../../types/cliente';
import { signAuthToken } from '../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validación básica de campos vacíos
    if (!username || !password) {
      return new Response(
        JSON.stringify({ message: 'Usuario/Email y contraseña son obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const isEmail = username.includes('@');

    const result = await query<ClienteRow>(
      isEmail
        ? `SELECT id, empresa, correo, password, activo, fecha_registro, fecha_modificacion
           FROM tbl_clientes
           WHERE correo = ?
           LIMIT 1`
        : `SELECT id, empresa, correo, password, activo, fecha_registro, fecha_modificacion
           FROM tbl_clientes
           WHERE empresa = ?
           LIMIT 1`,
      [username]
    );

    // Mensaje genérico si no hay usuario
    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Usuario o contraseña incorrectos.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = result.rows[0];

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      // Mensaje genérico también cuando la contraseña no coincide
      return new Response(
        JSON.stringify({ message: 'Usuario o contraseña incorrectos.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verificar si está activo
    if (!user.activo) {
      return new Response(
        JSON.stringify({
          message:
            'Tu cuenta aún no ha sido verificada. Revisa tu correo para activarla.',
        }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Creamos el JWT
    const token = signAuthToken({
      id: user.id,
      empresa: user.empresa,
      correo: user.correo,
    });

    const isProd = import.meta.env.PROD;
    const cookie = [
      `auth_token=${token}`,
      'Path=/', // toda la app
      'HttpOnly',
      'SameSite=Lax',
      isProd ? 'Secure' : null,
      'Max-Age=86400', // 1 día
    ]
      .filter(Boolean)
      .join('; ');

    return new Response(
      JSON.stringify({
        message: 'Login exitoso',
        userId: user.id,
        empresa: user.empresa,
        correo: user.correo,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookie,
        },
      }
    );
  } catch (error) {
    console.error('[LOGIN_ERROR]', error);
    return new Response(
      JSON.stringify({ message: 'Error al iniciar sesión.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
