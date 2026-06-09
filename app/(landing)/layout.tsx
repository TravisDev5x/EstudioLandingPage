import type { Metadata } from "next";
import LandingNavbar from "./_components/Navbar";
import LandingFooter from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "STUDIO — Grabación, Producción y Clases en Ecatepec",
  description: "Estudio de grabación, producción musical y clases profesionales en Ecatepec, Estado de México. Especialistas en música electrónica, Trance y Techno.",
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingNavbar />
      {children}
      <LandingFooter />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
