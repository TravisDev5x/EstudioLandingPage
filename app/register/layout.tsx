import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: "Crea tu cuenta de STUDIO.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
