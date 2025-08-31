interface AboutProps {
  title: string;
  content: string;
}

export function About({ title, content }: AboutProps) {
  return (
    <section className="w-full py-20 bg-secondary">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
          {content}
        </p>
      </div>
    </section>
  );
}
