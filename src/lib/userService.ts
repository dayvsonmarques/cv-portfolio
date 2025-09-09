import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createUser({ name, email, password, groupId }: { name: string; email: string; password: string; groupId?: number }) {
  return prisma.user.create({
    data: { name, email, password, groupId }
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function setResetToken(email: string, token: string) {
  return prisma.user.update({ where: { email }, data: { resetToken: token } });
}

export async function resetPassword(token: string, newPassword: string) {
  const user = await prisma.user.findFirst({ where: { resetToken: token } });
  if (!user) return null;
  return prisma.user.update({ where: { id: user.id }, data: { password: newPassword, resetToken: null } });
}

export async function getUserPermissions(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { group: { include: { permissions: true } } }
  });
  return user?.group?.permissions.map(p => p.name) || [];
}
