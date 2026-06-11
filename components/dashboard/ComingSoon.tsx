import type { LucideIcon } from "lucide-react"
import { Bell, Check, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type ComingSoonProps = {
  titulo?: string
  descripcion?: string
  texto?: string
  icono?: LucideIcon
  features?: string[]
  ctaText?: string
}

const defaultFeatures = [
  "Gestión de reservas de estudio",
  "Seguimiento de proyectos",
  "Historial de sesiones",
  "Pagos y facturas",
]

export function ComingSoon({
  titulo = "Próximamente",
  descripcion = "Tus ideas y proyectos pronto serán reales",
  texto = "Estamos preparando tu espacio para gestionar reservas, proyectos y sesiones de estudio.",
  icono: Icon = Sparkles,
  features = defaultFeatures,
  ctaText = "Notifícame cuando esté listo",
}: ComingSoonProps) {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4">
      <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-primary/5 blur-3xl" />

      <Card className="w-full max-w-lg py-0 gap-0 shadow-none">
        <CardContent className="flex flex-col items-center gap-6 p-10 text-center sm:p-12">
          <Badge className="bg-primary/10 text-primary">En desarrollo</Badge>

          <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 animate-pulse">
            <Icon size={36} className="text-primary" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-foreground">{titulo}</h2>
            <p className="text-base text-muted-foreground">{descripcion}</p>
          </div>

          <p className="text-sm text-muted-foreground/70">{texto}</p>

          {features.length > 0 && (
            <ul className="flex w-full flex-col gap-2 text-left">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-foreground/80">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check size={12} className="text-primary" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={<span tabIndex={0} />}
                className={cn(buttonVariants({ variant: "outline" }), "cursor-not-allowed opacity-60")}
              >
                <Bell />
                {ctaText}
              </TooltipTrigger>
              <TooltipContent>Próximamente</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <p className="text-xs text-muted-foreground/60">
            Mientras tanto, puedes contactarnos en{" "}
            <a href="mailto:contacto@studio.mx" className="text-primary hover:underline">
              contacto@studio.mx
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
