import { Card, CardContent } from "./ui/card";

interface TestimonialsProps {
  title: string;
  testimonial1: string;
  testimonial2: string;
  testimonial3: string;
}

export function Testimonials({ title, testimonial1, testimonial2, testimonial3 }: TestimonialsProps) {
  const testimonials = [testimonial1, testimonial2, testimonial3];

  const parseTestimonial = (testimonial: string) => {
    const lines = testimonial.split('\n');
    if (lines.length > 1 && lines[0].includes('⭐️')) {
      return {
        stars: lines[0],
        text: lines.slice(1).join('\n')
      };
    }
    return {
      stars: null,
      text: testimonial
    };
  };

  return (
    <section className="w-full py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => {
            const parsed = parseTestimonial(testimonial);
            return (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {parsed.stars ? (
                      <span className="text-yellow-400 text-lg">{parsed.stars}</span>
                    ) : (
                      [...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">⭐</span>
                      ))
                    )}
                  </div>
                  <blockquote className="text-gray-700 italic">
                    {parsed.text}
                  </blockquote>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}