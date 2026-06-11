"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Music, Users, Shield, LogOut, Home, FolderKanban, Calendar } from "lucide-react"
import type { Session } from "next-auth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const adminNavItems = [
  { title: "Inicio", url: "/dashboard", icon: Home },
  { title: "Usuarios", url: "/dashboard/usuarios", icon: Users },
  { title: "Roles", url: "/dashboard/roles", icon: Shield },
]

const clienteNavItems = [
  { title: "Inicio", url: "/dashboard", icon: Home },
  { title: "Mis Proyectos", url: "/dashboard/proyectos", icon: FolderKanban },
  { title: "Mis Reservas", url: "/dashboard/reservas", icon: Calendar },
]

const defaultNavItems = [{ title: "Inicio", url: "/dashboard", icon: Home }]

export function AppSidebar({ session }: { session: Session | null }) {
  const pathname = usePathname()
  const user = session?.user
  const role = user?.role

  const navItems =
    role === "Admin" ? adminNavItems : role === "Cliente" ? clienteNavItems : defaultNavItems

  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ?? "??"

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <Music />
              <span className="font-semibold">STUDIO</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                isActive={item.url === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.url)}
                render={<Link href={item.url} />}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar size="sm">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium">{user?.name ?? "Usuario"}</span>
            <span className="truncate text-xs text-muted-foreground">{user?.email ?? ""}</span>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
            aria-label="Cerrar sesión"
          >
            <LogOut size={16} />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
