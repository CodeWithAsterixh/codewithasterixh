import { Heading, Headline } from "d/components/SmallItems/headings";
import { IconName } from "tech-stack-icons";
import ToolItem from "./tool_item";
const my_tools:{
  tool:string;
  percentage:number;
  icon:IconName;
}[] = [
  {
    icon:"figma",
    percentage:60,
    tool:"Figma"
  },
  {
    icon:"vscode",
    percentage:100,
    tool:"Vscode"
  },
  {
    icon:"nextjs",
    percentage:90,
    tool:"Next js"
  },
  {
    icon:"nuxtjs",
    percentage:480,
    tool:"Nuxt js"
  },
  {
    icon:"tailwindcss",
    percentage:98,
    tool:"React & vue"
  },
  {
    icon:"shadcnui",
    percentage:90,
    tool:"Shadcn"
  }
]
export default function MyTools() {
  return (
    <section id="my_tools" className="py-20">
      <main className="section_container flex flex-col gap-4 p-4 sm:p-0">
        {/* header */}
        <div className="w-full flex gap-4 items-center flex-col">
          <Headline className="font-normal text-2xl w-fit">
            My Favorite Technologies
          </Headline>
          <Heading
            texts={[
              {
                type: "even",
                text: "Tools & Services That",
              },
              {
                type: "odd",
                text: "Power My Work",
              },
            ]}
            className="w-fit text-3xl sm:text-4xl gap-2 flex-col sm:flex-row sm:gap-4"
            cowlick={{
              className: "scale-75 -right-6.5 top-1",
            }}
          />
        </div>

        <ul className="justify-center w-full mx-auto grid grid-cols-[repeat(auto-fit,_minmax(8rem,_1fr))] gap-4">
          {
            my_tools.map((tool,idx)=><ToolItem key={idx} index={idx+1} {...tool}/>)
          }
        </ul>
      </main>
    </section>
  );
}
