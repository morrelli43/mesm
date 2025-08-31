import { Button } from "./ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            {title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <div className="mt-8">
          <Button size="lg">Book a Service</Button>
        </div>
      </div>
    </section>
  );
}
