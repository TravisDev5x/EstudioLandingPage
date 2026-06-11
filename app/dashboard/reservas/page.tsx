import { Calendar } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function ReservasPage() {
  return (
    <ComingSoon
      titulo="Próximamente"
      descripcion="Tus reservas pronto estarán aquí"
      texto="Estamos preparando tu espacio para gestionar tus reservas de sesiones de estudio."
      icono={Calendar}
      features={[
        "Reserva tiempo de estudio",
        "Calendario de disponibilidad",
        "Confirmación automática",
      ]}
    />
  );
}
