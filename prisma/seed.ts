import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { experiences } from '../src/data/experiences';

const prisma = new PrismaClient();

type LanguageKey = 'pt' | 'en' | 'es';

const HOME_TRANSLATIONS: Record<LanguageKey, {
  hero: { title: string; name: string; greeting: string; description: string };
  about: { title: string; subtitle: string; description: string };
  experience: { title: string };
  blogSection: { title: string; viewAll: string };
  nav: { skills: string };
  skills: { frontend: string; backend: string };
}> = {
  pt: {
    nav: { skills: 'Habilidades' },
    hero: {
      title: 'Dayvson Marques',
      name: 'Desenvolvedor Web',
      greeting: 'sites * lojas Online * aplicações web',
      description:
        'desenvolvimento web moderno, criação de sites responsivos, lojas online e aplicações web. Mais de 15 anos de experiência transformando ideias em soluções digitais.',
    },
    about: {
      title: 'Sobre',
      subtitle: 'Recife/PE * 36 anos * Web Dev',
      description:
        'Graduado em Sistemas de Informação pela UniNabuco (2008 - 2012). Desenvolvedor web a +15 anos, especialista na criação de sites, lojas online e aplicações web (front-end & back-end) usando tecnologias modernas.',
    },
    skills: { frontend: 'Frontend', backend: 'Backend' },
    experience: { title: 'Experiência' },
    blogSection: { title: 'Blog', viewAll: 'Ver todas as postagens' },
  },
  en: {
    nav: { skills: 'Skills' },
    hero: {
      title: 'Dayvson Marques',
      name: 'Full‑Stack Web Developer',
      greeting: 'websites * online stores * web applications',
      description:
        'Modern web development, creating responsive websites, online stores and web applications. Over 15 years of experience turning ideas into digital solutions.',
    },
    about: {
      title: 'About',
      subtitle: 'Web developer * Recife/PE * 36 years old',
      description:
        'Graduated in Information Systems from UniNabuco (2008 - 2012). Web developer for over 15 years, specialist in creating websites, online stores and web applications (front-end & back-end) using modern technologies.',
    },
    skills: { frontend: 'Frontend', backend: 'Backend' },
    experience: { title: 'Experience' },
    blogSection: { title: 'Blog', viewAll: 'View all posts' },
  },
  es: {
    nav: { skills: 'Habilidades' },
    hero: {
      title: 'Dayvson Marques',
      name: 'Desarrollador Web',
      greeting: 'sitios * tiendas en línea * aplicaciones web',
      description:
        'Desarrollo web moderno, creación de sitios responsivos, tiendas online y aplicaciones web. Más de 15 años de experiencia transformando ideas en soluciones digitales.',
    },
    about: {
      title: 'Sobre mí',
      subtitle: 'Recife/PE * 36 años * Desarrollador web',
      description:
        'Graduado en Sistemas de Información por UniNabuco (2008 - 2012). Desarrollador web hace más de 15 años, especializado en crear sitios, tiendas online y aplicaciones web (front-end & back-end) usando tecnologías modernas.',
    },
    skills: { frontend: 'Frontend', backend: 'Backend' },
    experience: { title: 'Experiencia' },
    blogSection: { title: 'Blog', viewAll: 'Ver todas las publicaciones' },
  },
};

