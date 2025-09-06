import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Permissões
  // Cria permissões se não existirem
  await prisma.permission.upsert({
    where: { name: 'admin' },
    update: {},
    create: { name: 'admin' }
  });
  await prisma.permission.upsert({
    where: { name: 'editor' },
    update: {},
    create: { name: 'editor' }
  });
  await prisma.permission.upsert({
    where: { name: 'viewer' },
    update: {},
    create: { name: 'viewer' }
  });

  // Grupos
  const adminGroup = await prisma.group.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      permissions: {
        connect: [{ name: 'admin' }, { name: 'editor' }, { name: 'viewer' }]
      }
    }
  });
  const editorGroup = await prisma.group.upsert({
    where: { name: 'Editor' },
    update: {},
    create: {
      name: 'Editor',
      permissions: {
        connect: [{ name: 'editor' }, { name: 'viewer' }]
      }
    }
  });
  const viewerGroup = await prisma.group.upsert({
    where: { name: 'Viewer' },
    update: {},
    create: {
      name: 'Viewer',
      permissions: {
        connect: [{ name: 'viewer' }]
      }
    }
  });

  // Usuário admin
  const password = await hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@admin.com',
      password,
      groupId: adminGroup.id
    }
  });

  // Usuário editor
  await prisma.user.upsert({
    where: { email: 'editor@editor.com' },
    update: {},
    create: {
      name: 'Editor',
      email: 'editor@editor.com',
      password: await hash('editor123', 10),
      groupId: editorGroup.id
    }
  });

  // Usuário viewer
  await prisma.user.upsert({
    where: { email: 'viewer@viewer.com' },
    update: {},
    create: {
      name: 'Viewer',
      email: 'viewer@viewer.com',
      password: await hash('viewer123', 10),
      groupId: viewerGroup.id
    }
  });

  console.log('Dados iniciais criados!');
}

main().finally(() => prisma.$disconnect());
