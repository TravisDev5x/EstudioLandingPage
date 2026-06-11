import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export const runtime = 'nodejs'
import { updateUserSchema, idParamSchema } from '../../../../lib/validations';
import { requireAdmin } from '../../../../lib/api-auth';

type RouteContext = { params: Promise<{ id: string }> };

// Actualizar nombre y email de un usuario (Ruta PUT)
export async function PUT(request: Request, { params }: RouteContext) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.ok) return adminCheck.response;

  try {
    const { id } = await params;
    const parsedId = idParamSchema.safeParse(id);
    if (!parsedId.success) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const parsed = updateUserSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
    }

    const usuarioActualizado = await prisma.user.update({
      where: { id: parsedId.data },
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
      },
    });

    return NextResponse.json(usuarioActualizado);
  } catch {
    return NextResponse.json({ error: "Error al actualizar el usuario" }, { status: 500 });
  }
}

// Eliminar (soft delete) un usuario (Ruta DELETE)
export async function DELETE(request: Request, { params }: RouteContext) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.ok) return adminCheck.response;

  try {
    const { id } = await params;
    const parsedId = idParamSchema.safeParse(id);
    if (!parsedId.success) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const usuarioEliminado = await prisma.user.update({
      where: { id: parsedId.data },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json(usuarioEliminado);
  } catch {
    return NextResponse.json({ error: "Error al eliminar el usuario" }, { status: 500 });
  }
}

// Restaurar un usuario eliminado (Ruta PATCH)
export async function PATCH(request: Request, { params }: RouteContext) {
  const adminCheck = await requireAdmin();
  if (!adminCheck.ok) return adminCheck.response;

  try {
    const { id } = await params;
    const parsedId = idParamSchema.safeParse(id);
    if (!parsedId.success) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const usuarioRestaurado = await prisma.user.update({
      where: { id: parsedId.data },
      data: { deletedAt: null },
    });

    return NextResponse.json(usuarioRestaurado);
  } catch {
    return NextResponse.json({ error: "Error al restaurar el usuario" }, { status: 500 });
  }
}
