import { getSanityQuery } from "../../../cms-studio/lib/getSanityQuery";
import { portfolioSectionQuery } from "../../../cms-studio/queries";
import { Portfolio as PortfolioDataType } from "../../../cms-studio/types";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects | Asterixh",
  description: "Explore the portfolio projects of Asterixh, showcasing web development expertise.",
};

export default async function ProjectsPage() {
  const homeData: PortfolioDataType = (await getSanityQuery(portfolioSectionQuery))[0];

  return (
    <main className="min-h-screen pt-20">
      <section className="w-full py-20 bg-base-100">
        {
          homeData.portfolioSection.projects.length>0?<div className="section_container px-4">
          <h1 className="text-4xl font-bold mb-8">All Projects</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.portfolioSection.projects.map((project, idx) => (
              <article key={idx+1} className="flex flex-col gap-4 rounded-lg shadow-lg overflow-hidden bg-base-200 border-2 border-primary-content hover:shadow-xl duration-300">
                {project.thumbnail._type && (
                  <div className="relative w-full h-48">
                    <Image
                      fill
                      src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${project.thumbnail.asset._ref.replace('image-', '').replace('-webp', '.webp').replace('-jpg', '.jpg').replace('-png', '.png')}`}
                      alt={project.title}
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4 h-full flex flex-col gap-2 justify-between">
                  <div className="w-full flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">{project.title}</h2>
                    <p className="text-accent-content/80 text-sm">{project.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx+1}
                          className="text-xs px-2 py-1 bg-base-300 rounded-full text-base-content"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tools.map((tool, toolIdx) => (
                        <span
                          key={toolIdx+1}
                          className="text-xs px-2 py-1 border border-base-300 rounded-full"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/projects/${project.slug?.current||""}`}
                    className="mt-4 inline-block"
                  >
                    <button className="w-full bg-primary-content text-white cursor-pointer hover:text-base-300 hover:bg-primary py-2 px-4 rounded-full hover:bg-primary-focus transition-colors">
                      View Project
                    </button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>:<p className="text-center">No project found</p>
        }
      </section>
    </main>
  );
}
