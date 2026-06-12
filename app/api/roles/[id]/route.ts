import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '../../../../lib/prisma';
import { updateRoleSchema, idParamSchema } from '../../../../lib/validations';
import { requireAdmin } from '../../../../lib/api-auth';

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> };

// Actualizar un rol (Ruta PUT)
export async function PUT(request: Request, { params }: RouteContext) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.ok) return adminCheck.response;

  try {
    const { id } = await params;
    const parsedId = idParamSchema.safeParse(id);
    if (!parsedId.success) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const parsed = updateRoleSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
    }

    const rolActualizado = await prisma.role.update({
      where: { id: parsedId.data },
      data: {
        name: parsed.data.name,
        description: parsed.data.description,
      },
    });

    return NextResponse.json(rolActualizado);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: "Ya existe un rol con ese nombre" }, { status: 409 });
    }
    return NextResponse.json({ error: "Error al actualizar el rol" }, { status: 500 });
  }
}

// Eliminar un rol (Ruta DELETE)
export async function DELETE(request: Request, { params }: RouteContext) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.ok) return adminCheck.response;

  try {
    const { id } = await params;
    const parsedId = idParamSchema.safeParse(id);
    if (!parsedId.success) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }
    const roleId = parsedId.data;

    const usuariosAsignados = await prisma.user.count({ where: { roleId, deletedAt: null } });
    if (usuariosAsignados > 0) {
      return NextResponse.json(
        { error: "No se puede eliminar el rol porque tiene usuarios asignados" },
        { status: 409 }
      );
    }

    const rolEliminado = await prisma.role.delete({ where: { id: roleId } });

    return NextResponse.json(rolEliminado);
  } catch {
    return NextResponse.json({ error: "Error al eliminar el rol" }, { status: 500 });
  }
}
