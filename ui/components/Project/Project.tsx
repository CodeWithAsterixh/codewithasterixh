"use client";

import { ProjectSchema } from "@/public/files/projects";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, Typography, Chip, Box, Skeleton, Button, Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import Link from "next/link"; // Import Link from next/link
import { MdExpandMore, MdLaunch, MdCode } from "react-icons/md"; // Added more icons from react-icons
import { DiGithub } from "react-icons/di";

type Props = {
  p_id: string;
};

function Project({ p_id }: Props) {
  const [project, setProject] = useState<ProjectSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function getProjectWithId() {
      try {
        const projectWithId: AxiosResponse<ProjectSchema> = await axios.get(
          `/api/projects?id=${p_id}`
        );
        setProject(projectWithId.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false); // Stop loading on error
        setProject(null); // If error, set project to null
        return error;
      }
    }
    getProjectWithId();
  }, [p_id]);

  // Loading skeleton
  if (isLoading) {
    return (
      <Card className="max-w-3xl mx-auto my-6 shadow-lg">
        <div className="relative w-full h-48">
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </div>
        <CardContent>
          <Skeleton variant="text" width="80%" height={40} className="mb-4 !important" />
          <Skeleton variant="text" width="60%" height={30} className="mb-2 !important" />
          <Skeleton variant="text" width="40%" height={30} className="mb-4 !important" />
          <div className="flex flex-wrap gap-2 mb-4">
            <Skeleton variant="rectangular" width={80} height={30} />
            <Skeleton variant="rectangular" width={100} height={30} />
          </div>
          <Skeleton variant="text" width="70%" height={20} className="mb-4 !important" />
          <Skeleton variant="text" width="70%" height={20} className="mb-4 !important" />
        </CardContent>
      </Card>
    );
  }

  // If project not found, show Not Found UI
  if (!project) {
    return (
      <div className="max-w-3xl mx-auto my-6 p-4">
        <Typography variant="h5" className="font-semibold text-lg mb-2 !important">
          Project Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" className="mb-4 !important">
          Sorry, we couldn{`'`}t find the project with ID {p_id}.
        </Typography>
        <Link href="/projects">
          <Button variant="contained" color="primary" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white !important">
            Go Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  // If project is found, show the project details
  return (
    <Card className="max-w-3xl mx-auto my-6 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 !important">
      <div className="relative w-full min-h-[240px] h-48 !important">
        {!imgError ? (
          <Image
            src={project.thumbnail[0]} // Assuming first thumbnail is the main image
            alt={project.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg !important"
            onError={() => setImgError(true)}
          />
        ) : (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        )}
      </div>

      <CardContent>
        <Typography variant="h4" className="font-extrabold text-white mb-4 !important">
          {project.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-2 !important">
          <strong>Project ID:</strong> {project.p_id}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-2 !important">
          <strong>Status:</strong> {project.status}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-2 !important">
          <strong>Current Version:</strong> {project.currentVersion}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-4 !important">
          <strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="mb-4 !important">
          <strong>Finish Date:</strong> {new Date(project.finishDate).toLocaleDateString()}
        </Typography>

        <Accordion className="mb-4 !important" elevation={0} sx={{ backgroundColor: "#fff", borderRadius: "8px !important" }}>
          <AccordionSummary expandIcon={<MdExpandMore />}>
            <Typography variant="body1" className="font-semibold text-lg !important">
              <MdCode className="mr-2" /> Technologies
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="flex flex-wrap gap-2 !important">
              {project.technologies.map((tech, index) => (
                <Chip key={index} label={tech} variant="outlined" size="small" className="bg-blue-600 text-white !important" />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion className="mb-4 !important" elevation={0} sx={{ backgroundColor: "#fff", borderRadius: "8px !important" }}>
          <AccordionSummary expandIcon={<MdExpandMore />}>
            <Typography variant="body1" className="font-semibold text-lg !important">
              <span className="mr-2"><i className="fas fa-file-alt"></i></span> Description
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" className="!important">{project.overview.description}</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className="mb-4 !important" elevation={0} sx={{ backgroundColor: "#fff", borderRadius: "8px !important" }}>
          <AccordionSummary expandIcon={<MdExpandMore />}>
            <Typography variant="body1" className="font-semibold text-lg !important">
              <span className="mr-2"><i className="fas fa-cogs"></i></span> Key Features
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="flex flex-wrap gap-2 !important">
              {project.overview.keyFeatures.map((feature, index) => (
                <Chip key={index} label={feature} variant="outlined" size="small" className="bg-blue-600 text-white !important" />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion className="mb-4 !important" elevation={0} sx={{ backgroundColor: "#fff", borderRadius: "8px !important" }}>
          <AccordionSummary expandIcon={<MdExpandMore />}>
            <Typography variant="body1" className="font-semibold text-lg !important">
              <span className="mr-2"><i className="fas fa-refresh"></i></span> Updates
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {project.updates.map((update) => (
              <Box key={update.id} className="border-t border-gray-300 pt-2 !important">
                <Typography variant="body2" color="text.secondary" className="!important">
                  <strong>Version:</strong> {update.version} -{" "}
                  <span className="italic">{new Date(update.date).toLocaleDateString()}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary" className="!important">
                  <strong>Features:</strong> {update.updateFeatures.join(", ")}
                </Typography>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>

        <div className="flex justify-between items-center !important">
          <Link href={project.url} target="_blank">
            <Button variant="contained" color="primary" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white !important">
              <MdLaunch className="mr-2" /> View Project
            </Button>
          </Link>
          <Link href={project.source} target="_blank">
            <Button variant="contained" color="secondary" className="bg-gradient-to-r from-green-500 to-blue-500 text-white !important">
              <DiGithub className="mr-2" /> View Source
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default Project;