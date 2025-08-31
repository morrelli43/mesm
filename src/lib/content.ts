import { db } from './db';

export interface FAQItem {
  question: string;
  answer: string;
}

export async function getFAQContent(): Promise<FAQItem[]> {
  const content = await db
    .selectFrom('page_content')
    .where('page', '=', 'faq')
    .selectAll()
    .execute();

  const contentMap = content.reduce((acc, item) => {
    acc[item.section] = item.content;
    return acc;
  }, {} as Record<string, string>);

  const faqItems: FAQItem[] = [];
  
  // Extract question-answer pairs
  for (let i = 1; i <= 10; i++) {
    const question = contentMap[`question_${i}`];
    const answer = contentMap[`answer_${i}`];
    
    if (question && answer) {
      faqItems.push({ question, answer });
    }
  }

  return faqItems;
}