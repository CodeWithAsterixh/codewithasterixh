"use client";

import { ProjectSchema } from "@/public/files/projects";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, Typography, Chip, Box, Skeleton } from "@mui/material";


type Props = {
  p_id: string;
};

function Project({ p_id }: Props) {
  const [project, setProject] = useState<ProjectSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function getProjectWithId() {
      const projectWithId: AxiosResponse<ProjectSchema> = await axios.get(
        `/api/projects/${p_id}`
      );
      setProject(projectWithId.data);
      setIsLoading(false);
    }
    getProjectWithId();
  }, [p_id]);

  if (isLoading) {
    return (
      <Card className="max-w-3xl mx-auto my-6 shadow-lg">
        <div className="relative w-full h-48">
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </div>
        <CardContent>
          <Skeleton variant="text" width="80%" height={40} className="mb-4" />
          <Skeleton variant="text" width="60%" height={30} className="mb-2" />
          <Skeleton variant="text" width="40%" height={30} className="mb-4" />
          <div className="flex flex-wrap gap-2 mb-4">
            <Skeleton variant="rectangular" width={80} height={30} />
            <Skeleton variant="rectangular" width={100} height={30} />
          </div>
          <Skeleton variant="text" width="70%" height={20} className="mb-4" />
          <Skeleton variant="text" width="70%" height={20} className="mb-4" />
        </CardContent>
      </Card>
    );
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <Card className="max-w-3xl mx-auto my-6 shadow-lg">
      <div className="relative w-full h-48">
        {!imgError ? (
          <Image
            src={project.thumbnail[0]} // Assuming first thumbnail is the main image
            alt={project.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            onError={() => setImgError(true)}
          />
        ) : (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        )}
      </div>

      <CardContent>
        <Typography variant="h5" className="font-semibold text-lg mb-2">
          {project.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-2">
          <strong>Project ID:</strong> {project.p_id}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-2">
          <strong>Status:</strong> {project.status}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-2">
          <strong>Current Version:</strong> {project.currentVersion}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-4">
          <strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-4">
          <strong>Finish Date:</strong> {new Date(project.finishDate).toLocaleDateString()}
        </Typography>

        <div className="mb-4">
          <Typography variant="body2" color="text.secondary" className="mb-1">
            <strong>Technologies:</strong>
          </Typography>
          <Box className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <Chip key={index} label={tech} variant="outlined" size="small" />
            ))}
          </Box>
        </div>

        <Typography variant="body2" color="text.secondary" className="mb-2">
          <strong>Description:</strong> {project.overview.description}
        </Typography>

        <div className="mb-4">
          <Typography variant="body2" color="text.secondary" className="mb-1">
            <strong>Key Features:</strong>
          </Typography>
          <Box className="flex flex-wrap gap-2">
            {project.overview.keyFeatures.map((feature, index) => (
              <Chip key={index} label={feature} variant="outlined" size="small" />
            ))}
          </Box>
        </div>

        <Typography variant="body2" color="text.secondary" className="mb-2">
          <strong>Future Goals:</strong> {project.futureGoals.join(", ")}
        </Typography>

        <div className="mb-4">
          <Typography variant="body2" color="text.secondary" className="mb-1">
            <strong>Updates:</strong>
          </Typography>
          {project.updates.map((update) => (
            <Box key={update.id} className="border-t border-gray-300 pt-2">
              <Typography variant="body2" color="text.secondary">
                <strong>Version:</strong> {update.version} -{" "}
                <span className="italic">{new Date(update.date).toLocaleDateString()}</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Features:</strong> {update.updateFeatures.join(", ")}
              </Typography>
            </Box>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <a href={project.url} target="_blank" className="text-blue-600 hover:underline">
            View Project
          </a>
          <a
            href={project.source}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            View Source
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default Project;