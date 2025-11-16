import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const parseQueryParams = (searchParams: URLSearchParams) => {
  const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
  const limit = Math.max(parseInt(searchParams.get('limit') || '10', 10), 1);
  const search = searchParams.get('search') || '';
  return { page, limit, search };
};

const groupInclude = {
  permissions: true,
  users: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
} satisfies Prisma.GroupInclude;

export async function GET(req: NextRequest) {
  try {
    const { page, limit, search } = parseQueryParams(req.nextUrl.searchParams);
    const skip = (page - 1) * limit;
    const where: Prisma.GroupWhereInput = search ? { name: { contains: search } } : {};

    const [groups, total] = await Promise.all([
      prisma.group.findMany({
        where,
        include: groupInclude,
        skip,
        take: limit,
        orderBy: { name: 'asc' }
      }),
      prisma.group.count({
        where,
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

    const permissionIds = Array.isArray(permissions)
      ? permissions.map((id: number | string) => Number(id)).filter(Number.isFinite)
      : [];
    const usersToAssign = Array.isArray(userIds)
      ? userIds.map((id: number | string) => Number(id)).filter(Number.isFinite)
      : [];
    
    if (!name) {
      return NextResponse.json({ error: 'Nome do grupo obrigatório.' }, { status: 400 });
    }

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
        permissions: permissionIds.length
          ? {
              connect: permissionIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: groupInclude,
    });

    if (usersToAssign.length) {
      await prisma.user.updateMany({
        where: { id: { in: usersToAssign } },
        data: { groupId: group.id },
      });
    }

    const groupWithRelations = await prisma.group.findUnique({
      where: { id: group.id },
      include: groupInclude,
    });

    return NextResponse.json(groupWithRelations ?? group);
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

    const permissionIds = Array.isArray(permissions)
      ? permissions.map((permissionId: number | string) => Number(permissionId)).filter(Number.isFinite)
      : null;
    const usersToAssign = Array.isArray(userIds)
      ? userIds.map((userId: number | string) => Number(userId)).filter(Number.isFinite)
      : null;

    if (!id) {
      return NextResponse.json({ error: 'ID do grupo obrigatório.' }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: 'Nome do grupo obrigatório.' }, { status: 400 });
    }

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

    await prisma.group.update({
      where: { id },
      data: {
        name,
        ...(permissionIds !== null && {
          permissions: {
            set: permissionIds.map((permissionId) => ({ id: permissionId })),
          },
        }),
      },
    });

    if (usersToAssign !== null) {
      await prisma.user.updateMany({
        where: {
          groupId: id,
          ...(usersToAssign.length ? { id: { notIn: usersToAssign } } : {}),
        },
        data: { groupId: null },
      });

      if (usersToAssign.length) {
        await prisma.user.updateMany({
          where: { id: { in: usersToAssign } },
          data: { groupId: id },
        });
      }
    }

    const groupWithRelations = await prisma.group.findUnique({
      where: { id },
      include: groupInclude,
    });

    return NextResponse.json(groupWithRelations);
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

    await prisma.user.updateMany({ where: { groupId: id }, data: { groupId: null } });
    await prisma.group.delete({ where: { id } });

    return NextResponse.json({ message: 'Grupo removido com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover grupo:', error);
    return NextResponse.json(
      { error: 'Erro ao remover o grupo.' },
      { status: 500 }
    );
  }
}
