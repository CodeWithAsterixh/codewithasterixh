"use client";
import { RootState } from "@/store/store";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { BiLinkAlt } from "react-icons/bi";
import { GrGithub, GrLinkedin } from "react-icons/gr";
import { PiXLogoBold } from "react-icons/pi";
import { useSelector } from "react-redux";

function SocialTimeLineContentCard({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) {
  return (
    <div className="w-full text-black dark:text-white h-fit bg-black/5 dark:bg-white/5 flex flex-col items-center justify-start gap-2 box-border p-2 shadow-sm border-[1px] border-black/50 rounded-md">
      <Typography
        component="h4"
        className="text-base min-[498px]:text-lg sm:text-xl font-mono after:w-10 relative flex items-center justify-start gap-2 flex-col"
        sx={{
          "&::after": {
            content: '""',
            width: "2.5rem",
            height: "2px",
            backgroundColor: "red",
            opacity: 0.5,
            borderRadius: "full",
            display: "block",
          },
        }}
      >
        {heading}
      </Typography>
      <Typography variant="body2">{content}</Typography>
      <Link href={"https://www.www.com"}>
        <Button
          variant="contained"
          className="w-full min-[498px]:w-fit !p-2 !px-4 !text-xs min-[498px]:!text-sm sm:!text-base !bg-black/70 dark:!bg-white/70 !text-white dark:!text-black !backdrop-blur-md capitalize"
          startIcon={<BiLinkAlt />}
          disableElevation
          type="submit"
        >
          Follow Link
        </Button>
      </Link>
    </div>
  );
}

function SocialsTimeline() {
  const { mode } = useSelector((s: RootState) => s.ThemePreference);
  const t_CF = mode === "light" ? "black" : "white";
  useEffect(() => {
    const observerLeft = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slt-left");
          } else {
            entry.target.classList.remove("animate-slt-left");
          }
        });
      },
      { threshold: 0.8 } // Trigger when 50% of the item is visible
    );
    const observerRight = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slt-right");
          } else {
            entry.target.classList.remove("animate-slt-right");
          }
        });
      },
      { threshold: 0.8 } // Trigger when 50% of the item is visible
    );

    document.querySelectorAll(".observingLeft").forEach((item) => {
      if (item) observerLeft.observe(item);
    });
    document.querySelectorAll(".observingRight").forEach((item) => {
      if (item) observerRight.observe(item);
    });

    return () => {
      observerLeft.disconnect();
      observerRight.disconnect();
    };
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Timeline
        position="alternate"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <TimelineItem
          className="before:!hidden !flex-col min-[500px]:!flex-row !text-center"
          sx={{ width: "100%" }}
        >
          <TimelineOppositeContent
            sx={{
              m: "auto",
              textAlign: "center",
              opacity: 0,
              transform: "translateY(-30px)", // Start with a slight vertical offset
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
            variant="body2"
            color={t_CF}
            className="observingLeft"
          >
            Github
          </TimelineOppositeContent>

          <TimelineSeparator className="!items-center !justify-center !flex-row min-[500px]:!flex-col !text-center">
            <TimelineConnector className="h-[2px] min-[500px]:h-fit w-fit min-[500px]:w-[2px] flex-col !bg-neutral-800/40 dark:!bg-neutral-200/40" />
            <TimelineDot className="!bg-neutral-800">
              <GrGithub />
            </TimelineDot>
            <TimelineConnector className="h-[2px] min-[500px]:h-fit w-fit min-[500px]:w-[2px] !bg-gradient-to-b !from-neutral-800/40 dark:!from-neutral-200/40  !to-purple-500" />
          </TimelineSeparator>

          <TimelineContent
            sx={{
              py: "12px",
              px: 2,
              display: "flex",
              justifyContent: "center",
              width: "100%",
              opacity: 0,
              transform: "translateY(30px)", // Start with a slight vertical offset
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
            className="observingRight"
          >
            <SocialTimeLineContentCard
              heading={"Github"}
              content={"CodeWithAsterixh"}
            />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem
          className="before:!hidden !flex-col min-[500px]:!flex-row-reverse !text-center"
          sx={{ width: "100%" }}
        >
          <TimelineOppositeContent
            sx={{
              m: "auto",
              textAlign: "center",
              opacity: 0,
              transform: "translateY(-30px)", // Start with a slight vertical offset
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
            variant="body2"
            color={t_CF}
            className="observingLeft"
          >
            X
          </TimelineOppositeContent>

          <TimelineSeparator className="!items-center !justify-center !flex-row min-[500px]:!flex-col !text-center">
            <TimelineConnector className="h-[2px] min-[500px]:h-fit w-fit min-[500px]:w-[2px] !bg-purple-500" />
            <TimelineDot className="!bg-purple-500">
              <PiXLogoBold className="!text-black" />
            </TimelineDot>
            <TimelineConnector className="h-[2px] min-[500px]:h-fit w-fit min-[500px]:w-[2px] !bg-gradient-to-b !from-purple-500 !to-blue-500" />
          </TimelineSeparator>

          <TimelineContent
            sx={{
              py: "12px",
              px: 2,
              display: "flex",
              justifyContent: "center",
              width: "100%",
              opacity: 0,
              transform: "translateY(30px)", // Start with a slight vertical offset
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
            className="observingRight"
          >
            <SocialTimeLineContentCard
              heading={"X"}
              content={"AsterixhThanks"}
            />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem
          className="before:!hidden !flex-col min-[500px]:!flex-row !text-center"
          sx={{ width: "100%" }}
        >
          <TimelineOppositeContent
            sx={{
              m: "auto",
              textAlign: "center",
              opacity: 0,
              transform: "translateY(-30px)", // Start with a slight vertical offset
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
            variant="body2"
            color={t_CF}
            className="observingLeft"
          >
            My Linkedin
          </TimelineOppositeContent>

          <TimelineSeparator className="!items-center !justify-center !flex-row min-[500px]:!flex-col !text-center">
            <TimelineConnector className="h-[2px] min-[500px]:h-fit w-fit min-[500px]:w-[2px] bg-blue-500" />
            <TimelineDot className="!bg-blue-500">
              <GrLinkedin />
            </TimelineDot>
            <TimelineConnector className="h-[2px] min-[500px]:h-fit w-fit min-[500px]:w-[2px] !bg-gradient-to-b !from-blue-500 !to-neutral-800/40 dark:!to-neutral-200/40" />
          </TimelineSeparator>

          <TimelineContent
            sx={{
              py: "12px",
              px: 2,
              display: "flex",
              justifyContent: "center",
              width: "100%",
              opacity: 0,
              transform: "translateY(-30px)", // Start with a slight vertical offset
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
            className="observingRight"
          >
            <SocialTimeLineContentCard
              heading={"Linkedin"}
              content={"Peter Paul"}
            />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}

export default SocialsTimeline;
