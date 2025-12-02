// src/lib/email.ts
import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY =
  import.meta.env.SENDGRID_API_KEY ?? process.env.SENDGRID_API_KEY;
const SENDGRID_FROM =
  import.meta.env.SENDGRID_FROM ?? process.env.SENDGRID_FROM;

// Tiempo de expiración de verificación (horas)
const EMAIL_VERIFICATION_EXPIRES_HOURS = Number(
  import.meta.env.EMAIL_VERIFICATION_EXPIRES_HOURS ??
    process.env.EMAIL_VERIFICATION_EXPIRES_HOURS ??
    24
);

// Tiempo de expiración de reset password (horas)
const PASSWORD_RESET_EXPIRES_HOURS = Number(
  import.meta.env.PASSWORD_RESET_EXPIRES_HOURS ??
    process.env.PASSWORD_RESET_EXPIRES_HOURS ??
    1
);

if (!SENDGRID_API_KEY) {
  console.warn(
    '[EMAIL] SENDGRID_API_KEY no está definido. No se podrán enviar correos.'
  );
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

if (!SENDGRID_FROM) {
  console.warn(
    '[EMAIL] SENDGRID_FROM no está definido. Usa un remitente válido en producción.'
  );
}

interface SendVerificationEmailOptions {
  to: string;
  empresa: string;
  verificationUrl: string;
}

export async function sendVerificationEmail(
  opts: SendVerificationEmailOptions
) {
  if (!SENDGRID_API_KEY || !SENDGRID_FROM) {
    console.error('[EMAIL] Falta configuración de SendGrid.');
    throw new Error('Configuración de correo incompleta');
  }

  const msg = {
    to: opts.to,
    from: SENDGRID_FROM,
    subject: 'Verifica tu cuenta - Arla & Asociados',
    html: `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827;">
        <h1 style="font-size: 20px; margin-bottom: 16px;">Hola, ${opts.empresa}</h1>
        <p style="margin-bottom: 12px;">
          Gracias por registrarte en <strong>Arla & Asociados</strong>.
        </p>
        <p style="margin-bottom: 12px;">
          Para activar tu cuenta, por favor haz clic en el siguiente botón:
        </p>
        <p style="margin: 24px 0;">
          <a href="${opts.verificationUrl}"
            target="_blank"
            rel="noopener noreferrer"
            style="display: inline-block; padding: 10px 18px; background-color: #2563EB; color: #fff; text-decoration: none; border-radius: 9999px;">
            Verificar mi cuenta
          </a>
        </p>
        <p style="font-size: 12px; color: #6B7280;">
          Si el botón no funciona, copia y pega este enlace en tu navegador:
          <br/>
          <span style="word-break: break-all;">${opts.verificationUrl}</span>
        </p>
        <p style="margin-top: 16px; font-size: 12px; color: #6B7280;">
          Este enlace expirará en ${EMAIL_VERIFICATION_EXPIRES_HOURS} hora(s).
        </p>
      </div>
    `,
  };

  await sgMail.send(msg);
}

interface SendPasswordResetEmailOptions {
  to: string;
  empresa: string;
  resetUrl: string;
}

export async function sendPasswordResetEmail(
  opts: SendPasswordResetEmailOptions
) {
  if (!SENDGRID_API_KEY || !SENDGRID_FROM) {
    console.error(
      '[EMAIL] Falta configuración de SendGrid para reset password.'
    );
    throw new Error('Configuración de correo incompleta');
  }

  const msg = {
    to: opts.to,
    from: SENDGRID_FROM,
    subject: 'Restablecer contraseña - Arla & Asociados',
    html: `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827;">
        <h1 style="font-size: 20px; margin-bottom: 16px;">Hola, ${opts.empresa}</h1>
        <p style="margin-bottom: 12px;">
          Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en
          <strong>Arla & Asociados</strong>.
        </p>
        <p style="margin-bottom: 12px;">
          Si fuiste tú, haz clic en el siguiente botón para crear una nueva contraseña:
        </p>
        <p style="margin: 24px 0;">
          <a href="${opts.resetUrl}"
            target="_blank"
            rel="noopener noreferrer"
            style="display: inline-block; padding: 10px 18px; background-color: #2563EB; color: #fff; text-decoration: none; border-radius: 9999px;">
            Restablecer contraseña
          </a>
        </p>
        <p style="font-size: 12px; color: #6B7280;">
          Si el botón no funciona, copia y pega este enlace en tu navegador:
          <br/>
          <span style="word-break: break-all;">${opts.resetUrl}</span>
        </p>
        <p style="margin-top: 16px; font-size: 12px; color: #6B7280;">
          Este enlace expirará en ${PASSWORD_RESET_EXPIRES_HOURS} hora(s). Si no fuiste tú, puedes ignorar este correo.
        </p>
      </div>
    `,
  };

  await sgMail.send(msg);
}
