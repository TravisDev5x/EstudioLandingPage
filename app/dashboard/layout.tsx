import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Panel de administración de STUDIO.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
