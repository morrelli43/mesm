import { db } from '@/lib/db';
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { About } from "@/components/about";
import { QuickMessage } from "@/components/quick-message";

async function getHomePageContent() {
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
}

export default async function Home() {
  const content = await getHomePageContent();

  return (
    <main>
      <Hero
        title={content.hero_title}
        subtitle={content.hero_subtitle}
      />
      <Features
        feature1Title={content.feature_1_title}
        feature1Content={content.feature_1_content}
        feature2Title={content.feature_2_title}
        feature2Content={content.feature_2_content}
        feature3Title={content.feature_3_title}
        feature3Content={content.feature_3_content}
      />
      <About
        title={content.about_title}
        content={content.about_content}
      />
      <QuickMessage
        title={content.quick_message_title}
        disclaimer={content.quick_message_disclaimer}
      />
    </main>
  );
}
