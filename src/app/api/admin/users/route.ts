import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany({ include: { group: true } });
  return NextResponse.json(users);
}

export async function PATCH(req: NextRequest) {
  const { id, name, email, groupId } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'ID do usuário obrigatório.' }, { status: 400 });
  }
  const user = await prisma.user.update({
    where: { id },
    data: { name, email, groupId }
  });
  return NextResponse.json(user);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'ID do usuário obrigatório.' }, { status: 400 });
  }
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ message: 'Usuário removido.' });
}
