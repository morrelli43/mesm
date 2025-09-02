import { db } from "@/lib/db";
import { mockForSalePageContent } from "@/lib/mock-data";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "For Sale",
};

export const dynamic = 'force-dynamic';

async function getForSalePageContent() {
  try {
    const content = await db
      .selectFrom('page_content')
      .where('page', '=', 'for-sale')
      .selectAll()
      .execute();

    const contentMap = content.reduce((acc, item) => {
      acc[item.section] = item.content;
      return acc;
    }, {} as Record<string, string>);

    return contentMap;
  } catch (error) {
    console.log('Database not available, using mock data:', error);
    return mockForSalePageContent;
  }
}

export default async function ForSalePage() {
    const content = await getForSalePageContent();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
            <p className="text-lg">
                {content.content}
            </p>
        </div>
    );
}
