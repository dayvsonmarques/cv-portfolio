import bcrypt from 'bcryptjs';
export async function POST(req: NextRequest) {
  const { name, email, password, groupId } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Nome, email e senha são obrigatórios.' }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        groupId: groupId ? Number(groupId) : undefined,
      },
      include: { group: true },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const { searchParams } = new URL(globalThis.location?.href || "http://localhost");
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const group = searchParams.get("group") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "5", 10);
  const order = searchParams.get("order") || "name";

  const where: any = {};
  if (name) where.name = { contains: name, mode: "insensitive" };
  if (email) where.email = { contains: email, mode: "insensitive" };
  if (group) where.group = { name: { contains: group, mode: "insensitive" } };

  let orderBy: any = {};
  if (order.startsWith("-")) {
    orderBy[order.slice(1)] = "desc";
  } else {
    orderBy[order] = "asc";
  }
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: { group: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy,
    }),
    prisma.user.count({ where }),
  ]);
  return NextResponse.json({ users, total });
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
