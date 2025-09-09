import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { name, email, password, groupId } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Dados obrigatórios ausentes.' }, { status: 400 });
  }
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return NextResponse.json({ error: 'Usuário já existe.' }, { status: 409 });
  }
  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, groupId }
  });
  return NextResponse.json({ id: user.id, name: user.name, email: user.email, groupId: user.groupId });
}
