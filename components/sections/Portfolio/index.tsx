import { Heading, Headline } from "d/components/SmallItems/headings";
import { Button2 } from "d/components/ui/button2";
import React from "react";

export default function Portfolio() {
  return (
    <section id="portfolio" className="w-full py-20">
      <main className="section_container px-4 flex flex-col gap-10">
        <header className="w-full grid sm:grid-cols-2 items-end">
          <div className="w-full">
            <Headline className="font-normal text-2xl w-fit">
              My Portfolio
            </Headline>
            <Heading
              texts={[
                {
                  type: "even",
                  text: "Let's have a",
                },
                {
                  type: "odd",
                  text: "Look at My Portfolio",
                }
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
        <main className="w-full"></main>

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
            View All Projects
          </Button2>
        </div>
      </main>
    </section>
  );
}
