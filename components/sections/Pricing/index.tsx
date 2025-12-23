"use client"
import React, { useEffect, useState } from "react";
import { Heading, Headline } from "d/components/SmallItems/headings";
import { Button2 } from "d/components/ui/button2";
import { CheckCircle2, Zap } from "lucide-react";
import { PricingSection, Plan } from "d/cms-studio/types";
import { useGeolocated } from "react-geolocated";

export default function Pricing({ data }: { data: PricingSection }) {
  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: false },
    userDecisionTimeout: 5000,
  });

  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [priceReady, setPriceReady] = useState(false);

  useEffect(() => {
    if (!coords) return;

    const { latitude, longitude } = coords;

    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    )
      .then(res => res.json())
      .then(data => {
        setCountryCode(data.address.country_code?.toUpperCase() || null);
      });
  }, [coords]);

  useEffect(() => {
    if (countryCode) {
      setPriceReady(true);
    }
  }, [countryCode]);

  const formatUSD = (value: number) => {
    return `$${Math.round(value)}`;
  };

  const getDiscountPercent = (plan: Plan) => {
    if (!countryCode || !plan.country_discounts) return null;

    const match = plan.country_discounts.find(
      d => d.countryCode.toUpperCase() === countryCode
    );

    return match ? match.discountedPercent : null;
  };

  const applyDiscount = (value: number, percent: number | null) => {
    if (!percent) return value;
    return value * (1 - percent / 100);
  };

  const getAdjustedPrice = (plan: Plan) => {
    const clean = plan.price.replace(/\s+/g, " ").trim();

    const parse = (val: string) =>
      Number(val.replace("$", "").trim());

    const percent = getDiscountPercent(plan);

    const process = (value: number) => {
      const adjusted = applyDiscount(value, percent);
      return formatUSD(adjusted);
    };

    if (clean.includes("to")) {
      const [min, max] = clean.split("to").map(parse);
      return `${process(min)} to ${process(max)}`;
    }

    if (clean.includes("-")) {
      const [min, max] = clean.split("-").map(parse);
      return `${process(min)} - ${process(max)}`;
    }

    return process(parse(clean));
  };

  const PriceSkeleton = () => (
    <div className="w-32 h-7 rounded bg-base-300 animate-pulse mx-auto mb-1" />
  );

  return (
    <section id="pricing" className="w-full bg-base-100 py-20">
      <main className="section_container px-4 flex flex-col items-center gap-12">
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

              <header className="mb-6 text-center">
                <h3 className="text-xl font-bitcount font-bold mb-2">
                  {plan.name}
                </h3>

                {!priceReady ? (
                  <PriceSkeleton />
                ) : (
                  <p className="text-2xl font-extrabold">
                    {getAdjustedPrice(plan)}
                    <br />
                    <span className="text-sm font-normal ml-1">
                      {plan.duration}
                    </span>
                  </p>
                )}
              </header>

              <ul className="flex-1 space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2
                      className={`size-5 ${
                        plan.highlight
                          ? "text-base-300"
                          : "text-primary"
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
