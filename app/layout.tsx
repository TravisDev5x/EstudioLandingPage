import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: {
    default: "STUDIO — Donde nacen las ideas",
    template: "%s | STUDIO",
  },
  description: "Estudio de grabación, producción musical y clases en Ecatepec, Estado de México.",
  keywords: ["estudio de grabación", "producción musical", "clases de música", "Ecatepec", "trance", "techno"],
  authors: [{ name: "STUDIO" }],
  openGraph: {
    title: "STUDIO — Donde nacen las ideas",
    description: "Estudio de grabación, producción musical y clases en Ecatepec, Estado de México.",
    url: "https://estudio-landing-page-7cox-eqo8odtge.vercel.app",
    siteName: "STUDIO",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STUDIO — Donde nacen las ideas",
    description: "Estudio de grabación, producción musical y clases en Ecatepec, Estado de México.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("dark", "h-full", "antialiased", dmSans.className, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
