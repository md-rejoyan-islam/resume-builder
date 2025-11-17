import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content:
        "The custom domain feature is amazing! My portfolio looks so professional now. Got my dream job at Google!",
      avatar: "👩‍💼",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "Creating cover letters used to take hours. The dashboard keeps everything organized!",
      avatar: "👨‍💻",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Marketing Specialist",
      content:
        "Having all my career documents in a time and peace with my own domain is a game-changer. Highly recommend!",
      avatar: "👩‍🎨",
      rating: 5,
    },
  ];

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20 bg-slate-50 dark:bg-slate-950 ">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-foreground/60">
            Join thousands of successful professionals
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-background p-6"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mb-6 leading-relaxed text-foreground/80">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
