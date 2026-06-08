"use client";
import { Button } from "@heroui/react";
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
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 border-b border-white/[0.06]"
      style={{ background: "rgba(10,14,26,0.85)", backdropFilter: "blur(12px)" }}
    >
      <span className="font-mono text-[15px] font-semibold text-white tracking-tight">STUDIO</span>

      <div className="hidden md:flex items-center gap-6">
        {navLinks.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className="text-[14px] text-white/60 hover:text-white/95 transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </div>

      <Button variant="primary" size="sm" className="flex items-center gap-1.5">
        <Calendar size={14} />
        Reservar sesión
      </Button>
    </nav>
  );
}
