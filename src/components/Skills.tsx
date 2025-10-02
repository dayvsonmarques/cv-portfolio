'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';

const Skills = () => {
  const { t } = useApp();
  
  const skillCategories = [
    {
      title: t('skills.frontend'),
      skills: [
        { name: "React | Next.js", level: 45 },
        { name: "Vue", level: 35 },
        { name: "JavaScript | TypeScript", level: 70 },
        { name: "Bootstrap", level: 80 },
        { name: "Tailwind css", level: 55 },
        { name: "HTML 5", level: 70 },
        { name: "CSS | SCSS | SASS", level: 65 }
      ]
    },
    {
      title: t('skills.backend'),
      skills: [
        { name: "Node.js", level: 55 },
        { name: "PL/SQL", level: 75 },
        { name: "noSQL", level: 35 },
        { name: "REST APIs", level: 75 },
        { name: "GraphQL", level: 35 },
        { name: "PHP 7/8+", level: 80 },
        { name: "Wordpress", level: 80 },
        { name: "Laravel", level: 65 }
      ]
    },
    {
      title: t('skills.tools'),
      skills: [
        { name: "GitHub", level: 70 },
        { name: "Docker", level: 50 },
        { name: "AWS", level: 45 },
        { name: "Linux", level: 65 },
        { name: "Php Unit", level: 55 },
        { name: "Cursor | Copilot IA", level: 35 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 pt-10 mt-2">
          <h2 className="text-display font-heading font-bold text-black dark:text-white mb-4 tracking-tight">{t('skills.title')}</h2>
          <div className="w-32 h-1 bg-black dark:bg-white mx-auto mb-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-heading font-semibold text-black dark:text-white mb-6 text-center tracking-tight">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="mb-4">
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-800 dark:text-gray-200 font-medium font-body">{skill.name}</span>
                      <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-black dark:bg-white h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
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
