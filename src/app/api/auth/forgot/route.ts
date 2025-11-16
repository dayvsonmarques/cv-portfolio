import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'Email obrigatório.' }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 });
  }
  const token = crypto.randomBytes(32).toString('hex');
  await prisma.user.update({ where: { email }, data: { resetToken: token } });
  return NextResponse.json({ message: 'Token de recuperação gerado.', token });
}
