import { TechnologiesSection } from "d/cms-studio/types";
import { Heading, Headline } from "d/components/SmallItems/headings";
import ToolItem from "./tool_item";

export default function MyTools({data}:Readonly<{data:TechnologiesSection}>) {
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
            className="w-fit text-3xl sm:text-4xl gap-2 flex-col sm:flex-row sm:gap-4"
            cowlick={{
              className: "scale-75 -right-6.5 top-1",
            }}
          />
        </div>

        <ul className="justify-center w-full mx-auto flex flex-wrap *:basis-30 *:grow gap-4">
          {
            data.items.map((tool,idx)=><ToolItem key={idx+1} index={idx+1} icon={typeof tool.icon === "string" ?tool.icon:undefined} tool={tool.name} percentage={tool.proficiency}/>)
          }
        </ul>
      </main>
    </section>
  );
}
