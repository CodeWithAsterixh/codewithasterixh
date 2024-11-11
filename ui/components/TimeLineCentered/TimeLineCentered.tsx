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
import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect } from "react";
import { BiBookReader } from "react-icons/bi";
import { useSelector } from "react-redux";
import { threshold } from "./thres";

function TimeLineContentCard({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) {
  return (
    <div className="w-full text-black dark:text-white h-fit bg-black/5 dark:bg-white/5 flex flex-col items-start justify-start gap-2 box-border p-2 shadow-sm border-[1px] border-black/50 rounded-md">
      <Typography
        component="h4"
        className="text-base min-[498px]:text-lg sm:text-xl font-mono after:w-10 relative flex items-start justify-start gap-2 flex-col"
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
        {heading.trim() !== "" ? (
          heading
        ) : (
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "0.5rem" }}
          />
        )}
      </Typography>

      {content.trim() !== "" ? (
        <Typography variant="body2">{content}</Typography>
      ) : (
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ fontSize: "0.25rem" }}
        />
      )}
    </div>
  );
}

export interface cardDatas {
  subtitle: string;
  heading: string;
  content: string;
}
type TLProp = {
  icon?: React.ReactNode;
  datas?: cardDatas[];
};
const datasItems: cardDatas[] = [
  {
    subtitle: "",
    heading: "",
    content: "",
  },
  {
    subtitle: "",
    heading: "",
    content: "",
  },
  {
    subtitle: "",
    heading: "",
    content: "",
  },
];
export const CenteredTimeline = ({
  icon = <BiBookReader className="!text-black" />,
  datas = datasItems,
}: TLProp) => {
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
      { threshold } // Trigger when 50% of the item is visible
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
      { threshold } // Trigger when 50% of the item is visible
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
        {datas.map((item, index) => (
          <TimelineItem
            className="before:!hidden !flex-col min-[500px]:!flex-row even:min-[500px]:!flex-row-reverse"
            key={index}
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
              className="observingLeft"
              color={t_CF}
            >
              {item.subtitle.trim() !== "" ? (
                item.subtitle
              ) : (
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "0.25rem" }}
                />
              )}
            </TimelineOppositeContent>

            <TimelineSeparator className="!items-center !justify-center !flex-row min-[500px]:!flex-col !text-center">
              <TimelineConnector className="h-[2px] min-[500px]:h-fit w-fit min-[500px]:w-[2px]" />
              <TimelineDot>{icon}</TimelineDot>
              <TimelineConnector className="h-[2px] min-[500px]:h-fit w-fit min-[500px]:w-[2px]" />
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
              <TimeLineContentCard
                heading={item.heading}
                content={item.content}
              />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default CenteredTimeline;
