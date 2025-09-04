'use client';

import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Plataforma de e-commerce completa com carrinho de compras, sistema de pagamentos e painel administrativo. Desenvolvida com Next.js, Stripe e PostgreSQL.",
      image: "🛒",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Stripe", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Task Management App",
      description: "Aplicativo de gerenciamento de tarefas com funcionalidades de drag-and-drop, colaboração em tempo real e notificações push.",
      image: "📋",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      title: "Portfolio Website",
      description: "Site portfólio responsivo e moderno para um designer, com galeria interativa e formulário de contato integrado.",
      image: "🎨",
      technologies: ["Next.js", "Tailwind", "Framer Motion", "EmailJS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Weather Dashboard",
      description: "Dashboard meteorológico com previsões detalhadas, mapas interativos e alertas personalizados para múltiplas cidades.",
      image: "🌤️",
      technologies: ["React", "Chart.js", "OpenWeather API", "Styled Components"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Social Media Dashboard",
      description: "Dashboard para análise de redes sociais com métricas em tempo real, gráficos interativos e relatórios automatizados.",
      image: "📊",
      technologies: ["Vue.js", "D3.js", "Express.js", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      title: "Chat Application",
      description: "Aplicativo de chat em tempo real com salas privadas, compartilhamento de arquivos e emojis personalizados.",
      image: "💬",
      technologies: ["React", "Socket.io", "Node.js", "JWT"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Projetos</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Aqui estão alguns dos projetos que desenvolvi, demonstrando minhas 
            habilidades e experiência em diferentes tecnologias.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8 text-center">Projetos em Destaque</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="text-6xl mb-4 text-center">{project.image}</div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{project.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a 
                      href={project.liveUrl}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
                    >
                      Ver Demo
                    </a>
                    <a 
                      href={project.githubUrl}
                      className="flex-1 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 py-2 px-4 rounded-lg text-center hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8 text-center">Outros Projetos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                <div className="text-4xl mb-3 text-center">{project.image}</div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{project.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <a 
                    href={project.liveUrl}
                    className="flex-1 text-blue-600 dark:text-blue-400 text-sm text-center py-2 hover:underline"
                  >
                    Demo
                  </a>
                  <a 
                    href={project.githubUrl}
                    className="flex-1 text-gray-600 dark:text-gray-400 text-sm text-center py-2 hover:underline"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
