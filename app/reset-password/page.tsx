"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { KeyRound, Lock, Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const mismatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword;
  const canSubmit = !loading && password.length >= 6 && confirmPassword.length >= 6 && !mismatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Token inválido");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    if (res.ok) {
      setDone(true);
    } else {
      const data = await res.json();
      toast.error(data.error ?? "Error al restablecer la contraseña");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="fixed -top-[100px] -left-[100px] w-[320px] h-[320px] rounded-full bg-primary/20 blur-[80px] pointer-events-none z-0" />
      <div className="fixed -bottom-[80px] -right-[80px] w-[260px] h-[260px] rounded-full bg-secondary blur-[80px] pointer-events-none z-0" />
      <div className="fixed top-[40%] right-[15%] w-[200px] h-[200px] rounded-full bg-primary/20 blur-[80px] pointer-events-none z-0" />

      <Card className="w-full max-w-[400px] relative z-10 py-0 gap-0 shadow-none">
        <CardContent className="p-10">
          {done ? (
            <div className="flex flex-col items-center text-center gap-4">
              <CheckCircle2 size={48} className="text-primary" />
              <div>
                <h1 className="text-[22px] font-medium text-foreground mb-1">¡Contraseña actualizada!</h1>
                <p className="text-[13px] text-muted-foreground">
                  Ya puedes iniciar sesión con tu nueva contraseña.
                </p>
              </div>
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Ir al login
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <KeyRound size={32} className="text-primary" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-[22px] font-medium text-foreground mb-1">Nueva contraseña</h1>
                <p className="text-[13px] text-muted-foreground">Ingresa tu nueva contraseña</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="new-password" className="text-muted-foreground">Nueva contraseña</Label>
                  <div className="relative flex items-center">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                    <Input
                      id="new-password"
                      type={showPass ? "text" : "password"}
                      className="pl-9 pr-10 bg-input/30 border-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                      tabIndex={-1}
                      aria-label={showPass ? "Ocultar" : "Mostrar"}
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="confirm-password" className="text-muted-foreground">Confirmar contraseña</Label>
                    <div className="relative flex items-center">
                      <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                      <Input
                        id="confirm-password"
                        type={showConfirm ? "text" : "password"}
                        className="pl-9 pr-10 bg-input/30 border-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors z-10"
                        tabIndex={-1}
                        aria-label={showConfirm ? "Ocultar" : "Mostrar"}
                      >
                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  {mismatch && (
                    <p className="text-[12px] text-destructive mt-0.5">Las contraseñas no coinciden</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full mt-2"
                  disabled={!canSubmit}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Guardar nueva contraseña"}
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
