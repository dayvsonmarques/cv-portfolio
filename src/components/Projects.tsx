'use client';

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import GitHubProjects from './GitHubProjects';

const Projects = () => {
  const { t } = useApp();
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
    <GitHubProjects />
  );
};

export default Projects;
