import { Hero } from "d/cms-studio/types";
import Cowlick from "d/components/SmallItems/cowlick";
import { Heading, Headline } from "d/components/SmallItems/headings";
import HeroSvg from "d/components/SmallItems/heroSvg";
import { Avatar, AvatarFallback, AvatarImage } from "d/components/ui/avatar";
import { Badge } from "d/components/ui/badge";
import { Button } from "d/components/ui/button";
import { Button2 } from "d/components/ui/button2";
import imageUrlBuilder from "d/lib/imageUrlBuilder";
import { cn } from "d/lib/utils";
import { Quote } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ data }: { data: Hero }) {
  const heroMainImage = imageUrlBuilder([data.heroImage], {
    quality: 80,
    format: "webp",
  })[0];
  return (
    <section
      id="#"
      className="w-full min-h-fit pt-40 pb-10 gridline-bg [--bg-size:150px] [--fade:0.02]"
    >
      <span className="max-w-full overflow-hidden flex items-center justify-center font-bitcount text-9xl text-base-100/50 absolute -z-10 w-fit top-24 left-1/2 -translate-x-1/2 pointer-events-none text-nowrap">
        Paul Peter
      </span>
      <div className="w-full flex flex-col gap-4 items-center">
        <Headline>{data.headline || ""}</Headline>

        <Heading
          texts={data.heading || []}
          extendedClasses={{
            odd: "text-primary md:!mt-4",
          }}
          className="!text-4xl sm:!text-5xl md:!text-6xl"
        />

        <p className="text-accent-content">{data.subtext}</p>
      </div>

      {/*  */}
      <section className="w-full mt-24 mb-5">
        <div className="section_container flex gap-7 flex-col items-center relative isolate">
          <aside className="overflow-hidden w-1/3 min-w-[80dvw] min-[498px]:min-w-[400px] md:scale-80 min-[840px]:!scale-[.9] min-[920px]:!scale-[1] md:min-w-[330px] flex z-10 items-center justify-center flex-col aspect-square relative md:absolute md:top-1/2 md:left-1/2 md:-translate-1/2">
            <HeroSvg className="size-full rotate-45 absolute scale-105 top-1/2 left-1/2 -translate-1/2" />
            <span className="size-full absolute -top-5 left-0">
              <Image
                src={heroMainImage}
                alt="my-image"
                width={500}
                height={500}
                className="size-full  object-cover object-top drop-shadow-2xl drop-shadow-background"
              />
            </span>
            <div
              className="w-full grid grid-cols-2
           gap-2 items-center justify-center absolute bottom-0 bg-accent-content shadow-md p-2 rounded-full"
            >
              <Link href={data.primaryCta.href}>
                <Button2
                  className="w-full h-full duration-300 cursor-pointer isolate p-[2px] bg-base-300 rounded-full flex items-center justify-center gap-2"
                  text_class="p-3 w-full text-center font-bold flex items-center justify-center bg-base-300 rounded-full h-full"
                  iconRight={{
                    icon_name: "arrow-up-right",
                    props: {
                      className:
                        "size-full scale-90 duration-300 text-base-100",
                    },
                    slot_props: {
                      className:
                        "bg-primary shrink-0 box-border border-8 border-base-300 p-1 flex items-center justify-center rounded-full h-full aspect-square",
                    },
                  }}
                >
                  {data.primaryCta.label}
                </Button2>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="!size-full !rounded-full !bg-transparent !text-base-300 font-bold !border-base-300"
              >
                <Link
                  className="size-full flex items-center justify-center"
                  href={data.secondaryCta.href}
                >
                  {data.secondaryCta.label}
                </Link>
              </Button>
            </div>
          </aside>
          <main className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 px-4">
            <section className="w-full md:h-full flex items-center">
              <div className="w-full md:h-full md:max-w-[calc((100dvw/3)-4rem)] flex flex-row *:basis-[200px] *:grow md:*:grow-[unset] md:*:basis-[unset] flex-wrap md:flex-nowrap md:flex-col md:justify-between gap-10 md:gap-24">
                {/* quote */}
                <article className="w-full flex flex-col gap-2 bg-conic-30 from-background to-transparent">
                  <Quote />
                  <p className="text-accent-content/70 leading-loose">
                    {data.quote}
                  </p>
                </article>

                <article className="w-full flex flex-col gap-2">
                  <div className="*:data-[slot=avatar]:ring-background flex -space-x-3 *:data-[slot=avatar]:ring-2">
                    {data.reviews.avatars.map((avatar, idx) => (
                      <Avatar
                        key={idx}
                        className="size-10 rounded-full bg-base-300"
                      >
                        <AvatarImage
                          src={
                            imageUrlBuilder([avatar], {
                              quality: 80,
                              format: "webp",
                            })[0]
                          }
                          alt={`Avatar ${idx + 1}`}
                        />
                        <AvatarFallback>PP</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <strong className="text-accent-content text-lg">
                    {data.reviews.count}+ Reviews{" "}
                    <em className="text-base-content not-italic font-normal">
                      ({data.reviews.rating} of 5 ratings)
                    </em>
                  </strong>
                  <p className="text-accent-content/70">{data.reviews.label}</p>
                </article>
              </div>
            </section>
            <section className="w-full h-full flex items-center justify-end">
              <div className="w-full md:max-w-[calc((100dvw/3)-4rem)] flex flex-col gap-10 items-end md:gap-24">
                <article className="w-full md:w-fit flex flex-row flex-wrap justify-center md:items-end md:flex-nowrap md:flex-col gap-3">
                  {/* p1 */}
                  {data.badgesGroup.map((badgeGroup, bg_idx) => (
                    <div
                      key={badgeGroup._key}
                      className="w-fit shrink-0 flex items-center justify-end gap-3"
                    >
                      {badgeGroup.items
                        .filter((i) => i)
                        .map((item, idx) => {
                          // Determine color flip based on row index
                          const isEven = (idx + bg_idx) % 2 === 0;

                          return (
                            <Badge
                              key={idx}
                              className={cn(
                                "px-4 py-2.5 rounded-full",
                                item.toLowerCase() === "star_icon"
                                  ? "size-10 rounded-full"
                                  : isEven
                                  ? "bg-base-300 text-foreground"
                                  : "bg-primary text-base-300"
                              )}
                            >
                              {item.toLowerCase() !== "star_icon" ? (
                                item
                              ) : (
                                <Cowlick
                                  className="scale-70"
                                  variant="cross"
                                  itemClassName="bg-base-300"
                                />
                              )}
                            </Badge>
                          );
                        })}
                    </div>
                  ))}
                </article>
                <article className="w-full flex flex-col gap-3 items-center md:items-end">
                  <em className="text-accent-content w-fit not-italic">
                    {data.followText}
                  </em>

                  <ul className="w-fit flex items-center justify-end gap-3">
                    {data.socials.map((nav, idx) => (
                      <li
                        key={idx}
                        className="size-10 rounded-full overflow-hidden flex items-center justify-center bg-base-300"
                      >
                        <a
                          href={nav.href}
                          className="size-full box-border p-2 flex items-center justify-center"
                        >
                          <DynamicIcon name={nav.icon} className="size-full" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          </main>
        </div>
      </section>
    </section>
  );
}
