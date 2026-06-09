import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restablecer Contraseña",
  description: "Restablece tu contraseña de acceso a STUDIO.",
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
