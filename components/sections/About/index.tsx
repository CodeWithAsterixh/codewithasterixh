import { About as AboutDataType } from "d/cms-studio/types";
import Cowlick from "d/components/SmallItems/cowlick";
import { Heading, Headline } from "d/components/SmallItems/headings";
import { Badge } from "d/components/ui/badge";
import { Button2 } from "d/components/ui/button2";
import imageUrlBuilder from "d/lib/imageUrlBuilder";
import { BadgeCheck, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function About({data}:{data:AboutDataType}) {
  const aboutImg = imageUrlBuilder([data.image],{
    width: 1024,
    height: 1440,
    quality: 90,
  })[0];
  return (
    <section id="about" className="w-full bg-base-100 py-20">
      <main className="section_container p-4 grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-2">
        <article className="w-full h-full relative">
          <span className="w-full relative min-h-full pointer-events-none block bg-primary-content aspect-square rounded-b-2xl rounded-t-[50%] honey_comb_bg overflow-hidden">
            <Image
              src={aboutImg}
              alt="image of me looking right"
              width={1024}
              height={1440}
              quality={100}
              className="size-full object-cover object-top drop-shadow-2xl drop-shadow-accent-content"
              style={
                {
                  "--tw-drop-shadow-size":
                    "drop-shadow(-10px 0px 0px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.15)))",
                } as React.CSSProperties
              }
            />
            <Badge className="absolute bottom-2 right-10 bg-accent-content overflow-visible text-base-300 rounded-full !py-2 !pr-4">
            <span className="size-10 p-2 bg-base-300 rounded-full">
              <BadgeCheck className="size-full text-accent-content" />
            </span>
            {data.badgeLabel}
            <Cowlick
              className="absolute -top-2 -right-7 rotate-45"
              itemClassName="bg-primary drop-shadow-xl drop-shadow-primary/30 animate-bounce"
            />
          </Badge>
          </span>
          {/* content */}
          {/* top side */}
          <span className="size-fit aspect-square top-15 -left-2 drop-shadow-xl drop-shadow-base-100/30 absolute px-6 py-4 flex flex-col items-center gap-3 rounded-b-2xl rounded-t-[50%] bg-accent-content">
            <span className="size-10 box-border p-2 bg-primary-content flex items-center justify-center rounded-full drop-shadow-xl drop-shadow-primary/50">
              <Users className="size-full text-accent-content" />
            </span>

            <strong className="text-base-300 text-xs">{data.topStatLabel}</strong>
            <em className="text-xl not-italic text-base-300 font-bitcount font-extrabold scale-125">
              {data.topStatValue}
            </em>
          </span>
        </article>
        <article className="w-full py-4 flex flex-col justify-center gap-10">
          <div className="w-full">
            <Headline className="font-normal text-2xl w-fit">{data.headline}</Headline>
            <Heading
              texts={data.heading}
              className="w-fit text-3xl sm:text-4xl"
              cowlick={{
                className: "scale-75 -right-6.5 top-1",
              }}
            />
          </div>
          <p className="text-accent-content">
           {data.content}
          </p>

          <ul className="grid grid-cols-[repeat(auto-fit,_minmax(10rem,_1fr))] gap-3">
            {data.experiences.map((exp, idx) => (
              <li key={idx} className="flex flex-col gap-2">
                <strong className="font-bold text-2xl">{exp.duration}+</strong>
                <em className="text-accent-content text-xs sm:text-base not-italic">
                  {exp.label}
                </em>
              </li>
            ))}
          </ul>
          <div className="w-full flex items-center gap-3">
            
            <Button2
              variant={"secondary"}
              iconLeft={{
                icon_name: "phone",
                slot_props:{
                    className:"bg-primary !shrink-0 size-10 !text-base-300 box-border p-2 flex items-center justify-center rounded-full"
                }
              }}
              as="a"
              text_class="max-w-[calc((100dvw/2)-4rem)] pr-2 md:max-w-[var(--text-width-md)] truncate text-ellipsis line-clamp-1 shrink"
              className="w-fit gap-2 !bg-base-200 !text-xs !h-fit justify-start md:[--text-width-md:calc(((90dvw/2)/2)-5rem)] xl:[--text-width-md:calc(((72rem/2)/2)-5rem)]  !text-accent-content !p-2 rounded-full"
              href={`tel:${data.phone}`}
            >
              {data.phone}
            </Button2>
            <Button2
              variant={"secondary"}
              iconLeft={{
                icon_name: "mail-open",
                slot_props:{
                    className:"bg-primary !shrink-0 size-10 !text-base-300 box-border p-2 flex items-center justify-center rounded-full"
                }
              }}
              as="a"
              text_class="max-w-[calc((90dvw/2)-5rem)] pr-2 md:max-w-[var(--text-width-md)] truncate text-ellipsis line-clamp-1 shrink"
              className="w-fit gap-2 !bg-base-200 !text-xs md:[--text-width-md:calc(((90dvw/2)/2)-5rem)] xl:[--text-width-md:calc(((72rem/2)/2)-5rem)] !h-fit justify-start !text-accent-content !p-2 rounded-full"
              href={`mailto:${data.email}`}
            >
              {data.email}
            </Button2>
          </div>
        </article>
      </main>
    </section>
  );
}
