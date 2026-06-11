import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: Number(process.env.MAIL_PORT) === 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
})

type EmailContent = {
  title: string
  greeting: string
  body?: string
  ctaText: string
  ctaUrl: string
  footerNote?: string
}

function emailTemplate({ title, greeting, body, ctaText, ctaUrl, footerNote }: EmailContent): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background-color:#ffffff;border:1px solid #e4e4e7;border-radius:8px;">
          <tr>
            <td style="padding:40px;">
              <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:18px;font-weight:700;color:#09090b;">STUDIO</p>
              <hr style="border:none;border-top:1px solid #e4e4e7;margin:24px 0;" />
              <h1 style="margin:0 0 8px;font-size:20px;font-weight:600;color:#09090b;">${title}</h1>
              <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#71717a;">${greeting}</p>
              ${body ? `<p style="margin:-12px 0 24px;font-size:14px;line-height:1.6;color:#71717a;">${body}</p>` : ""}
              <a href="${ctaUrl}" style="display:block;text-align:center;background-color:#18181b;color:#ffffff;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:500;text-decoration:none;margin-bottom:24px;">${ctaText}</a>
              <hr style="border:none;border-top:1px solid #e4e4e7;margin:0 0 16px;" />
              <p style="margin:0 0 4px;font-size:12px;color:#71717a;">Si el botón no funciona, copia este enlace:</p>
              <p style="margin:0;font-size:12px;color:#71717a;word-break:break-all;">${ctaUrl}</p>
              <hr style="border:none;border-top:1px solid #e4e4e7;margin:24px 0 16px;" />
              ${footerNote ? `<p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:#a1a1aa;">${footerNote}</p>` : ""}
              <p style="margin:0;font-size:12px;color:#a1a1aa;">© 2026 STUDIO · Ecatepec, México</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function sendVerificationEmail(to: string, token: string, name?: string): Promise<void> {
  const url = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Verifica tu cuenta en STUDIO",
    html: emailTemplate({
      title: "Verifica tu correo",
      greeting: `Hola${name ? ` ${name}` : ""}, gracias por registrarte en STUDIO. Haz clic en el botón para verificar tu cuenta y comenzar.`,
      ctaText: "Verificar mi cuenta",
      ctaUrl: url,
      footerNote: "Este enlace expira en 24 horas. Si no creaste una cuenta en STUDIO, ignora este correo.",
    }),
  })
}

export async function sendPasswordResetEmail(to: string, token: string, name?: string): Promise<void> {
  const url = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Restablece tu contraseña de STUDIO",
    html: emailTemplate({
      title: "Restablecer contraseña",
      greeting: `Hola${name ? ` ${name}` : ""}, recibimos una solicitud para restablecer la contraseña de tu cuenta en STUDIO.`,
      ctaText: "Restablecer contraseña",
      ctaUrl: url,
      footerNote: "Este enlace expira en 1 hora. Si no solicitaste esto, ignora este correo. Tu contraseña no cambiará.",
    }),
  })
}

export async function sendWelcomeEmail(to: string, name?: string): Promise<void> {
  const url = `${process.env.NEXTAUTH_URL}/login`
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "¡Bienvenido a STUDIO!",
    html: emailTemplate({
      title: "Ya eres parte de STUDIO",
      greeting: `Hola${name ? ` ${name}` : ""}, tu cuenta ha sido verificada exitosamente. Ahora puedes iniciar sesión y explorar tu panel.`,
      ctaText: "Ir al dashboard",
      ctaUrl: url,
    }),
  })
}
