"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/dashboard/ModeToggle";
import { Calendar } from "lucide-react";

const navLinks = [
  ["Inicio", "/"],
  ["Nosotros", "/#about"],
  ["Servicios", "/#servicios"],
  ["Precios", "/#precios"],
  ["Blog", "/blog"],
  ["Contacto", "/#contacto"],
] as const;

export default function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 border-b border-border bg-background/80 backdrop-blur-md">
      <span className="font-mono text-[15px] font-semibold text-foreground tracking-tight">STUDIO</span>

      <div className="hidden md:flex items-center gap-6">
        {navLinks.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="text-[14px] text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button size="sm" variant="outline" nativeButton={false} render={<Link href="/login" />}>
          Iniciar sesión
        </Button>
        <Button size="sm" className="flex items-center gap-1.5">
          <Calendar size={14} />
          Reservar sesión
        </Button>
      </div>
    </nav>
  );
}
