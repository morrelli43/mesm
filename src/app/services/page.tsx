import { db } from "@/lib/db";
import { mockServicesPageContent } from "@/lib/mock-data";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FAQ } from "@/components/faq";
import { getFAQContent } from "@/lib/content";

export const metadata: Metadata = {
    title: "Our Services",
};

export const dynamic = 'force-dynamic';

async function getServicesPageContent() {
  try {
    const content = await db
      .selectFrom('page_content')
      .where('page', '=', 'services')
      .selectAll()
      .execute();

    const contentMap = content.reduce((acc, item) => {
      acc[item.section] = item.content;
      return acc;
    }, {} as Record<string, string>);

    return contentMap;
  } catch (error) {
    console.log('Database not available, using mock data:', error);
    return mockServicesPageContent;
  }
}

export default async function ServicesPage() {
    const content = await getServicesPageContent();
    const faqItems = await getFAQContent();

    // Group services data
    const services = [
        { title: content.service_1_title, description: content.service_1_content },
        { title: content.service_2_title, description: content.service_2_content },
        { title: content.service_3_title, description: content.service_3_content },
        { title: content.service_4_title, description: content.service_4_content },
        { title: content.service_5_title, description: content.service_5_content },
        { title: content.service_6_title, description: content.service_6_content },
    ];

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            <p className="text-lg mb-8 text-gray-600">
                {content.subtitle}
            </p>
            
            <h2 className="text-2xl font-semibold mb-6">{content.services_title}</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {services.map((service, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-xl">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{service.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="text-center mt-8 mb-12">
                <p className="text-lg mb-4">{content.cta_text}</p>
                <Button asChild size="lg">
                    <Link href="/book-a-service">
                        Book Your Repair Now
                    </Link>
                </Button>
            </div>

            {/* FAQ Section */}
            <FAQ 
                items={faqItems} 
                title="Frequently Asked Questions"
                className="py-0"
            />
        </div>
    );
}