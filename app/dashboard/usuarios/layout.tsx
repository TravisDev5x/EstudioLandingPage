import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function UsuariosLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session?.user?.role !== "Admin") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
