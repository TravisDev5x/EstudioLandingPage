import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '../../../../lib/prisma';
import { updateRoleSchema } from '../../../../lib/validations';

export const runtime = 'nodejs'

type RouteContext = { params: Promise<{ id: string }> };

// Actualizar un rol (Ruta PUT)
export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const parsed = updateRoleSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
    }

    const rolActualizado = await prisma.role.update({
      where: { id: Number(id) },
      data: {
        nombre: parsed.data.nombre,
        descripcion: parsed.data.descripcion,
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
  try {
    const { id } = await params;
    const roleId = Number(id);

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
