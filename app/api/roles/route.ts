import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '../../../lib/prisma';
import { createRoleSchema } from '../../../lib/validations';

export const runtime = 'nodejs'

// Listar roles (Ruta GET) con paginación y búsqueda
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(searchParams.get('limit')) || 5);
    const search = (searchParams.get('search') || '').trim();

    const where: Prisma.RoleWhereInput = {};
    if (search !== '') {
      where.OR = [
        { nombre: { contains: search } },
        { descripcion: { contains: search } },
      ];
    }

    const [roles, total] = await Promise.all([
      prisma.role.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      prisma.role.count({ where }),
    ]);

    return NextResponse.json({
      roles,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch {
    return NextResponse.json({ error: "Error al obtener los roles" }, { status: 500 });
  }
}

// Crear un nuevo rol (Ruta POST)
export async function POST(request: Request) {
  try {
    const parsed = createRoleSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
    }

    const nuevoRol = await prisma.role.create({
      data: {
        nombre: parsed.data.nombre,
        descripcion: parsed.data.descripcion,
      },
    });

    return NextResponse.json(nuevoRol, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: "Ya existe un rol con ese nombre" }, { status: 409 });
    }
    return NextResponse.json({ error: "Error al crear el rol" }, { status: 500 });
  }
}
