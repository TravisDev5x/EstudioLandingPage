import type { LucideIcon } from "lucide-react"
import { Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type ComingSoonProps = {
  titulo?: string
  descripcion?: string
  texto?: string
  icono?: LucideIcon
}

export function ComingSoon({
  titulo = "Próximamente",
  descripcion = "Tus ideas y proyectos pronto serán reales",
  texto = "Estamos preparando tu espacio para gestionar reservas, proyectos y sesiones de estudio.",
  icono: Icon = Sparkles,
}: ComingSoonProps) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-md py-0 gap-0 shadow-none">
        <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
            <Icon size={32} className="text-primary" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="text-[22px] font-medium text-foreground">{titulo}</h2>
            <p className="text-[15px] text-muted-foreground">{descripcion}</p>
          </div>
          <p className="text-[13px] text-muted-foreground/70 max-w-sm">{texto}</p>
        </CardContent>
      </Card>
    </div>
  )
}
