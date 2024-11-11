import Skills from "@/ui/components/skills/Skills";
import CenteredTimeline from "@/ui/components/TimeLineCentered/TimeLineCentered";

type Props = object;


function AboutPage({}: Props) {
  return (
    <section className="w-full h-fit flex flex-col items-start justify-start gap-5 p-4 bg-base-white dark:bg-base-black">
      <section className="group text-base-black dark:text-base-white w-full h-fit flex items-start justify-start gap-3 flex-col">
        <div className="w-full h-fit flex items-end justify-between">
          <h1 className="font-bold border-b-4 border-b-transparent group-hover:border-b-base-black duration-200 dark:group-hover:border-b-base-white text-xl min-[498px]:text-2xl sm:text-3xl">
            My Skills
          </h1>
        </div>
        <Skills />
      </section>
      <section className="group text-base-black dark:text-base-white w-full h-fit flex items-center justify-start gap-3 flex-col">
        <div className="w-full h-fit flex items-end justify-between">
          <h1 className="font-bold border-b-4 border-b-transparent group-hover:border-b-base-black duration-200 dark:group-hover:border-b-base-white text-xl min-[498px]:text-2xl sm:text-3xl">
            Education: Learning Map
          </h1>
        </div>
        <CenteredTimeline/>
      </section>

      <section className="group text-base-black dark:text-base-white w-full h-fit flex items-center justify-start gap-3 flex-col">
        <div className="w-full h-fit flex items-end justify-between">
          <h1 className="font-bold border-b-4 border-b-transparent group-hover:border-b-base-black duration-200 dark:group-hover:border-b-base-white text-xl min-[498px]:text-2xl sm:text-3xl">
            Jobs: My Working experience
          </h1>
        </div>
        <CenteredTimeline/>
      </section>
    </section>
  );
}

export default AboutPage;
