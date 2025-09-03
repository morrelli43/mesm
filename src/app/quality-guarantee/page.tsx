import { db } from "@/lib/db";
import { Metadata } from "next";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/faq";

export const metadata: Metadata = {
  title: "Quality Guarantee - Melbourne eScooter Mechanics",
  description: "Our quality guarantee for eScooter repairs. Professional service backed by our commitment to excellence and customer satisfaction.",
};

export const dynamic = 'force-dynamic';

async function getQualityGuaranteeContent() {
  const content = await db
    .selectFrom('page_content')
    .where('page', '=', 'quality-guarantee')
    .selectAll()
    .execute();

  const contentMap = content.reduce((acc, item) => {
    acc[item.section] = item.content;
    return acc;
  }, {} as Record<string, string>);

  return contentMap;
}

async function getQualityGuaranteeFAQs() {
  const content = await db
    .selectFrom('page_content')
    .where('page', '=', 'quality-guarantee')
    .where('section', 'like', 'faq_%')
    .selectAll()
    .execute();

  const contentMap = content.reduce((acc, item) => {
    acc[item.section] = item.content;
    return acc;
  }, {} as Record<string, string>);

  const faqItems = [];
  
  // Extract question-answer pairs for FAQ section
  for (let i = 1; i <= 10; i++) {
    const question = contentMap[`faq_question_${i}`];
    const answer = contentMap[`faq_answer_${i}`];
    
    if (question && answer) {
      faqItems.push({ question, answer });
    }
  }

  return faqItems;
}

export default async function QualityGuaranteePage() {
  const content = await getQualityGuaranteeContent();
  const faqItems = await getQualityGuaranteeFAQs();

  const guaranteePoints = [
    content.stand_by_work,
    content.transparency,
    content.no_hidden_costs,
    content.trusted_experience,
    content.independent_advice,
  ].filter(Boolean);

  return (
    <div className="container mx-auto py-10 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {content.intro}
        </p>
      </div>

      {/* What Our Guarantee Means */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">{content.what_means_title}</h2>
        <div className="grid gap-4 md:gap-6">
          {guaranteePoints.map((point, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-lg leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Important to Know */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">{content.important_title}</h2>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">{content.warranty_note}</p>
          </CardContent>
        </Card>
      </section>

      {/* Our Promise to Riders */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">{content.promise_title}</h2>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">{content.promise_content}</p>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      {faqItems.length > 0 && (
        <section className="space-y-6">
          <FAQ 
            items={faqItems} 
            title="Quality Guarantee FAQ" 
            className="bg-gray-50 rounded-lg p-8"
          />
        </section>
      )}

      {/* Call to Action Section */}
      <section className="text-center bg-gray-50 rounded-lg p-8 space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">[{content.cta_text}]</h3>
          <p className="text-lg text-gray-600">{content.cta_subtitle}</p>
        </div>
        <Button size="lg" className="mt-4">
          Book Your Repair
        </Button>
      </section>
    </div>
  );
}