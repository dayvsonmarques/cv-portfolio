import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json();
  if (!token || !newPassword) {
    return NextResponse.json({ error: 'Token e nova senha obrigatórios.' }, { status: 400 });
  }
  const user = await prisma.user.findFirst({ where: { resetToken: token } });
  if (!user) {
    return NextResponse.json({ error: 'Token inválido.' }, { status: 404 });
  }
  const hashedPassword = await hash(newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { password: hashedPassword, resetToken: null } });
  return NextResponse.json({ message: 'Senha redefinida com sucesso.' });
}
