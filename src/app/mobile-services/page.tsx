import { db } from "@/lib/db";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Mobile Services",
};

export const dynamic = 'force-dynamic';

async function getMobileServicesPageContent() {
  const content = await db
    .selectFrom('page_content')
    .where('page', '=', 'mobile-services')
    .selectAll()
    .execute();

  const contentMap = content.reduce((acc, item) => {
    acc[item.section] = item.content;
    return acc;
  }, {} as Record<string, string>);

  return contentMap;
}

export default async function MobileServicesPage() {
    const content = await getMobileServicesPageContent();

    return (
        <div className="container mx-auto py-10 max-w-4xl">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-6">{content.title}</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {content.intro}
                </p>
            </div>

            {/* How it Works Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">{content.how_it_works_title}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                                    1
                                </div>
                                <CardTitle className="text-lg">Quick Booking</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">{content.step_1}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                                    2
                                </div>
                                <CardTitle className="text-lg">Schedule Confirmation</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">{content.step_2}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                                    3
                                </div>
                                <CardTitle className="text-lg">Mobile Service</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">{content.step_3}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                                    4
                                </div>
                                <CardTitle className="text-lg">Complete Service</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">{content.step_4}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Why Choose Mobile Repairs Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">{content.why_choose_title}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="text-green-500 text-xl">✓</div>
                        <p className="text-gray-700">{content.benefit_1}</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="text-green-500 text-xl">✓</div>
                        <p className="text-gray-700">{content.benefit_2}</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="text-green-500 text-xl">✓</div>
                        <p className="text-gray-700">{content.benefit_3}</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="text-green-500 text-xl">✓</div>
                        <p className="text-gray-700">{content.benefit_4}</p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-blue-50 p-8 rounded-lg">
                <p className="text-lg mb-4">
                    <span className="text-2xl">👉</span> <strong>{content.cta_text}</strong> – {content.cta_subtitle}
                </p>
                <Link href="/book-a-service">
                    <Button size="lg" className="text-lg px-8 py-3">
                        Book a Mobile Repair Now
                    </Button>
                </Link>
            </div>
        </div>
    );
}
