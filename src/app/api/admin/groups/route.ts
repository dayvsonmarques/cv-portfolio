import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const groups = await prisma.group.findMany({ include: { permissions: true, users: true } });
  return NextResponse.json(groups);
}

export async function POST(req: NextRequest) {
  const { name, permissions } = await req.json();
  if (!name) {
    return NextResponse.json({ error: 'Nome do grupo obrigatório.' }, { status: 400 });
  }
  const group = await prisma.group.create({
    data: {
      name,
      permissions: permissions ? { create: permissions.map((p: string) => ({ name: p })) } : undefined
    }
  });
  return NextResponse.json(group);
}
