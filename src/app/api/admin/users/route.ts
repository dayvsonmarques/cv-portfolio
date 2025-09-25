import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const allowedOrderFields: Array<keyof Prisma.UserOrderByWithRelationInput> = ['name', 'email', 'id'];

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
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar usuário.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get('name') ?? '';
  const email = searchParams.get('email') ?? '';
  const group = searchParams.get('group') ?? '';
  const page = Math.max(parseInt(searchParams.get('page') ?? '1', 10), 1);
  const pageSize = Math.max(parseInt(searchParams.get('pageSize') ?? '5', 10), 1);
  const order = searchParams.get('order') ?? 'name';

  const where: Prisma.UserWhereInput = {
    ...(name && { name: { contains: name } }),
    ...(email && { email: { contains: email } }),
    ...(group && { group: { is: { name: { contains: group } } } }),
  };

  const isDescending = order.startsWith('-');
  const requestedOrderField = (isDescending ? order.slice(1) : order) as keyof Prisma.UserOrderByWithRelationInput;
  const orderField = allowedOrderFields.includes(requestedOrderField) ? requestedOrderField : 'name';
  const orderBy: Prisma.UserOrderByWithRelationInput = {
    [orderField]: isDescending ? 'desc' : 'asc',
  } as Prisma.UserOrderByWithRelationInput;

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
    data: {
      name,
      email,
      groupId: typeof groupId === 'number' ? groupId : groupId ? Number(groupId) : undefined,
    },
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
