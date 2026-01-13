import { Heading, Headline } from "d/components/SmallItems/headings";
import Line from "d/components/ui/line";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import ExperienceItem from "./experience_item";
import { EducationWorkSection } from "d/cms-studio/types";

export default function Experience({ data }: Readonly<{ data: EducationWorkSection }>) {
  return (
    <section id="my_tools" className="py-20">
      <main className="section_container flex flex-col gap-4 p-4 sm:p-0">
        {/* header */}
        <div className="w-full flex gap-4 items-center flex-col">
          <Headline className="font-normal text-2xl w-fit">
            {data.headline}
          </Headline>
          <Heading
            texts={data.heading}
            className="w-fit max-w-fit text-3xl sm:text-4xl"
            cowlick={{
              className: "scale-75 right-0 sm:-right-6.5 top-1",
            }}
          />
        </div>

        <section className="w-full flex gap-10 flex-wrap *:grow *:basis-[20rem] text-accent-content">
          <article className="w-full flex flex-col gap-5 bg-base-300 border-l-4 border-l-primary rounded-3xl p-7 sm:p-10">
            <header className="w-full flex items-center gap-3">
              <span className="size-20 rounded-full bg-primary text-base-300 flex items-center justify-center box-border p-5">
                <GraduationCap className="size-full" />
              </span>
              <strong className="text-xl sm:text-2xl">Education</strong>
            </header>
            <Line />
            <ul className="w-full flex flex-col gap-2">
              {data.education.map((item, idx) => (
                <ExperienceItem
                  key={idx+1}
                  name={item.name}
                  title={item.title}
                  duration={item.duration}
                />
              ))}
            </ul>
          </article>
          <article className="w-full flex flex-col gap-5 bg-base-300 border-l-4 border-l-primary rounded-3xl p-7 sm:p-10">
            <header className="w-full flex items-center gap-3">
              <span className="size-20 rounded-full bg-primary text-base-300 flex items-center justify-center box-border p-5">
                <BriefcaseBusiness className="size-full" />
              </span>
              <strong className="text-xl sm:text-2xl">Work Experience</strong>
            </header>
            <Line />
            <ul className="w-full flex flex-col gap-2">
              {data.work.map((item, idx) => (
                <ExperienceItem
                  key={idx+1}
                  name={item.name}
                  title={item.title}
                  duration={item.duration}
                />
              ))}
            </ul>
          </article>
        </section>
      </main>
    </section>
  );
}
