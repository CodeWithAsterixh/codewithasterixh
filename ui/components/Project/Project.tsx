"use client";

import { ProjectSchema } from "@/public/files/projects";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Skeleton,
  Button,
} from "@mui/material";
import { FiArrowRight, FiZap } from "react-icons/fi";
import { DiGithub } from "react-icons/di";
import { AiOutlineCloseCircle } from "react-icons/ai";

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
        `/api/projects?id=${p_id}`
      );
      setProject(projectWithId.data);
      setIsLoading(false);
    }
    getProjectWithId();
  }, [p_id]);

  if (isLoading) {
    return (
      <Card className="mx-auto my-6 shadow-lg bg-gradient-to-r from-neutral-800 via-neutral-500 to-neutral-700">
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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-neutral-800 via-neutral-500 to-neutral-700">
        <AiOutlineCloseCircle className="text-6xl text-red-600 mb-4" />
        <Typography variant="h4" className="text-white mb-4">
          Project not found
        </Typography>
        <Typography variant="body1" className="text-white mb-8">
          It seems like the project you{`'`}re looking for doesn{`'`}t exist.
          Please go back to the projects page to explore other projects.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/projects"
          className="bg-[#75E2FF] hover:bg-[#5689C0] text-white py-2 px-4 rounded-lg"
        >
          Back to Projects <FiArrowRight className="ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="mx-auto my-6 !shadow-none !bg-transparent p-3 flex flex-col gap-3">
      <div className="relative w-full grid  grid-cols-1 md:grid-cols-[20rem_1fr] gap-2">
        <div className="w-full h-96 min-h-full bg-slate-700 relative overflow-hidden rounded-lg">
          {project.thumbnail.length>0&&!imgError ? (
            <Image
              src={project.thumbnail[0]} // Assuming first thumbnail is the main image
              alt={project.name}
              layout="fill"
              objectFit="cover"
              className="size-full"
              onError={() => setImgError(true)}
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          )}
        </div>
        <div className="w-full h-96 min-h-fit bg-slate-300/20 rounded-lg backdrop-blur-lg flex flex-col gap-4 p-2">
          <Typography
            variant="h2"
            className="font-semibold !text-2xl text-white"
          >
            <FiZap className="inline-block mr-2 !text-2xl" />
            {project.name}
          </Typography>

          <Typography variant="body1" className="text-white">
            <strong>Project ID:</strong> {project.p_id}
          </Typography>

          <Typography variant="body1" className="text-white">
            <strong>Status:</strong> {project.status}
          </Typography>

          <Typography variant="body1" className=" text-white">
            <strong>Current Version:</strong> {project.currentVersion}
          </Typography>

          <Typography variant="body1" className="text-white">
            <strong>Start Date:</strong>{" "}
            {new Date(project.startDate).toLocaleDateString()}
          </Typography>

          <Typography variant="body1" className="text-white">
            <strong>Finish Date:</strong>{" "}
            {new Date(project.finishDate).toLocaleDateString()}
          </Typography>

          <div className="flex flex-col gap-2">
            <Typography variant="body1" className="text-white">
              <strong>Technologies:</strong>
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  variant="outlined"
                  size="small"
                  className="!text-white !border-white"
                />
              ))}
            </Box>
          </div>
        </div>
      </div>

      <CardContent className="flex flex-col gap-4 !p-0">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
          <Typography
            variant="body1"
            className="p-3 !text-white bg-neutral-300/20 hover:bg-neutral-700/20 rounded-lg backdrop-blur-lg"
          >
            <strong>Description:</strong> {project.overview.description}
          </Typography>

          <div className="flex flex-col gap-2 bg-neutral-700/20 hover:bg-neutral-300/20 rounded-lg backdrop-blur-lg p-3">
            <Typography
              variant="body1"
              className="!text-white"
            >
              <strong>Key Features:</strong>
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {project.overview.keyFeatures.map((feature, index) => (
                <span
                  key={index}
                  className="!text-white border p-1 rounded-lg bg-neutral-900 border-white line-clamp-none h-fit break-words"
                >
                  {feature}
                </span>
              ))}
            </Box>
          </div>

          <Typography
            variant="body1"
            className=" !text-white bg-neutral-300/20  hover:bg-neutral-700/20 rounded-lg backdrop-blur-lg p-3"
          >
            <strong>Future Goals:</strong>{" "}
            {project.futureGoals.length > 0
              ? project.futureGoals.join(", ")
              : "There's currently no future support as the project is currently not maintained."}
          </Typography>

          <div className="bg-neutral-300/20 hover:bg-neutral-700/20 rounded-lg backdrop-blur-lg p-3">
            <Typography
              variant="body1"
              className="mb-1 !text-white"
            >
              <strong>Updates:</strong>
            </Typography>
            {project.updates.map((update) => (
              <Box key={update.id} className="border-t border-white pt-2">
                <Typography
                  variant="body1"
                  className="!text-white"
                >
                  <strong>Version:</strong> {update.version} -{" "}
                  <span className="italic">
                    {new Date(update.date).toLocaleDateString()}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  className="!text-white"
                >
                  <strong>Features:</strong> {update.updateFeatures.join(", ")}
                </Typography>
              </Box>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 *:grow *:basis-64 justify-between items-center">
          <Button
            variant="contained"
            color="primary"
            href={project.url}
            target="_blank"
            className="!text-neutral-100 hover:!bg-neutral-700/30 !backdrop-blur-lg !bg-neutral-700 py-2 px-4 rounded-lg"
          >
            <FiArrowRight className="mr-2 text-xl" />
            View Project
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href={project.source}
            target="_blank"
            className="!text-neutral-100 !border-neutral-700 hover:!bg-neutral-700/30 !backdrop-blur-lg py-2 px-4 rounded-lg"
          >
            <DiGithub className="mr-2 text-2xl" />
            View Source
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Project;
