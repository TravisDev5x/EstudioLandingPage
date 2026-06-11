"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/dashboard/ModeToggle"

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Inicio",
  "/dashboard/usuarios": "Usuarios",
  "/dashboard/roles": "Roles",
  "/dashboard/proyectos": "Mis Proyectos",
  "/dashboard/reservas": "Mis Reservas",
}

export function DashboardHeader() {
  const pathname = usePathname()
  const title = PAGE_TITLES[pathname] ?? "Dashboard"

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-4" />
      <h1 className="text-sm font-medium">{title}</h1>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </header>
  )
}
