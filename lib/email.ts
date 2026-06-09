import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: Number(process.env.MAIL_PORT) === 465,
  ...(process.env.MAIL_USER
    ? { auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS } }
    : { ignoreTLS: true }),
})

function verificationTemplate(url: string, email: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0a0e1a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:48px 16px;">
      <table width="480" cellpadding="0" cellspacing="0"
        style="background:#1a1a2e;border:1px solid rgba(99,102,241,0.3);border-radius:12px;padding:32px;">
        <tr><td style="padding:32px;">
          <h1 style="color:#ffffff;font-size:20px;margin:0 0 12px;">Verifica tu cuenta</h1>
          <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.6;margin:0 0 28px;">
            Haz clic en el botón para verificar tu dirección de correo electrónico.
          </p>
          <a href="${url}"
            style="display:inline-block;background:#6366f1;color:#ffffff;padding:12px 32px;
                   border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;">
            Verificar cuenta
          </a>
          <p style="color:rgba(255,255,255,0.35);font-size:12px;margin:24px 0 0;">
            Este enlace expira en 24 horas.
          </p>
          <p style="color:rgba(255,255,255,0.25);font-size:11px;margin:8px 0 0;">
            ${email}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function resetTemplate(url: string, email: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0a0e1a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:48px 16px;">
      <table width="480" cellpadding="0" cellspacing="0"
        style="background:#1a1a2e;border:1px solid rgba(99,102,241,0.3);border-radius:12px;padding:32px;">
        <tr><td style="padding:32px;">
          <h1 style="color:#ffffff;font-size:20px;margin:0 0 12px;">Restablecer contraseña</h1>
          <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.6;margin:0 0 28px;">
            Recibimos una solicitud para restablecer tu contraseña.
          </p>
          <a href="${url}"
            style="display:inline-block;background:#6366f1;color:#ffffff;padding:12px 32px;
                   border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;">
            Restablecer contraseña
          </a>
          <p style="color:rgba(255,255,255,0.35);font-size:12px;margin:24px 0 0;">
            Este enlace expira en 1 hora. Si no solicitaste esto, ignora este email.
          </p>
          <p style="color:rgba(255,255,255,0.25);font-size:11px;margin:8px 0 0;">
            ${email}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendVerificationEmail(to: string, token: string): Promise<void> {
  const url = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Verifica tu cuenta — Estudio",
    html: verificationTemplate(url, to),
  })
}

export async function sendPasswordResetEmail(to: string, token: string): Promise<void> {
  const url = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Restablecer contraseña — Estudio",
    html: resetTemplate(url, to),
  })
}
