import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const language = searchParams.get('language');

  const where: {
    section?: string;
    language?: string;
  } = {};
  if (section) where.section = section;
  if (language) where.language = language;

  const contents = await prisma.content.findMany({ where });
  return NextResponse.json(contents);
}

export async function POST(request: Request) {
  const body = await request.json();
  const content = await prisma.content.create({ data: body });
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;
  const content = await prisma.content.update({ where: { id }, data });
  return NextResponse.json(content);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.content.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
