import { FAQ } from "@/components/faq";
import { getFAQContent } from "@/lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Melbourne eScooter Mechanics",
  description: "Frequently asked questions about our eScooter repair services in Melbourne.",
};

export const dynamic = 'force-dynamic';

export default async function FAQPage() {
  const faqItems = await getFAQContent();

  return (
    <div className="container mx-auto py-10">
      <FAQ 
        items={faqItems} 
        title="FAQ – Melbourne eScooter Mechanics" 
      />
    </div>
  );
}