import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  const { groupId, permissionIds } = await req.json();
  if (!groupId) {
    return NextResponse.json({ error: 'ID do grupo obrigatório.' }, { status: 400 });
  }
  const group = await prisma.group.update({
    where: { id: groupId },
    data: {
      permissions: {
        set: permissionIds?.map((id: number) => ({ id })) || []
      }
    },
    include: { permissions: true }
  });
  return NextResponse.json(group);
}
