import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const groupId = req.nextUrl.searchParams.get('groupId');
    const userId = req.nextUrl.searchParams.get('userId');

    if (!groupId && !userId) {
      return NextResponse.json({ error: 'Grupo ID ou Usuário ID obrigatório.' }, { status: 400 });
    }

    const filters: Prisma.UserWhereInput = {
      ...(groupId && { groupId: Number(groupId) }),
      ...(userId && { id: Number(userId) })
    };

    const users = await prisma.user.findMany({
      where: filters,
      select: {
        id: true,
        name: true,
        email: true,
        group: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Erro ao buscar associações usuário-grupo:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar associações usuário-grupo.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, groupId } = await req.json();

    if (!userId || !groupId) {
      return NextResponse.json({ error: 'Usuário ID e Grupo ID são obrigatórios.' }, { status: 400 });
    }

    const userIdNumber = Number(userId);
    const groupIdNumber = Number(groupId);

    const user = await prisma.user.findUnique({
      where: { id: userIdNumber },
      select: { id: true, groupId: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 });
    }

    if (user.groupId === groupIdNumber) {
      return NextResponse.json(
        { error: 'Usuário já está associado a este grupo.' },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userIdNumber },
      data: { groupId: groupIdNumber },
      select: {
        id: true,
        name: true,
        email: true,
        group: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Erro ao criar associação usuário-grupo:', error);
    return NextResponse.json(
      { error: 'Erro ao criar associação usuário-grupo.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId, groupId } = await req.json();

    if (!userId || !groupId) {
      return NextResponse.json({ error: 'Usuário ID e Grupo ID são obrigatórios.' }, { status: 400 });
    }

    await prisma.user.updateMany({
      where: { id: Number(userId), groupId: Number(groupId) },
      data: { groupId: null },
    });

    return NextResponse.json({ message: 'Associação removida com sucesso.' });
  } catch (error) {
    console.error('Erro ao remover associação usuário-grupo:', error);
    return NextResponse.json(
      { error: 'Erro ao remover associação usuário-grupo.' },
      { status: 500 }
    );
  }
}
