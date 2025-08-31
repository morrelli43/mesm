import { db } from "@/lib/db";
import { Metadata } from "next";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us - Melbourne eScooter Mechanics",
  description: "Learn about Melbourne's premier eScooter repair service. Professional technicians, mobile repairs, and community-focused service.",
};

export const dynamic = 'force-dynamic';

async function getAboutPageContent() {
  const content = await db
    .selectFrom('page_content')
    .where('page', '=', 'about')
    .selectAll()
    .execute();

  const contentMap = content.reduce((acc, item) => {
    acc[item.section] = item.content;
    return acc;
  }, {} as Record<string, string>);

  return contentMap;
}

export default async function AboutPage() {
  const content = await getAboutPageContent();

  const whyChooseUsPoints = [
    content.why_choose_us_1,
    content.why_choose_us_2,
    content.why_choose_us_3,
    content.why_choose_us_4,
    content.why_choose_us_5,
    content.why_choose_us_6,
    content.why_choose_us_7,
  ].filter(Boolean);

  return (
    <div className="container mx-auto py-10 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
      </div>

      {/* Who We Are Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">{content.who_we_are_title}</h2>
        <div className="text-lg leading-relaxed">
          {content.who_we_are_content?.split('\n\n').map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-4" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">{content.why_choose_us_title}</h2>
        <div className="grid gap-4 md:gap-6">
          {whyChooseUsPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-lg leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">{content.mission_title}</h2>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-lg leading-relaxed">
              {content.mission_content?.split('\n').map((line, index) => (
                <p key={index} className={index > 0 ? "mt-4 font-semibold" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Where We Operate Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">{content.where_we_operate_title}</h2>
        <p className="text-lg leading-relaxed">{content.where_we_operate_content}</p>
      </section>

      {/* Call to Action Section */}
      <section className="text-center bg-gray-50 rounded-lg p-8 space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">👉 {content.cta_text}</h3>
          <p className="text-lg text-gray-600">{content.cta_subtitle}</p>
        </div>
        <Button size="lg" className="mt-4">
          Book Your Repair
        </Button>
      </section>
    </div>
  );
}
