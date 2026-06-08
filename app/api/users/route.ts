import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { createUserSchema } from '../../../lib/validations';

// Leer todos los usuarios (Ruta GET) con paginación y búsqueda
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trash = searchParams.get('trash') === 'true';
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(searchParams.get('limit')) || 5);
    const search = (searchParams.get('search') || '').trim();

    const where: any = trash ? { deletedAt: { not: null } } : { deletedAt: null };
    if (search !== '') {
      where.OR = [
        { nombre: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [usuarios, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      usuarios,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener los usuarios" }, { status: 500 });
  }
}

// Crear un nuevo usuario (Ruta POST)
export async function POST(request: Request) {
  try {
    const parsed = createUserSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 422 });
    }

    const nuevoUsuario = await prisma.user.create({
      data: {
        nombre: parsed.data.nombre,
        email: parsed.data.email,
      },
    });

    return NextResponse.json(nuevoUsuario, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear el usuario" }, { status: 500 });
  }
}