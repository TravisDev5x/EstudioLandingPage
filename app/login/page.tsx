"use client";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, Mail, Eye, EyeOff, KeyRound, ChevronLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUnverified, setShowUnverified] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verified = searchParams.get("verified");
    const error = searchParams.get("error");
    if (verified === "true") {
      toast.success("Cuenta verificada, ya puedes iniciar sesión");
    } else if (error === "invalid-token") {
      toast.error("El enlace es inválido o ha expirado");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowUnverified(false);
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.code === "EMAIL_NOT_VERIFIED") {
      toast.error("Debes verificar tu email antes de iniciar sesión");
      setShowUnverified(true);
    } else if (result?.error) {
      toast.error("Credenciales incorrectas");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
    setLoading(false);
  };

  const handleResendVerify = async () => {
    await fetch("/api/auth/resend-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    toast.success("Email de verificación reenviado");
  };

  const handleForgotPassword = async () => {
    setForgotLoading(true);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: forgotEmail }),
    });
    toast.success("Si el email existe, recibirás instrucciones en breve");
    setShowForgot(false);
    setForgotEmail("");
    setForgotLoading(false);
  };

  return (
    <main className="relative min-h-screen bg-background flex flex-col items-center justify-center gap-6 p-8">
      <div className="fixed -top-[100px] -left-[100px] w-[320px] h-[320px] rounded-full bg-primary/20 blur-[80px] pointer-events-none z-0" />
      <div className="fixed -bottom-[80px] -right-[80px] w-[260px] h-[260px] rounded-full bg-secondary blur-[80px] pointer-events-none z-0" />
      <div className="fixed top-[40%] right-[15%] w-[200px] h-[200px] rounded-full bg-primary/20 blur-[80px] pointer-events-none z-0" />

      <Link
        href="/"
        className="fixed top-6 left-6 z-20 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft size={16} />
        Inicio
      </Link>

      <Card className="w-full max-w-[420px] relative z-10 py-0 gap-0 shadow-none">
        <CardContent className="p-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Lock size={32} className="text-primary" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[22px] font-medium text-foreground mb-1">Iniciar Sesión</h1>
            <p className="text-[13px] text-muted-foreground">Panel de administración</p>
          </div>

          {/* TODO: Botón Google OAuth aquí */}

          <div className="relative flex items-center mb-6">
            <div className="flex-1 border-t border-border" />
            <span className="px-3 text-xs text-muted-foreground">o</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="login-email" className="text-muted-foreground">Email</Label>
              <div className="relative flex items-center">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="admin@estudio.com"
                  className="pl-9 bg-input/30 border-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="login-password" className="text-muted-foreground">Contraseña</Label>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="pl-9 pr-10 bg-input/30 border-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
            </Button>
          </form>

          {showUnverified && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-[12px] text-muted-foreground">¿No recibiste el email de verificación?</span>
              <Button variant="ghost" size="sm" onClick={handleResendVerify}>
                Reenviar
              </Button>
            </div>
          )}

          <div className="mt-5 text-center">
            <span className="text-[13px] text-muted-foreground">¿No tienes cuenta? </span>
            <Link href="/register" className="text-[13px] text-primary hover:text-primary/70 transition-colors">
              Regístrate
            </Link>
          </div>

          <div className="mt-5 border-t border-border pt-5">
            {!showForgot ? (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground gap-1.5"
                onClick={() => setShowForgot(true)}
              >
                <KeyRound size={14} />
                ¿Olvidaste tu contraseña?
              </Button>
            ) : (
              <div className="flex flex-col gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="self-start text-muted-foreground gap-1 -ml-2"
                  onClick={() => { setShowForgot(false); setForgotEmail(""); }}
                >
                  <ChevronLeft size={14} />
                  Volver
                </Button>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="forgot-email" className="text-muted-foreground">Tu email de acceso</Label>
                  <div className="relative flex items-center">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="admin@estudio.com"
                      className="pl-9 bg-input/30 border-input"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  className="w-full"
                  disabled={forgotLoading || !forgotEmail}
                  onClick={handleForgotPassword}
                >
                  {forgotLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enviar instrucciones"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <p className="relative z-10 max-w-[420px] text-xs text-muted-foreground text-center">
        Al iniciar sesión aceptas nuestros{" "}
        <Link href="#" className="hover:text-foreground hover:underline transition-colors">
          Términos
        </Link>{" "}
        y{" "}
        <Link href="#" className="hover:text-foreground hover:underline transition-colors">
          Política de Privacidad
        </Link>
      </p>
    </main>
  );
}
