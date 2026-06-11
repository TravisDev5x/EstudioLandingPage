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

function emailLayout(opts: {
  heading: string
  greeting: string
  ctaLabel: string
  url: string
  footer: string
}): string {
  const { heading, greeting, ctaLabel, url, footer } = opts
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:48px 16px;">
      <table width="480" cellpadding="0" cellspacing="0"
        style="background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;">
        <tr><td style="padding:40px;">
          <p style="font-family:'Courier New',Courier,monospace;font-size:18px;font-weight:700;letter-spacing:0.05em;color:#111111;margin:0 0 32px;">
            STUDIO
          </p>
          <h1 style="color:#111111;font-size:20px;margin:0 0 12px;">${heading}</h1>
          <p style="color:#444444;font-size:14px;line-height:1.6;margin:0 0 28px;">
            ${greeting}
          </p>
          <a href="${url}"
            style="display:inline-block;background:#000000;color:#ffffff;padding:14px 32px;
                   border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
            ${ctaLabel}
          </a>
          <p style="color:#666666;font-size:13px;line-height:1.6;margin:28px 0 0;">
            Si el botón no funciona, copia y pega este enlace en tu navegador:
          </p>
          <p style="font-size:13px;word-break:break-all;margin:8px 0 0;">
            <a href="${url}" style="color:#0066ff;">${url}</a>
          </p>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:32px 0 20px;" />
          <p style="color:#999999;font-size:12px;line-height:1.6;margin:0;">
            ${footer}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function verificationTemplate(url: string, name?: string): string {
  return emailLayout({
    heading: "Verifica tu cuenta",
    greeting: `Hola${name ? ` ${name}` : ""}, gracias por registrarte. Verifica tu cuenta:`,
    ctaLabel: "Verificar mi cuenta",
    url,
    footer: "Este enlace expira en 24 horas. Si no creaste esta cuenta ignora este email.",
  })
}

function resetTemplate(url: string, name?: string): string {
  return emailLayout({
    heading: "Restablecer contraseña",
    greeting: `Hola${name ? ` ${name}` : ""}, recibimos una solicitud para restablecer tu contraseña:`,
    ctaLabel: "Restablecer contraseña",
    url,
    footer: "Este enlace expira en 1 hora. Si no solicitaste esto ignora este email.",
  })
}

export async function sendVerificationEmail(to: string, token: string, name?: string): Promise<void> {
  const url = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Verifica tu cuenta en STUDIO",
    html: verificationTemplate(url, name),
  })
}

export async function sendPasswordResetEmail(to: string, token: string, name?: string): Promise<void> {
  const url = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: "Restablece tu contraseña de STUDIO",
    html: resetTemplate(url, name),
  })
}
