import { db } from './db';

export interface FAQItem {
  question: string;
  answer: string;
}

export async function getFAQContent(): Promise<FAQItem[]> {
  try {
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
  } catch (error) {
    console.log('Database not available, using mock FAQ data:', error);
    // Import mock data dynamically to avoid circular dependency
    const { mockFAQContent } = await import('./mock-data');
    
    const faqItems: FAQItem[] = [];
    
    // Extract question-answer pairs from mock data
    for (let i = 1; i <= 10; i++) {
      const question = mockFAQContent[`question_${i}` as keyof typeof mockFAQContent];
      const answer = mockFAQContent[`answer_${i}` as keyof typeof mockFAQContent];
      
      if (question && answer) {
        faqItems.push({ question, answer });
      }
    }

    return faqItems;
  }
}