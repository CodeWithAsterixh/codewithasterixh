import { ProjectSchema } from "@/public/files/projects";
import WorkCard, { WorkCardSkeleton } from "./WorkCard";

export function WorkGrid({works}:{works?:ProjectSchema[]}){
   return(
    <div className="w-full grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] items-stretch justify-start gap-2 flex-wrap">
    {works ? (
      works.map((re, id) => (
        <WorkCard
          key={id}
          datas={{
            description: re.overview.description.split(".")[0],
            projectId: re.p_id,
            projectImage: re.thumbnail[0],
            projectName: re.name,
            projectUrl: re.url,
          }}
          index={id+1}
        />
      ))
    ) : (
      <>
        <WorkCardSkeleton />
        <WorkCardSkeleton />
        <WorkCardSkeleton />
      </>
    )}

  </div>
   )
}