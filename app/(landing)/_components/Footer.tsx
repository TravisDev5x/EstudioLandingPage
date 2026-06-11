import { MapPin, Mail, Music } from "lucide-react";

const navLinks = [
  ["Inicio", "/"],
  ["Nosotros", "/#about"],
  ["Servicios", "/#servicios"],
  ["Precios", "/#precios"],
  ["Blog", "/blog"],
  ["Contacto", "/#contacto"],
] as const;

export default function LandingFooter() {
  return (
    <footer className="px-6 pt-12 pb-8 border-t border-border bg-muted/30">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-10">
        <div>
          <span className="font-mono text-[15px] font-semibold text-foreground block mb-2">STUDIO</span>
          <p className="text-[13px] text-muted-foreground">Donde nacen las ideas</p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-4">Navegación</p>
          <div className="flex flex-col gap-2">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-4">Contacto</p>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <MapPin size={13} className="shrink-0" />
              <span>Ecatepec, México</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <Mail size={13} className="shrink-0" />
              <span>contacto@studio.mx</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <button
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Music size={16} />
              </button>
              <button
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="SoundCloud"
              >
                <Music size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-[11px] text-muted-foreground">
        © 2026 STUDIO. Todos los derechos reservados
      </p>
    </footer>
  );
}
