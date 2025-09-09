import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to parse query parameters
const parseQueryParams = (searchParams: URLSearchParams) => {
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  return { page, limit, search };
};

export async function GET(req: NextRequest) {
  try {
    const { page, limit, search } = parseQueryParams(req.nextUrl.searchParams);
    const skip = (page - 1) * limit;

    const [groups, total] = await Promise.all([
      prisma.group.findMany({
        where: {
          name: { contains: search, mode: 'insensitive' }
        },
        include: { 
          permissions: true,
          users: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: { name: 'asc' }
      }),
      prisma.group.count({
        where: {
          name: { contains: search, mode: 'insensitive' }
        }
      })
    ]);

    return NextResponse.json({
      groups,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar grupos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar grupos.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, permissions, userIds } = await req.json();
    
    if (!name) {
      return NextResponse.json({ error: 'Nome do grupo obrigatório.' }, { status: 400 });
    }

    // Verifica se já existe um grupo com esse nome
    const existingGroup = await prisma.group.findUnique({
      where: { name }
    });

    if (existingGroup) {
      return NextResponse.json(
        { error: 'Já existe um grupo com esse nome.' },
        { status: 400 }
      );
    }

    const group = await prisma.group.create({
      data: {
        name,
        permissions: permissions ? {
          connect: permissions.map((id: number) => ({ id }))
        } : undefined,
        users: userIds ? {
          create: userIds.map((userId: number) => ({
            user: { connect: { id: userId } }
          }))
        } : undefined
      },
      include: {
        permissions: true,
        users: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error('Erro ao criar grupo:', error);
    return NextResponse.json(
      { error: 'Erro ao criar o grupo.' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, permissions, userIds } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID do grupo obrigatório.' }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: 'Nome do grupo obrigatório.' }, { status: 400 });
    }

    // Verifica se já existe outro grupo com esse nome
    const existingGroup = await prisma.group.findFirst({
      where: {
        name,
        NOT: { id }
      }
    });

    if (existingGroup) {
      return NextResponse.json(
        { error: 'Já existe outro grupo com esse nome.' },
        { status: 400 }
      );
    }

    // Atualiza o grupo
    const group = await prisma.group.update({
      where: { id },
      data: {
        name,
        permissions: {
          set: permissions ? permissions.map((id: number) => ({ id })) : []
        },
        users: {
          deleteMany: {},
          create: userIds ? userIds.map((userId: number) => ({
            user: { connect: { id: userId } }
          })) : []
        }
      },
      include: {
        permissions: true,
        users: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error('Erro ao atualizar grupo:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar o grupo.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID do grupo obrigatório.' }, { status: 400 });
    }

    // Remove todas as associações primeiro
    await prisma.$transaction([
      prisma.userGroup.deleteMany({ where: { groupId: id } }),
      prisma.group.delete({ where: { id } })
    ]);

    return NextResponse.json({ message: 'Grupo removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover grupo:', error);
    return NextResponse.json(
      { error: 'Erro ao remover o grupo.' },
      { status: 500 }
    );
  }
}
