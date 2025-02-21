// app/projects/[project]/page.tsx

"use client";

import { usePathname} from "next/navigation"; // Import from next/navigation
import Project from "@/ui/components/Project/Project";

export default function Page() {
  const pathname = usePathname();
  const paths = pathname.split('/')
  const currentPath = paths[paths.length-1]
  

  return (
    <div id="project">
      
      <Project p_id={currentPath} />
    </div>
  );
}