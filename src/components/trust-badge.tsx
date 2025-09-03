import { Button } from "./ui/button";
import Link from "next/link";

interface TrustBadgeProps {
  title: string;
  content: string;
}

export function TrustBadge({ title, content }: TrustBadgeProps) {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            {content}
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/quality-guarantee">Read more.</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}