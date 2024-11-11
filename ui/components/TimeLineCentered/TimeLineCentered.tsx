import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { BiBookReader } from "react-icons/bi";

function TimeLineContentCard({
  heading,
  content,
}: {
  heading: string;
  content: string;
}) {
  return (
    <div className="w-full h-fit bg-black/5 flex flex-col items-start justify-start gap-2 box-border p-2 shadow-sm border-[1px] border-black/50 rounded-md">
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
        {heading}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {content}
      </Typography>
    </div>
  );
}

export const CenteredTimeline = () => {
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
        {[
          {
            date: "2021-2024",
            heading: "@: School Name",
            content: "Studied this and that",
          },
          {
            date: "2024-2025",
            heading: "@: University Name",
            content: "Completed a degree in XYZ",
          },
          {
            date: "2025-Present",
            heading: "@: Job Title",
            content: "Working on ABC projects",
          },
        ].map((item, index) => (
          <TimelineItem key={index} sx={{ width: "100%" }}>
            <TimelineOppositeContent
              sx={{ m: "auto", textAlign: "center" }}
              variant="body2"
              color="text.secondary"
            >
              {item.date}
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <BiBookReader />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent
              sx={{
                py: "12px",
                px: 2,
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
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
