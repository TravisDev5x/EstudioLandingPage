# STUDIO — Donde nacen las ideas

Plataforma web para un estudio de grabación y producción musical: landing page pública, blog, autenticación de usuarios y panel de administración (dashboard) con gestión de usuarios y roles.

<p>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>
<p>
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/MySQL-Railway-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/NextAuth.js-v5-7C3AED?style=for-the-badge&logo=auth0&logoColor=white" alt="NextAuth.js" />
</p>
<p>
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/bcryptjs-338?style=for-the-badge&logo=letsencrypt&logoColor=white" alt="bcryptjs" />
  <img src="https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white" alt="Resend" />
  <img src="https://img.shields.io/badge/Upstash-00E9A3?style=for-the-badge&logo=upstash&logoColor=white" alt="Upstash" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
| --- | --- |
| **Next.js 16** (App Router, Turbopack) | Framework principal, server components, rutas API |
| **React 19** | Librería de UI |
| **TypeScript** | Tipado estricto en todo el proyecto |
| **Tailwind CSS v4** | Estilos utilitarios, diseño responsive y dark mode |
| **shadcn/ui** | Sistema de componentes (Card, Table, Sidebar, Dialog, etc.) |
| **Prisma ORM 7** + adaptador MariaDB | Acceso a base de datos tipado |
| **MySQL (Railway)** | Base de datos relacional en producción |
| **NextAuth.js v5 (beta)** | Autenticación con Credentials + Google OAuth, sesiones JWT |
| **Zod** | Validación de inputs (forms y APIs) |
| **bcryptjs** | Hash de contraseñas (12 salt rounds) |
| **Nodemailer + Resend** | Envío de correos transaccionales (verificación, reset de contraseña) |
| **Upstash Ratelimit/Redis** | Rate limiting de endpoints sensibles de auth |
| **Sonner** | Notificaciones (toasts) |
| **next-themes** | Soporte de tema claro/oscuro |

## Características

- 🏠 Landing page pública (Hero, servicios, precios, blog, contacto) con dark mode
- 🔐 Autenticación: registro, login, login con Google, verificación de email, recuperación de contraseña
- 🛡️ Hardening de seguridad: security headers (CSP, HSTS, etc.), rate limiting, validación Zod, autorización por rol, tokens con expiración
- 📊 Dashboard de administración: CRUD de usuarios y roles, protegido por sesión + rol `Admin`
- 📱 Diseño responsive (mobile, tablet, desktop) con Tailwind

## Estructura del proyecto

```
app/
├─ (landing)/        # Landing pública (Navbar, Footer, blog)
├─ login/            # Login (credentials + Google)
├─ register/         # Registro de usuarios
├─ reset-password/   # Restablecer contraseña
├─ dashboard/        # Panel de administración (usuarios, roles)
└─ api/
   ├─ auth/          # NextAuth, register, forgot/reset password, verify-email
   ├─ users/         # CRUD de usuarios (solo Admin)
   └─ roles/         # CRUD de roles (solo Admin)
lib/                  # auth, prisma, validaciones, tokens, email, rate-limit, api-auth
prisma/               # schema.prisma y seed
components/           # Componentes UI (shadcn) y de dashboard
```

## Instalación

### Requisitos previos

- Node.js 20+
- npm
- Una base de datos MySQL (por ejemplo, [Railway](https://railway.app))

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TravisDev5x/EstudioLandingPage.git
cd EstudioLandingPage

# 2. Instalar dependencias (también ejecuta `prisma generate`)
npm install

# 3. Configurar variables de entorno
cp .env.example .env   # luego edita .env con tus valores (ver sección Configuración)

# 4. Aplicar el esquema a la base de datos
npx prisma migrate deploy
# o, para desarrollo local sin migraciones existentes:
npx prisma db push

# 5. (Opcional) Crear el usuario administrador inicial
npx prisma db seed
# crea admin@estudio.com / admin123 — cambia la contraseña después de iniciar sesión

# 6. Levantar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Configuración

Crea un archivo `.env` en la raíz (puedes partir de `.env.example`) con las siguientes variables:

```bash
# Base de datos MySQL
DATABASE_URL="mysql://usuario:password@host:puerto/basededatos"

# NextAuth
AUTH_SECRET="genera uno con: npx auth secret"
AUTH_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (https://console.cloud.google.com/apis/credentials)
AUTH_GOOGLE_ID="tu-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="tu-client-secret"

# Envío de correos (Resend SMTP)
MAIL_HOST=smtp.resend.com
MAIL_PORT=465
MAIL_FROM="onboarding@resend.dev"
RESEND_API_KEY="tu-api-key-de-resend"

# Rate limiting (Upstash Redis) — opcional, ver nota abajo
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### Notas de configuración

- **Google OAuth**: en [Google Cloud Console](https://console.cloud.google.com/apis/credentials), agrega `http://localhost:3000/api/auth/callback/google` (y la URL de producción equivalente) como URI de redirección autorizada.
- **Resend**: crea una cuenta gratis en [resend.com](https://resend.com) y genera una API key para `RESEND_API_KEY`.
- **Upstash (rate limiting)**: crea una base de datos Redis gratis en [upstash.com](https://upstash.com) y copia las credenciales REST. Si se dejan vacías, el rate limiting queda **deshabilitado** (fail-open) sin afectar el resto de la app.
- **AUTH_SECRET**: genera uno seguro con `npx auth secret`.

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo (Turbopack)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
npx prisma studio   # Explorador visual de la base de datos
```

## Despliegue

Pensado para desplegarse en [Vercel](https://vercel.com): conecta el repositorio, agrega las variables de entorno (sección Configuración) y despliega. La base de datos MySQL puede alojarse en [Railway](https://railway.app) o cualquier proveedor compatible.

<!-- CI check trigger -->
