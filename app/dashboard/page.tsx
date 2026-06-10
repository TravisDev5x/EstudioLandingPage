import { Users, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const [totalUsuarios, totalRoles] = await Promise.all([
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.role.count(),
  ]);

  const cards = [
    { title: "Usuarios registrados", value: totalUsuarios, icon: Users },
    { title: "Roles creados", value: totalRoles, icon: Shield },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
