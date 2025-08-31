interface TrustCredibilityProps {
  title: string;
  content: string;
}

export function TrustCredibility({ title, content }: TrustCredibilityProps) {
  const items = content.split('\n').filter(line => line.trim().startsWith('✔'));

  return (
    <section className="w-full py-20 bg-secondary">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{title}</h2>
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4 text-lg">
            {items.map((item, index) => (
              <li key={index} className="flex items-start justify-center text-left">
                <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✔</span>
                <span>{item.substring(1).trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}