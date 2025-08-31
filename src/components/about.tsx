interface AboutProps {
  title: string;
  content: string;
}

export function About({ title, content }: AboutProps) {
  const paragraphs = content.split('\n').filter(line => line.trim());

  return (
    <section className="w-full py-20 bg-secondary">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        <div className="mt-6 max-w-3xl mx-auto space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
