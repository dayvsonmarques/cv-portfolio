import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const groupId = req.nextUrl.searchParams.get('groupId');
    const userId = req.nextUrl.searchParams.get('userId');

    if (!groupId && !userId) {
      return NextResponse.json({ error: 'Grupo ID ou Usuário ID obrigatório.' }, { status: 400 });
    }

    const userGroups = await prisma.userGroup.findMany({
      where: {
        ...(groupId && { groupId: parseInt(groupId) }),
        ...(userId && { userId: parseInt(userId) })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        group: true
      }
    });

    return NextResponse.json(userGroups);
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

    // Verifica se a associação já existe
    const existingUserGroup = await prisma.userGroup.findFirst({
      where: { userId, groupId }
    });

    if (existingUserGroup) {
      return NextResponse.json(
        { error: 'Usuário já está associado a este grupo.' },
        { status: 400 }
      );
    }

    const userGroup = await prisma.userGroup.create({
      data: { userId, groupId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        group: true
      }
    });

    return NextResponse.json(userGroup);
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

    await prisma.userGroup.deleteMany({
      where: { userId, groupId }
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
