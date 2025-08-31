import { db } from '@/lib/db';
import { mockHomePageContent } from '@/lib/mock-data';
import { Hero } from "@/components/hero";
import { IntroductoryCopy } from "@/components/introductory-copy";
import { About } from "@/components/about";
import { TrustCredibility } from "@/components/trust-credibility";
import { Testimonials } from "@/components/testimonials";
import { FinalCta } from "@/components/final-cta";

export const dynamic = 'force-dynamic';

async function getHomePageContent() {
  try {
    const content = await db
      .selectFrom('page_content')
      .where('page', '=', 'home')
      .selectAll()
      .execute();

    const contentMap = content.reduce((acc, item) => {
      acc[item.section] = item.content;
      return acc;
    }, {} as Record<string, string>);

    return contentMap;
  } catch (error) {
    console.log('Database not available, using mock data:', error);
    return mockHomePageContent;
  }
}

export default async function Home() {
  const content = await getHomePageContent();

  return (
    <main>
      <Hero
        title={content.hero_title}
        subtitle={content.hero_subtitle}
      />
      <IntroductoryCopy
        content={content.intro_content}
      />
      <About
        title={content.about_title}
        content={content.about_content}
      />
      <TrustCredibility
        title={content.trust_title}
        content={content.trust_content}
      />
      <Testimonials
        title={content.testimonials_title}
        testimonial1={content.testimonial_1}
        testimonial2={content.testimonial_2}
        testimonial3={content.testimonial_3}
      />
      <FinalCta
        title={content.final_cta_title}
        content={content.final_cta_content}
      />
    </main>
  );
}
