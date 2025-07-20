import { Heading, Headline } from "d/components/SmallItems/headings";
import { Accordion } from "d/components/ui/accordion";
import { Button2 } from "d/components/ui/button2";
import ServiceItem from "./service_item";


export default function Services() {
  return (
    <section id="services" className="w-full py-20">
      <div className="section_container px-4 flex flex-col gap-10">
        <header className="w-full grid sm:grid-cols-2 items-end">
          <div className="w-full">
            <Headline className="font-normal text-2xl w-fit">
              My Specialization
            </Headline>
            <Heading
              texts={[
                {
                  type: "odd",
                  text: "Services",
                },
                {
                  type: "even",
                  text: "I Provide",
                },
              ]}
              className="w-fit text-3xl sm:text-4xl"
              cowlick={{
                itemClassName: "!bg-primary",
                className: "scale-75 -right-6.5 top-1",
              }}
            />
          </div>
          <article className="w-full flex items-center justify-end">
            <p className="max-w-sm leading-loose text-accent-content/70">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam
              repellat vel nesciunt ullam possimus dignissimos! Consectetur
            </p>
          </article>
        </header>
        <main className="w-full">
          <Accordion
            type="single"
            collapsible
            className="!flex !flex-col !gap-2"
          >
            <ServiceItem
              index={1}
              item_id="item_1"
              label="Website Development"
              content={{
                description:
                  "Custom, responsive websites built with a mobile‑first mindset to ensure fast performance and seamless user experience across all devices.",
                tags: [
                  "Mobile‑first approach",
                  "Responsive design",
                  "Performance optimization",
                  "Cross‑browser compatibility",
                ],
                image: "/images/web-dev.jpg",
              }}
            />

            <ServiceItem
              index={2}
              item_id="item_2"
              label="Website Management"
              content={{
                description:
                  "Ongoing site maintenance including content updates, security monitoring, regular backups, and performance analytics to keep your site running smoothly.",
                tags: [
                  "Content updates",
                  "Security monitoring",
                  "Backup & recovery",
                  "Performance analytics",
                ],
                image: "/images/web-mentainance.jpg",
              }}
            />

            <ServiceItem
              index={3}
              item_id="item_3"
              label="SEO Optimization"
              content={{
                description:
                  "Comprehensive SEO services—from keyword research and on‑page tweaks to technical audits and link building—to boost your organic search rankings.",
                tags: [
                  "Keyword research",
                  "On‑page optimization",
                  "Link building",
                  "Technical SEO",
                ],
                image: "/images/seo.jpg",
              }}
            />
          </Accordion>
        </main>

        <div className="w-full flex items-center justify-center">
          <Button2
            variant={"dark"}
            className="w-fit h-full duration-300 cursor-pointer isolate p-[2px] rounded-full flex items-center justify-center gap-2"
            text_class="p-3 w-full text-center font-bold flex items-center justify-center bg-primary text-base-100 rounded-full h-full"
            iconRight={{
              icon_name: "arrow-right",
              props: {
                className: "size-full scale-90 duration-300 text-base-100",
              },
              slot_props: {
                className:
                  "bg-accent-content shrink-0 box-border p-2.5 flex items-center justify-center rounded-full h-full aspect-square",
              },
            }}
          >
            View All Services
          </Button2>
        </div>
      </div>
    </section>
  );
}
