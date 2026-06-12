import Link from "next/link";
import { Calendar, Clock, FolderKanban, Mail, Shield, UserCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComingSoon } from "@/components/dashboard/ComingSoon";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

function getSieteDiasAtras() {
  return new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
}

export default async function DashboardPage() {
  const session = await auth();

  if (session?.user?.role !== "Admin") {
    const accesos = [
      {
        title: "Mis Proyectos",
        description: "Organiza y da seguimiento a tus proyectos de estudio.",
        icon: FolderKanban,
        href: "/dashboard/proyectos",
      },
      {
        title: "Mis Reservas",
        description: "Consulta y gestiona tus reservas de sesiones.",
        icon: Calendar,
        href: "/dashboard/reservas",
      },
      {
        title: "Contactar",
        description: "¿Tienes dudas? Escríbenos desde la página principal.",
        icon: Mail,
        href: "/#contacto",
      },
    ];

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold">Hola, {session?.user?.name} 👋</h1>
          <p className="text-muted-foreground">Tu espacio en STUDIO está casi listo</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accesos.map((acceso) => (
            <Link key={acceso.title} href={acceso.href}>
              <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <acceso.icon className="size-5 text-primary" />
                  </div>
                  <CardTitle>{acceso.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{acceso.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <ComingSoon />
      </div>
    );
  }

  const sieteDiasAtras = getSieteDiasAtras();

  const [totalUsuarios, totalRoles, usuariosActivos, usuariosPendientes, nuevosClientes, recientes] =
    await Promise.all([
      prisma.user.count({ where: { role: { name: "Cliente" }, deletedAt: null } }),
      prisma.role.count(),
      prisma.user.count({ where: { emailVerified: true, deletedAt: null } }),
      prisma.user.count({ where: { emailVerified: false, deletedAt: null } }),
      prisma.user.count({
        where: {
          createdAt: { gte: sieteDiasAtras },
          role: { name: "Cliente" },
          deletedAt: null,
        },
      }),
      prisma.user.findMany({
        where: { deletedAt: null },
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { role: true },
      }),
    ]);

  const cards = [
    {
      title: "Usuarios registrados",
      value: totalUsuarios,
      icon: Users,
      trend: `+${nuevosClientes} esta semana`,
    },
    {
      title: "Roles creados",
      value: totalRoles,
      icon: Shield,
      trend: "Total de roles del sistema",
    },
    {
      title: "Usuarios activos",
      value: usuariosActivos,
      icon: UserCheck,
      trend: "Email verificado",
    },
    {
      title: "Pendientes de verificar",
      value: usuariosPendientes,
      icon: Clock,
      trend: "Esperando confirmación",
    },
  ];

  const dateFormatter = new Intl.DateTimeFormat("es-MX", { dateStyle: "medium" });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                <card.icon className="size-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Usuarios recientes</h2>
          <Link href="/dashboard/usuarios" className="text-sm text-primary hover:underline">
            Ver todos →
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead className="hidden sm:table-cell">Registro</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recientes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-6 text-center text-muted-foreground">
                      No hay usuarios registrados todavía.
                    </TableCell>
                  </TableRow>
                ) : (
                  recientes.map((usuario) => {
                    const initials = usuario.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2);

                    return (
                      <TableRow key={usuario.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar size="sm">
                              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{usuario.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{usuario.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{usuario.role?.name ?? "Sin rol"}</Badge>
                        </TableCell>
                        <TableCell className="hidden text-muted-foreground sm:table-cell">
                          {dateFormatter.format(usuario.createdAt)}
                        </TableCell>
                        <TableCell>
                          {usuario.emailVerified ? (
                            <Badge className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              Verificado
                            </Badge>
                          ) : (
                            <Badge className="border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                              Pendiente
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
