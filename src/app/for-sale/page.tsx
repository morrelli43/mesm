import { db } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "For Sale",
};

async function getForSalePageContent() {
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
