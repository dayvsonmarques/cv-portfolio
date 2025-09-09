import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const permissions = await prisma.permission.findMany();
  return NextResponse.json(permissions);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({ error: 'Nome da permissão obrigatório.' }, { status: 400 });
  }
  const permission = await prisma.permission.create({ data: { name } });
  return NextResponse.json(permission);
}
