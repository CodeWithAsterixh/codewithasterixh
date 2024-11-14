'use client'


import Project from "@/ui/components/Project/Project";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { query } = router;
  
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof query.project === "string") {
      setProjectId(query.project);
    }
  }, [query.project]);

  // Optionally, show a loading state until `projectId` is ready
  if (projectId === null) return <div>Loading...</div>;

  return (
    <div>
      <Project p_id={projectId} />
    </div>
  );
}