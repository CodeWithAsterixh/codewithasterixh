import React from "react";
import { Heading, Headline } from "d/components/SmallItems/headings";
import { Button2 } from "d/components/ui/button2";
import { CheckCircle2, Zap } from "lucide-react";
import { PricingSection } from "d/cms-studio/types";

// const plans = [
//   {
//     name: "Basic",
//     price: "$80",
//     duration: "per project",
//     features: [
//       "1-page website",
//       "Responsive layout",
//       "Basic SEO setup",
//       "1 week delivery",
//       "2 revisions",
//     ],
//     highlight: false,
//   },
//   {
//     name: "Weekly",
//     price: "$960",
//     duration: "per week",
//     features: [
//       "Up to 5 pages",
//       "CMS integration",
//       "Performance optimization",
//       "Priority support",
//       "Unlimited revisions",
//     ],
//     highlight: true,
//   },
//   {
//     name: "Extended",
//     price: "$2800",
//     duration: "per month",
//     features: [
//       "Full website redesign",
//       "Dashboard & API setup",
//       "SEO optimization",
//       "Dedicated support",
//       "3 months maintenance",
//     ],
//     highlight: false,
//   },
// ];

export default function Pricing({data}:{data:PricingSection}) {
  return (
    <section id="pricing" className="w-full bg-base-100 py-20">
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
              className: "scale-75 -right-7 top-1",
            }}
          />
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {data.plans.map((plan, idx) => (
            <article
              key={idx}
              className={`relative flex flex-col justify-between rounded-2xl border p-8 shadow-lg transition-all duration-300 ${
                plan.highlight
                  ? "bg-primary/50 text-base-300 border-primary-content scale-105"
                  : "bg-base-200 text-accent-content border-base-300"
              }`}
            >
              {plan.highlight && (
                <span className="absolute top-4 right-4 bg-base-300 text-primary text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Zap className="size-4" /> Popular
                </span>
              )}

              <header className="mb-6">
                <h3 className="text-xl font-bitcount font-bold mb-2">{plan.name}</h3>
                <p className="text-2xl font-extrabold">
                  {plan.price}
                  <br />
                  <span className="text-sm font-normal ml-1">
                    {plan.duration}
                  </span>
                </p>
              </header>

              <ul className="flex-1 space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2
                      className={`size-5 ${
                        plan.highlight ? "text-base-300" : "text-primary"
                      }`}
                    />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button2
                variant={plan.highlight ? "secondary" : "default"}
                className={`w-full justify-center py-3 font-semibold ${
                  plan.highlight
                    ? "!bg-base-300 !text-primary hover:opacity-90"
                    : "!bg-primary !text-base-300"
                }`}
                as="a"
                href={`#contact?pricingType=${plan.name.toLowerCase()}`}
              >
                Choose Plan
              </Button2>
            </article>
          ))}
        </div>
      </main>
    </section>
  );
}
