import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const parseQueryParams = (searchParams: URLSearchParams) => {
  const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
  const limit = Math.max(parseInt(searchParams.get('limit') || '10', 10), 1);
  const search = searchParams.get('search') || '';
  const groupId = searchParams.get('groupId') ? parseInt(searchParams.get('groupId')!, 10) : undefined;
  return { page, limit, search, groupId };
};

export async function GET(req: NextRequest) {
  try {
    const { page, limit, search, groupId } = parseQueryParams(req.nextUrl.searchParams);
    const skip = (page - 1) * limit;

    const where: Prisma.PermissionWhereInput = {
      ...(search ? { name: { contains: search } } : {}),
      ...(groupId ? { groupId } : {}),
    };

    const [permissions, total] = await Promise.all([
      prisma.permission.findMany({
        where,
        include: {
          group: true
        },
        skip,
        take: limit,
        orderBy: { name: 'asc' }
      }),
      prisma.permission.count({
        where,
      })
    ]);

    return NextResponse.json({
      permissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar permissões:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar permissões.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, groupId } = await req.json();
    
    if (!name) {
      return NextResponse.json({ error: 'Nome da permissão obrigatório.' }, { status: 400 });
    }

    const existingPermission = await prisma.permission.findFirst({
      where: { name }
    });

    if (existingPermission) {
      return NextResponse.json(
        { error: 'Já existe uma permissão com esse nome.' },
        { status: 400 }
      );
    }

    const permission = await prisma.permission.create({
      data: {
        name,
        group: groupId ? { connect: { id: groupId } } : undefined
      },
      include: { group: true }
    });

    return NextResponse.json(permission);
  } catch (error) {
    console.error('Erro ao criar permissão:', error);
    return NextResponse.json(
      { error: 'Erro ao criar a permissão.' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, name, groupId } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID da permissão obrigatório.' }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: 'Nome da permissão obrigatório.' }, { status: 400 });
    }

    const existingPermission = await prisma.permission.findFirst({
      where: {
        name,
        NOT: { id }
      }
    });

    if (existingPermission) {
      return NextResponse.json(
        { error: 'Já existe outra permissão com esse nome.' },
        { status: 400 }
      );
    }

    const permission = await prisma.permission.update({
      where: { id },
      data: {
        name,
        group: groupId ? { connect: { id: groupId } } : { disconnect: true }
      },
      include: { group: true }
    });

    return NextResponse.json(permission);
  } catch (error) {
    console.error('Erro ao atualizar permissão:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar a permissão.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID da permissão obrigatório.' }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.permission.delete({ where: { id } })
    ]);

    return NextResponse.json({ message: 'Permissão removida com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover permissão:', error);
    return NextResponse.json(
      { error: 'Erro ao remover a permissão.' },
      { status: 500 }
    );
  }
}
