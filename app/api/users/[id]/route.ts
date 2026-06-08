import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export const runtime = 'nodejs'
import { updateUserSchema } from '../../../../lib/validations';

type RouteContext = { params: Promise<{ id: string }> };

// Actualizar nombre y email de un usuario (Ruta PUT)
export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const parsed = updateUserSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
    }

    const usuarioActualizado = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        nombre: parsed.data.nombre,
        email: parsed.data.email,
      },
    });

    return NextResponse.json(usuarioActualizado);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar el usuario" }, { status: 500 });
  }
}

// Eliminar (soft delete) un usuario (Ruta DELETE)
export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const usuarioEliminado = await prisma.user.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json(usuarioEliminado);
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar el usuario" }, { status: 500 });
  }
}

// Restaurar un usuario eliminado (Ruta PATCH)
export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const usuarioRestaurado = await prisma.user.update({
      where: { id: Number(id) },
      data: { deletedAt: null },
    });

    return NextResponse.json(usuarioRestaurado);
  } catch (error) {
    return NextResponse.json({ error: "Error al restaurar el usuario" }, { status: 500 });
  }
}
