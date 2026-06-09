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
          {done ? (
            <div className="flex flex-col items-center text-center gap-4">
              <CheckCircle2 size={48} className="text-green-400" />
              <div>
                <h1 className="text-[22px] font-medium text-white/90 mb-1">¡Contraseña actualizada!</h1>
                <p className="text-[13px] text-white/40">
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
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                  <KeyRound size={32} className="text-indigo-400" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-[22px] font-medium text-white/90 mb-1">Nueva contraseña</h1>
                <p className="text-[13px] text-white/40">Ingresa tu nueva contraseña</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="new-password" className="text-white/60">Nueva contraseña</Label>
                  <div className="relative flex items-center">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10" />
                    <Input
                      id="new-password"
                      type={showPass ? "text" : "password"}
                      className="pl-9 pr-10 bg-white/5 border-white/10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors z-10"
                      tabIndex={-1}
                      aria-label={showPass ? "Ocultar" : "Mostrar"}
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="confirm-password" className="text-white/60">Confirmar contraseña</Label>
                    <div className="relative flex items-center">
                      <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10" />
                      <Input
                        id="confirm-password"
                        type={showConfirm ? "text" : "password"}
                        className="pl-9 pr-10 bg-white/5 border-white/10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors z-10"
                        tabIndex={-1}
                        aria-label={showConfirm ? "Ocultar" : "Mostrar"}
                      >
                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  {mismatch && (
                    <p className="text-[12px] text-red-400 mt-0.5">Las contraseñas no coinciden</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-2"
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
