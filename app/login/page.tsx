"use client";
import { Suspense, useState, useEffect } from "react";
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
    <main className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-8">
      <div
        style={{
          position: "fixed", top: -100, left: -100, width: 320, height: 320,
          borderRadius: "50%", background: "#4f46e5", filter: "blur(80px)",
          opacity: 0.18, pointerEvents: "none", zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed", bottom: -80, right: -80, width: 260, height: 260,
          borderRadius: "50%", background: "#0ea5e9", filter: "blur(80px)",
          opacity: 0.18, pointerEvents: "none", zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed", top: "40%", right: "15%", width: 200, height: 200,
          borderRadius: "50%", background: "#7c3aed", filter: "blur(80px)",
          opacity: 0.18, pointerEvents: "none", zIndex: 0,
        }}
      />

      <Card className="w-full max-w-[400px] relative z-10 py-0 gap-0 ring-0 border-white/10 bg-white/5 shadow-none">
        <CardContent className="p-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 flex items-center justify-center">
              <Lock size={32} className="text-indigo-400" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[22px] font-medium text-white/90 mb-1">Iniciar Sesión</h1>
            <p className="text-[13px] text-white/40">Panel de administración</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="login-email" className="text-white/60">Email</Label>
              <div className="relative flex items-center">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="admin@estudio.com"
                  className="pl-9 bg-white/5 border-white/10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="login-password" className="text-white/60">Contraseña</Label>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10" />
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="pl-9 pr-10 bg-white/5 border-white/10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors z-10"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
            </Button>
          </form>

          {showUnverified && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-[12px] text-white/40">¿No recibiste el email de verificación?</span>
              <Button variant="ghost" size="sm" onClick={handleResendVerify}>
                Reenviar
              </Button>
            </div>
          )}

          <div className="mt-5 border-t border-white/[0.08] pt-5">
            {!showForgot ? (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-white/40 gap-1.5"
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
                  className="self-start text-white/40 gap-1 -ml-2"
                  onClick={() => { setShowForgot(false); setForgotEmail(""); }}
                >
                  <ChevronLeft size={14} />
                  Volver
                </Button>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="forgot-email" className="text-white/60">Tu email de acceso</Label>
                  <div className="relative flex items-center">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10" />
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="admin@estudio.com"
                      className="pl-9 bg-white/5 border-white/10"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
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
    </main>
  );
}
