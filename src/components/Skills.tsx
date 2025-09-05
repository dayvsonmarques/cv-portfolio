'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';

const Skills = () => {
  const { t } = useApp();
  
  const skillCategories = [
    {
      title: t('skills.frontend'),
      skills: [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "HTML/CSS", level: 95 }
      ]
    },
    {
      title: t('skills.backend'),
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "MongoDB", level: 70 },
        { name: "REST APIs", level: 85 },
        { name: "GraphQL", level: 65 }
      ]
    },
    {
      title: t('skills.tools'),
      skills: [
        { name: "Git & GitHub", level: 90 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 65 },
        { name: "Vercel", level: 85 },
        { name: "VSCode", level: 95 },
        { name: "Linux", level: 75 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{t('skills.title')}</h2>
          <div className="w-24 h-1 bg-gray-600 dark:bg-gray-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-200 h-2 rounded-full transition-all duration-1000 ease-out"
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
