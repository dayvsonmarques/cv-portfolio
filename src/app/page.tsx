import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import RecentBlogPosts from '@/components/RecentBlogPosts';
import Footer from '@/components/Footer';
import { cookies, headers } from 'next/headers';
import { getHomeContent } from '@/lib/homeContent';

export default async function Home() {
  const cookieStore = await cookies();
  const requestHeaders = await headers();

  type LanguageKey = 'pt' | 'en' | 'es';

  const cookieLanguage = cookieStore.get('language')?.value as LanguageKey | undefined;

  const detectLanguageFromHeader = (): LanguageKey => {
    const acceptLanguage = requestHeaders.get('accept-language') ?? '';
    const languageCandidates = acceptLanguage
      .split(',')
      .map((part: string) => part.trim().split(';')[0]?.toLowerCase())
      .filter(Boolean) as string[];

    for (const candidate of languageCandidates) {
      if (candidate.startsWith('pt')) return 'pt';
      if (candidate.startsWith('en')) return 'en';
      if (candidate.startsWith('es')) return 'es';
    }

    return 'pt';
  };

  const language: LanguageKey = cookieLanguage ?? detectLanguageFromHeader();
  const homeContent = await getHomeContent(language);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero
        name={homeContent.hero?.name}
        greeting={homeContent.hero?.greeting}
        description={homeContent.hero?.description}
      />
      <About
        sectionTitle={homeContent.about?.sectionTitle}
        headline={homeContent.about?.headline}
        subtitle={homeContent.about?.subtitle}
        description={homeContent.about?.description}
        imageSrc={homeContent.about?.imageSrc}
        imageAlt={homeContent.about?.imageAlt}
      />
      <Skills title={homeContent.skills?.title} categories={homeContent.skills?.categories} />
      <Experience title={homeContent.experience?.title} items={homeContent.experience?.items} />
      <Projects />
      <RecentBlogPosts title={homeContent.blogSection?.title} viewAll={homeContent.blogSection?.viewAll} />
      <Footer />
    </div>
  );
}
