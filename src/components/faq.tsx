import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FAQItem } from "@/lib/content";

interface FAQProps {
  items: FAQItem[];
  title?: string;
  className?: string;
}

export function FAQ({ items, title = "Frequently Asked Questions", className = "" }: FAQProps) {
  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
        <div className="space-y-6">
          {items.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{item.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}