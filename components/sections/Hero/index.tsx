import { socials } from "d/assets/constant_data/socials.data";
import Cowlick from "d/components/SmallItems/cowlick";
import { Heading, Headline } from "d/components/SmallItems/headings";
import HeroSvg from "d/components/SmallItems/heroSvg";
import { Avatar, AvatarFallback, AvatarImage } from "d/components/ui/avatar";
import { Badge } from "d/components/ui/badge";
import { Button } from "d/components/ui/button";
import { Button2 } from "d/components/ui/button2";
import { Quote } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import Image from "next/image";


export default function HeroSection() {
  return (
    <section
      id="#"
      className="w-full min-h-screen pt-40 pb-5 gridline-bg [--bg-size:150px] [--fade:0.02]"
    >
      <span className="max-w-full overflow-hidden flex items-center justify-center font-bitcount text-9xl text-base-100/50 absolute -z-10 w-fit top-24 left-1/2 -translate-x-1/2 pointer-events-none text-nowrap">
        Paul Peter
      </span>
      <div className="w-full flex flex-col gap-4 items-center">
        <Headline>Hello there</Headline>

        <Heading
          texts={[
            {
              type: "even",
              text: "I'm",
            },
            {
              type: "odd",
              text: "Paul Peter",
            },
          ]}
          extendedClasses={{
            odd: "text-primary md:!mt-4",
          }}
          className="!text-4xl sm:!text-5xl md:!text-6xl"
        />

        <p className="text-accent-content">Web developer based in Lagos</p>
      </div>

      {/*  */}
      <section className="w-full mt-24 mb-5">
        <div className="section_container flex gap-7 flex-col items-center relative isolate">
          <aside className="overflow-hidden w-1/3 min-w-[80dvw] min-[498px]:min-w-[400px] md:scale-80 min-[840px]:!scale-[.9] min-[920px]:!scale-[1] md:min-w-[330px] flex z-10 items-center justify-center flex-col aspect-square relative md:absolute md:top-1/2 md:left-1/2 md:-translate-1/2">
            <HeroSvg className="size-full rotate-45 absolute scale-105 top-1/2 left-1/2 -translate-1/2" />
            <span className="size-full absolute -top-5 left-0">
              <Image
                src={"/images/me-cut-1.png"}
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
              <Button2
                className="w-full h-full duration-300 cursor-pointer isolate p-[2px] bg-base-300 rounded-full flex items-center justify-center gap-2"
                text_class="p-3 w-full text-center font-bold flex items-center justify-center bg-base-300 rounded-full h-full"
                iconRight={{
                  icon_name: "arrow-up-right",
                  props: {
                    className: "size-full scale-90 duration-300 text-base-100",
                  },
                  slot_props: {
                    className:
                      "bg-primary shrink-0 box-border border-8 border-base-300 p-1 flex items-center justify-center rounded-full h-full aspect-square",
                  },
                }}
              >
                Portfolio
              </Button2>
              <Button
                variant="outline"
                size="lg"
                className="!size-full !rounded-full !bg-transparent !text-base-300 font-bold !border-base-300"
              >
                Hire Me
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia, voluptates?
                  </p>
                </article>

                <article className="w-full flex flex-col gap-2">
                  <div className="*:data-[slot=avatar]:ring-background flex -space-x-3 *:data-[slot=avatar]:ring-2">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/leerob.png"
                        alt="@leerob"
                      />
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/evilrabbit.png"
                        alt="@evilrabbit"
                      />
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                  </div>
                  <strong className="text-accent-content text-lg">
                    10+ Reviews{" "}
                    <em className="text-base-content not-italic font-normal">
                      (4.9 of 5)
                    </em>
                  </strong>
                  <p className="text-accent-content/70">
                    Reviews from valued clients
                  </p>
                </article>
              </div>
            </section>
            <section className="w-full h-full flex items-center justify-end">
              <div className="w-full md:max-w-[calc((100dvw/3)-4rem)] flex flex-col gap-10 items-end md:gap-24">
                <article className="w-full md:w-fit flex flex-row flex-wrap justify-center md:items-end md:flex-nowrap md:flex-col gap-3">
                  {/* p1 */}
                  <div className="w-fit shrink-0 flex items-center justify-end gap-3">
                    <Badge className="px-4 py-2.5 rounded-full bg-base-300">
                      Prototype
                    </Badge>
                    <Badge className="px-4 py-2.5 rounded-full text-base-300">
                      Dashboard
                    </Badge>
                  </div>
                  {/* p2 */}
                  <div className="w-fit shrink-0 flex items-center justify-end gap-3">
                    <Badge className="size-10 rounded-full">
                      <Cowlick
                        className="scale-70"
                        itemClassName="!bg-base-300"
                        variant="cross"
                      />
                    </Badge>
                    <Badge className="px-4 py-2.5 rounded-full bg-base-300">
                      Mobile App
                    </Badge>
                  </div>
                  {/* p3 */}
                  <div className="w-fit shrink-0 flex items-center justify-end gap-3">
                    <Badge className="px-4 py-2.5 rounded-full text-base-300">
                      Design
                    </Badge>
                    <Badge className="px-4 py-2.5 rounded-full bg-base-300">
                      Website
                    </Badge>
                  </div>
                </article>
                <article className="w-full flex flex-col gap-3 items-center md:items-end">
                  <em className="text-accent-content w-fit not-italic">
                    Follow Us On
                  </em>

                  <ul className="w-fit flex items-center justify-end gap-3">
                    {socials.map((nav, idx) => (
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
