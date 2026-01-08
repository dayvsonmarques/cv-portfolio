'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';

type SkillCategory = { title: string; skills: { name: string }[] };

type SkillsProps = {
  title?: string;
  categories?: SkillCategory[];
};

const Skills = ({ title, categories }: SkillsProps) => {
  const { t } = useApp();
  
  const skillCategories: SkillCategory[] = categories ?? [
    {
      title: t('skills.frontend'),
      skills: [
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "SASS" },
        { name: "SCSS" },
        { name: "UX / UI" },
        { name: "React" },
        { name: "Bootstrap" },
        { name: "Material UI" },
        { name: "Tailwind CSS" },
        { name: "React Native" },
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "NextJS" },
        { name: "Vue" },
        { name: "Figma" },
        { name: "Design Responsivo" },
        { name: "Design Systems" }
      ]
    },
    {
      title: t('skills.backend'),
      skills: [
        { name: "Node.js" },
        { name: "PHP" },
        { name: "Laravel" },
        { name: "AdonisJS" },
        { name: "Prisma" },
        { name: "WordPress" },
        { name: "WooCommerce" },
        { name: "MySQL" },
        { name: "PostgreSQL" },
        { name: "MongoDB" },
        { name: "SQL Server" },
        { name: "Redis" },
        { name: "REST APIs" },
        { name: "GraphQL" }
      ]
    },
    {
      title: "DevOps & Cloud",
      skills: [
        { name: "Docker" },
        { name: "Linux" },
        { name: "Apache" },
        { name: "Nginx" },
        { name: "AWS" },
        { name: "Google Cloud" },
        { name: "CI / CD" },
        { name: "Jenkins" },
        { name: "CloudWatch" },
        { name: "Grafana" },
        { name: "Datadog" },
        { name: "Sentry" }
      ]
    },
    {
      title: "Testes & Qualidade",
      skills: [
        { name: "Jest" },
        { name: "React Testing Library" },
        { name: "PHPUnit" },
        { name: "Pest" }
      ]
    },
    {
      title: "IA & Produtividade",
      skills: [
        { name: "GitHub Copilot" },
        { name: "Cursor AI" },
        { name: "Claude Code" },
        { name: "Bolt" },
        { name: "Low-code" }
      ]
    },
    {
      title: "Gestão de Projetos & Analytics",
      skills: [
        { name: "Scrum" },
        { name: "Kanban" },
        { name: "XP" },
        { name: "Jira" },
        { name: "Trello" },
        { name: "Hotjar" },
        { name: "RD Station" },
        { name: "Google Analytics" },
        { name: "Page Speed Insights" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="w-full px-[30px]">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-gray-800 dark:text-white mb-4">
            {title ?? t('nav.skills')}
          </h2>
          <div className="w-24 h-1 bg-black dark:bg-white mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {category.skills.map((skill, skillIdx) => (
                  <span 
                    key={skillIdx}
                    className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
