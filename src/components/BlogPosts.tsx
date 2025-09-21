import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  image: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
  author?: string;
};

// Imagens fixas do Unsplash para garantir funcionamento
const images = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'acelerando-o-portfolio-nextjs-com-ia',
    title: 'Acelerando o portfólio Next.js com IA',
    image: images[0],
    date: '2025-09-01',
    excerpt: 'Descubra como o Copilot ajudou a criar componentes, resolver bugs e estilizar o layout do portfólio com Tailwind.',
    content: 'Durante o desenvolvimento deste portfólio, o GitHub Copilot foi essencial para gerar componentes como Footer, Header e About. Ele sugeriu soluções para problemas de duplicidade, erros de JSX e até para estilização avançada com Tailwind CSS. A integração com Next.js e TypeScript ficou muito mais fluida, permitindo foco total na experiência do usuário.',
    tags: ['Next.js', 'IA', 'Tailwind', 'Portfólio'],
    author: 'Dayvson Marques',
  },
  {
    id: 2,
    slug: 'refatoracao-inteligente-erros-comuns-e-solucoes',
    title: 'Refatoração inteligente: erros comuns e soluções',
    image: images[1],
    date: '2025-09-03',
    excerpt: 'Veja como o Copilot ajudou a identificar e corrigir duplicidades e erros de sintaxe em componentes React.',
    content: 'Ao longo do projeto, enfrentei problemas de duplicidade e erros de JSX, especialmente no Footer. O Copilot sugeriu patches para remover imports duplicados, corrigir tags e garantir um componente limpo. Isso acelerou o processo de refatoração e garantiu que o código estivesse sempre funcional.',
    tags: ['Refatoração', 'React', 'Boas práticas'],
    author: 'Dayvson Marques',
  },
  {
    id: 3,
    slug: 'tailwind-na-pratica-dicas-de-estilizacao-moderna',
    title: 'Tailwind na prática: dicas de estilização moderna',
    image: images[2],
    date: '2025-09-05',
    excerpt: 'Copilot sugeriu classes Tailwind para gradientes, responsividade e animações, tornando o visual moderno e fluido.',
    content: 'A estilização do Footer e outros componentes foi facilitada pelo Copilot, que sugeriu classes Tailwind para gradientes, espaçamentos e animações. Isso permitiu criar uma interface moderna, responsiva e com transições suaves, sem perder tempo pesquisando na documentação.',
    tags: ['Tailwind', 'CSS', 'Design'],
    author: 'Dayvson Marques',
  },
  {
    id: 4,
    slug: 'navegacao-dinamica-e-rotas-intuitivas',
    title: 'Navegação dinâmica e rotas intuitivas',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    date: '2025-09-07',
    excerpt: 'A adição do menu Blog e navegação entre páginas foi automatizada com sugestões do Copilot.',
    content: 'A inclusão do item Blog no menu principal e a criação da página /blog foram feitas rapidamente com o Copilot. Ele sugeriu como modificar o Menu, adicionar traduções e criar rotas, tornando a navegação do site mais completa e intuitiva.',
    tags: ['Navegação', 'Rotas', 'UX'],
    author: 'Dayvson Marques',
  },
  {
    id: 5,
    slug: 'conteudo-tecnico-automatizado-posts-do-projeto',
    title: 'Conteúdo técnico automatizado: posts do projeto',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    date: '2025-09-10',
    excerpt: 'Os posts do blog foram criados com base na interação do projeto, mostrando o potencial do Copilot para geração de conteúdo.',
    content: 'Os sete posts do blog foram gerados automaticamente pelo Copilot, usando como base toda a interação do projeto. Isso mostra como a IA pode ser usada não só para código, mas também para criar conteúdo técnico relevante e contextualizado.',
    tags: ['Conteúdo', 'Automação', 'IA'],
    author: 'Dayvson Marques',
  },
  {
    id: 6,
    slug: 'resolvendo-problemas-erros-patches-e-aprendizado',
    title: 'Resolvendo problemas: erros, patches e aprendizado',
    image: images[5],
    date: '2025-09-12',
    excerpt: 'Acompanhe como o Copilot ajudou a resolver erros persistentes e sugerir correções eficazes durante o desenvolvimento.',
    content: 'Durante o desenvolvimento, o Copilot foi fundamental para identificar erros persistentes, sugerir patches e garantir que o projeto estivesse sempre funcional. O aprendizado contínuo com a IA tornou o processo mais eficiente e menos frustrante.',
    tags: ['Problemas', 'Correções', 'Aprendizado'],
    author: 'Dayvson Marques',
  },
  {
    id: 7,
    slug: 'integracao-nextjs-e-tailwind-experiencia-real',
    title: 'Integração Next.js e Tailwind: experiência real',
    image: images[6],
    date: '2025-09-15',
    excerpt: 'Relato prático de como Next.js, Tailwind CSS e Copilot se complementam para criar projetos modernos e escaláveis.',
    content: 'A integração entre Next.js, Tailwind CSS e Copilot foi testada na prática neste portfólio. A IA sugeriu soluções para rotas, componentes, estilização e até para problemas de contexto, mostrando como essas ferramentas se complementam para criar projetos modernos e escaláveis.',
    tags: ['Next.js', 'Tailwind', 'Experiência'],
    author: 'Dayvson Marques',
  }
];

const BlogPosts: React.FC = () => {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {blogPosts.map(post => (
        <article key={post.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <Link href={`/blog/${post.slug}`} aria-label={`Ver post: ${post.title}`} prefetch={true}>
            <div className="w-full h-48 relative group">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                priority={true}
                unoptimized
              />
            </div>
          </Link>
          <div className="p-6">
            <Link href={`/blog/${post.slug}`} aria-label={`Ver post: ${post.title}`} prefetch={true}>
              <h2 className="text-2xl font-bold mb-2 text-black dark:text-white hover:text-yellow-500 transition-colors">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags?.map(tag => (
                <span key={tag} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">{tag}</span>
              ))}
            </div>
            <p className="mb-4 text-gray-700 dark:text-gray-300">{post.excerpt}</p>
            <span className="block text-xs text-gray-400 mb-2">Por {post.author}</span>
            <Link href={`/blog/${post.slug}`} className="inline-block px-4 py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600 transition-colors mt-2" aria-label={`Continue lendo: ${post.title}`} prefetch={true}>Continue lendo...</Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogPosts;
