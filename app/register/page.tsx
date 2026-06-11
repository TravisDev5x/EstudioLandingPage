"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { toast } from "sonner";
import { UserPlus, User, Mail, Lock, Eye, EyeOff, ChevronLeft, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("El nombre debe tener al menos 2 caracteres");
      return;
    }
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      toast.error("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "No se pudo crear la cuenta");
      } else {
        toast.success("Revisa tu correo para verificar tu cuenta");
        router.push("/login");
      }
    } catch {
      toast.error("Ocurrió un error, intenta de nuevo");
    }
    setLoading(false);
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
              <UserPlus size={32} className="text-primary" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[22px] font-medium text-foreground mb-1">Crear cuenta</h1>
            <p className="text-[13px] text-muted-foreground">Regístrate como cliente del estudio</p>
          </div>

          <GoogleButton />

          <div className="relative flex items-center my-6">
            <div className="flex-1 border-t border-border" />
            <span className="px-3 text-xs text-muted-foreground">o</span>
            <div className="flex-1 border-t border-border" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="register-name" className="text-muted-foreground">Nombre</Label>
              <div className="relative flex items-center">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Tu nombre"
                  className="pl-9 bg-input/30 border-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="register-email" className="text-muted-foreground">Email</Label>
              <div className="relative flex items-center">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                <Input
                  id="register-email"
                  type="email"
                  placeholder="tu@email.com"
                  className="pl-9 bg-input/30 border-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="register-password" className="text-muted-foreground">Contraseña</Label>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                <Input
                  id="register-password"
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
              <p className="text-[11px] text-muted-foreground">
                Mínimo 8 caracteres, con una mayúscula y un número
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="register-confirm-password" className="text-muted-foreground">Confirmar contraseña</Label>
              <div className="relative flex items-center">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                <Input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="pl-9 pr-10 bg-input/30 border-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Crear cuenta"}
            </Button>
          </form>

          <div className="mt-5 border-t border-border pt-5 text-center">
            <span className="text-[13px] text-muted-foreground">¿Ya tienes cuenta? </span>
            <Link href="/login" className="text-[13px] text-primary hover:text-primary/70 transition-colors">
              Inicia sesión
            </Link>
          </div>
        </CardContent>
      </Card>

      <p className="relative z-10 max-w-[420px] text-xs text-muted-foreground text-center">
        Al crear una cuenta aceptas nuestros{" "}
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
