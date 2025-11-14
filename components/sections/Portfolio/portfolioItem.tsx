import { Project } from "d/cms-studio/types";
import { Button2 } from "d/components/ui/button2";
import imageUrlBuilder from "d/lib/imageUrlBuilder";

export function ProjectCard({ project }: { project: Project }) {
  const thumbnailImg = project.thumbnail._type
    ? imageUrlBuilder([project.thumbnail], {
        width: 1024,
        height: 1440,
        quality: 90,
      })[0]
    : null;
  return (
    <article className="flex flex-col gap-4 rounded-lg shadow-lg overflow-hidden bg-base-100 hover:shadow-xl duration-300">
      {thumbnailImg && (
        <img
          src={thumbnailImg}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 h-full flex flex-col gap-2 justify-between">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-accent-content/80 text-sm">{project.excerpt}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-base-300 rounded-full text-base-content"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {project.tools.map((tool, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 border border-base-300 rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block"
          >
            <Button2
              variant="dark"
              className="w-full h-full p-[2px] rounded-full flex items-center justify-center gap-2"
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
              View Project
            </Button2>
          </a>
        )}
      </div>
    </article>
  );
}
