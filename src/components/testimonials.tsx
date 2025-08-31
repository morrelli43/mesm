import { Card, CardContent } from "./ui/card";

interface TestimonialsProps {
  title: string;
  testimonial1: string;
  testimonial2: string;
  testimonial3: string;
}

export function Testimonials({ title, testimonial1, testimonial2, testimonial3 }: TestimonialsProps) {
  const testimonials = [testimonial1, testimonial2, testimonial3];

  const renderStars = () => (
    <div className="flex mb-3">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">⭐</span>
      ))}
    </div>
  );

  return (
    <section className="w-full py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6">
                {renderStars()}
                <blockquote className="text-gray-700 italic">
                  {testimonial}
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}