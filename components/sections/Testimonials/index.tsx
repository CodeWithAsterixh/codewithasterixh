import React from "react";
import { Heading, Headline } from "d/components/SmallItems/headings";
import { Quote } from "lucide-react";
import { TestimonialsSection } from "d/cms-studio/types";

function NameAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="size-14 flex items-center justify-center rounded-full bg-primary text-base-300 font-bold text-lg">
      {initials}
    </div>
  );
}

export default function Testimonials({data}:{data:TestimonialsSection}) {
  return (
    <section id="testimonials" className="w-full bg-base-200 py-20">
      <main className="section_container px-4 flex flex-col items-center gap-12">
        {/* Section Header */}
        <div className="text-center">
          <Headline className="font-normal text-2xl w-fit mx-auto">
            {data.headline}
          </Headline>
          <Heading
            texts={data.heading}
            className="w-fit text-3xl sm:text-4xl mx-auto"
            cowlick={{
              className: "scale-75 -right-6 top-1",
            }}
          />
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {data.testimonials.map((t, idx) => (
            <article
              key={idx}
              className="relative flex flex-col bg-base-200 border border-base-300 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Quote className="absolute top-4 right-4 size-5 text-primary opacity-70" />

              <div className="flex items-center gap-4 mb-5">
                <NameAvatar name={t.name} />
                <div>
                  <h4 className="text-base font-bold">{t.name}</h4>
                  <p className="text-xs text-accent-content">{t.role}</p>
                </div>
              </div>

              <p className="text-sm text-accent-content mb-5">{t.feedback}</p>

              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-primary text-lg">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - t.rating }).map((_, i) => (
                  <span key={i} className="text-base-300 text-lg">
                    ★
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>
    </section>
  );
}
