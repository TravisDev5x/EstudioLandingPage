import { FolderKanban } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export default function ProyectosPage() {
  return (
    <ComingSoon
      titulo="Próximamente"
      descripcion="Tus proyectos pronto estarán aquí"
      texto="Estamos preparando tu espacio para gestionar tus proyectos de estudio."
      icono={FolderKanban}
    />
  );
}
