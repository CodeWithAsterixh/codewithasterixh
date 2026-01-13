import { PortfolioSection, Project } from "d/cms-studio/types";
import { Heading, Headline } from "d/components/SmallItems/headings";
import { Button2 } from "d/components/ui/button2";
import React from "react";
import { ProjectCard } from "./portfolioItem";
import Link from "next/link";

export default function Portfolio({ data }: Readonly<{ data: PortfolioSection }>) {
  if(!data||data?.projects?.length <= 0) return null;
  return (
    <section id="portfolio" className="w-full py-20">
      <main className="section_container px-4 flex flex-col gap-10">
        <header className="w-full grid sm:grid-cols-2 items-end gap-6">
          <div className="w-full">
            <Headline className="font-normal text-2xl w-fit">
              {data.headline}
            </Headline>
            <Heading
              texts={data.heading}
              className="w-fit text-3xl sm:text-4xl"
              cowlick={{
                itemClassName: "!bg-primary",
                className: "scale-75 -right-6.5 top-1",
              }}
            />
          </div>
          <article className="w-full flex items-center justify-end">
            <p className="max-w-sm leading-loose text-accent-content/70">
              {data.description}
            </p>
          </article>
        </header>

        <main className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.slice(0,3).map((project: Project, idx) => <ProjectCard key={idx+1} project={project}/>)}
        </main>

        <div className="w-full flex items-center justify-center">
          <Link href="/projects">
            <Button2
              variant="dark"
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
              View All Projects
            </Button2>
          </Link>
        </div>
      </main>
    </section>
  );
}
