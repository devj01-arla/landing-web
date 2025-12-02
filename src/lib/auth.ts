// src/lib/auth.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = import.meta.env.JWT_SECRET ?? process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

export interface JwtUserPayload {
  id: number;
  empresa: string;
  correo: string;
}

// Firma un token con los datos básicos del usuario
export function signAuthToken(user: JwtUserPayload): string {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: '1d', // 1 día
  });
}

// Verifica el token y devuelve el payload o null si es inválido/expirado
export function verifyAuthToken(token: string): JwtUserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtUserPayload;
  } catch (_err) {
    return null;
  }
}
