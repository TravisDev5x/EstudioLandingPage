"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  TextField,
  Input,
  Label,
  Button,
  Spinner,
  toast,
} from "@heroui/react";
import { Lock, Mail, Eye, EyeOff, KeyRound, ChevronLeft } from "lucide-react";

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
      toast.danger("El enlace es inválido o ha expirado");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowUnverified(false);
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.code === "EMAIL_NOT_VERIFIED") {
      toast.danger("Debes verificar tu email antes de iniciar sesión");
      setShowUnverified(true);
    } else if (result?.error) {
      toast.danger("Credenciales incorrectas");
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
      {/* Orbs de fondo */}
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

      <Card className="w-full max-w-[400px] relative z-10">
        <CardContent className="p-10">
          {/* Ícono */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 flex items-center justify-center">
              <Lock size={32} className="text-indigo-400" />
            </div>
          </div>

          {/* Encabezado */}
          <div className="text-center mb-8">
            <h1 className="text-[22px] font-medium text-white/90 mb-1">Iniciar Sesión</h1>
            <p className="text-[13px] text-white/40">Panel de administración</p>
          </div>

          {/* Formulario principal */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField value={email} onChange={setEmail} isRequired>
              <Label>Email</Label>
              <div className="relative flex items-center">
                <Mail size={15} className="absolute left-3 text-white/40 pointer-events-none z-10" />
                <Input type="email" className="pl-9 w-full" />
              </div>
            </TextField>

            <TextField value={password} onChange={setPassword} isRequired>
              <Label>Contraseña</Label>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 text-white/40 pointer-events-none z-10" />
                <Input type={showPassword ? "text" : "password"} className="pl-9 pr-10 w-full" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-white/40 hover:text-white/70 transition-colors z-10"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </TextField>

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2"
              isDisabled={loading}
            >
              {loading ? <Spinner size="sm" color="current" /> : "Entrar"}
            </Button>
          </form>

          {/* Reenviar verificación */}
          {showUnverified && (
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-[12px] text-white/40">¿No recibiste el email de verificación?</span>
              <Button variant="ghost" size="sm" onPress={handleResendVerify}>
                Reenviar
              </Button>
            </div>
          )}

          {/* Recuperar contraseña */}
          <div className="mt-5 border-t border-white/8 pt-5">
            {!showForgot ? (
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-white/40 gap-1.5"
                onPress={() => setShowForgot(true)}
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
                  onPress={() => { setShowForgot(false); setForgotEmail(""); }}
                >
                  <ChevronLeft size={14} />
                  Volver
                </Button>
                <TextField value={forgotEmail} onChange={setForgotEmail} isRequired>
                  <Label>Tu email de acceso</Label>
                  <div className="relative flex items-center">
                    <Mail size={15} className="absolute left-3 text-white/40 pointer-events-none z-10" />
                    <Input type="email" className="pl-9 w-full" />
                  </div>
                </TextField>
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  isDisabled={forgotLoading || !forgotEmail}
                  onPress={handleForgotPassword}
                >
                  {forgotLoading ? <Spinner size="sm" color="current" /> : "Enviar instrucciones"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