const SKILL_CATEGORIES_BASE = [
  {
    key: 'frontend' as const,
    skills: [
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'SASS' },
      { name: 'SCSS' },
      { name: 'UX / UI' },
      { name: 'React' },
      { name: 'Bootstrap' },
      { name: 'Material UI' },
      { name: 'Tailwind CSS' },
      { name: 'React Native' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'NextJS' },
      { name: 'Vue' },
      { name: 'Figma' },
      { name: 'Design Responsivo' },
      { name: 'Design Systems' },
    ],
  },
  {
    key: 'backend' as const,
    skills: [
      { name: 'Node.js' },
      { name: 'PHP' },
      { name: 'Laravel' },
      { name: 'AdonisJS' },
      { name: 'Prisma' },
      { name: 'WordPress' },
      { name: 'WooCommerce' },
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'SQL Server' },
      { name: 'Redis' },
      { name: 'REST APIs' },
      { name: 'GraphQL' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    skills: [
      { name: 'Docker' },
      { name: 'Linux' },
      { name: 'Apache' },
      { name: 'Nginx' },
      { name: 'AWS' },
      { name: 'Google Cloud' },
      { name: 'CI / CD' },
      { name: 'Jenkins' },
      { name: 'CloudWatch' },
      { name: 'Grafana' },
      { name: 'Datadog' },
      { name: 'Sentry' },
    ],
  },
  {
    title: 'Testes & Qualidade',
    skills: [{ name: 'Jest' }, { name: 'React Testing Library' }, { name: 'PHPUnit' }, { name: 'Pest' }],
  },
  {
    title: 'IA & Produtividade',
    skills: [{ name: 'GitHub Copilot' }, { name: 'Cursor AI' }, { name: 'Claude Code' }, { name: 'Bolt' }, { name: 'Low-code' }],
  },
  {
    title: 'Gestão de Projetos & Analytics',
    skills: [
      { name: 'Scrum' },
      { name: 'Kanban' },
      { name: 'XP' },
      { name: 'Jira' },
      { name: 'Trello' },
      { name: 'Hotjar' },
      { name: 'RD Station' },
      { name: 'Google Analytics' },
      { name: 'Page Speed Insights' },
    ],
  },
];

function buildSkillCategories(language: LanguageKey) {
  return SKILL_CATEGORIES_BASE.map((cat: any) => {
    if (cat.key === 'frontend') return { title: HOME_TRANSLATIONS[language].skills.frontend, skills: cat.skills };
    if (cat.key === 'backend') return { title: HOME_TRANSLATIONS[language].skills.backend, skills: cat.skills };
    return { title: cat.title, skills: cat.skills };
  });
}

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

  // Home Content (Hero/Sobre/Skills/Experiência/Blog) - sem Projetos
  const shouldForce = process.env.SEED_HOME_CONTENT === 'true' || process.env.SEED_HOME_CONTENT === '1';
  const sectionsToSeed = ['hero', 'about', 'skills', 'experience', 'blogSection'];
  const existingHomeCount = await prisma.content.count({ where: { section: { in: sectionsToSeed } } });

  if (existingHomeCount > 0 && !shouldForce) {
    console.log(
      `Home content já existe (${existingHomeCount} registros). Pulei seed de home. Para forçar, rode com SEED_HOME_CONTENT=1.`
    );
  } else {
    if (existingHomeCount > 0) {
      await prisma.content.deleteMany({ where: { section: { in: sectionsToSeed } } });
    }

    const languages: LanguageKey[] = ['pt', 'en', 'es'];
    const rows = languages.flatMap((language) => {
      const tr = HOME_TRANSLATIONS[language];
      return [
        {
          section: 'hero',
          language,
          description: tr.hero.description,
          data: { name: tr.hero.name, greeting: tr.hero.greeting },
        },
        {
          section: 'about',
          language,
          title: tr.about.title,
          subtitle: tr.about.subtitle,
          description: tr.about.description,
          data: { headline: tr.hero.title, imageSrc: '/yo-2k25.jpeg', imageAlt: 'Profile' },
        },
        {
          section: 'skills',
          language,
          title: tr.nav.skills,
          data: { categories: buildSkillCategories(language) },
        },
        {
          section: 'experience',
          language,
          title: tr.experience.title,
          data: { items: experiences },
        },
        {
          section: 'blogSection',
          language,
          title: tr.blogSection.title,
          subtitle: tr.blogSection.viewAll,
        },
      ];
    });

    await prisma.content.createMany({
      data: rows as any,
    });

    console.log(`Home content seed concluído (${rows.length} registros).`);
  }

  console.log('Dados iniciais criados!');
}

main().finally(() => prisma.$disconnect());
