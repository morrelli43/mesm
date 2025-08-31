import { Button } from "./ui/button";
import Link from "next/link";

interface FinalCtaProps {
  title: string;
  content: string;
}

export function FinalCta({ title, content }: FinalCtaProps) {
  return (
    <section className="w-full py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {content}
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/book-a-service">Book Your Repair Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}