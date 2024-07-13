import React from "react";
import { Box, Paper, Theme, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { H2, H4 } from "../../common/typography";
import { createStyles, makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      minHeight: "550px",
    },
    row: { display: "flex" },
    details: { padding: theme.spacing(4), paddingBottom: theme.spacing(1) },
    icon: { padding: theme.spacing(0.5) },
    text: { padding: theme.spacing(0.5), paddingTop: theme.spacing(0.7) },
    button: {
      marginLeft: "auto",
      width: "150px",
      height: "40px",
      border: "none",
      backgroundColor: "#884CF8",
      color: "#ffffff",
      borderRadius: "20px",
      fontSize: "15px",
      lineHeight: "30px",
      marginBottom: "1em",
    },
  })
);

interface CourseProgressCardProps {
  courseName?: string;
  progressItems?: Array<{ label: string; description: string }>;
  wrapped?: Boolean;
}

const CourseProgressCard: React.FC<CourseProgressCardProps> = ({
  courseName,
  progressItems,
  wrapped,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      {Boolean(wrapped) ? (
        <>
          <Timeline position="alternate">
            {progressItems?.map((item) => {
              return (
                <>
                  {" "}
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="body2">{item.label}</Typography>
                      <Typography>{item.description}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                </>
              );
            })}
          </Timeline>
        </>
      ) : (
        <Paper
          elevation={1}
          className={classes.paper}
          sx={{
            boxShadow: "3px 2px 29px -19px rgba(0,0,0,0.75)",
            height: "90%",
          }}
          style={{ cursor: "pointer" }}
        >
          {Boolean(courseName) && Boolean(progressItems) ? (
            <Timeline position="alternate">
              <H2>{courseName}</H2>
              {progressItems?.map((item) => {
                return (
                  <>
                    {" "}
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: "12px", px: 2 }}>
                        <Typography variant="h6" component="span">
                          {item.label}
                        </Typography>
                        <Typography>{item.description}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  </>
                );
              })}
            </Timeline>
          ) : (
            <>
              <Box pl={2}>
                <H4 pb={2}>
                  <b>
                    Please select or click on a course card to preview course
                    timeline.
                  </b>
                </H4>
                <Box>
                  <Box style={{ width: "fit-content", margin: "auto" }}>
                    <Image src={"/select.png"} width={500} height={400} />
                    <Box mb={4} width={"500px"}>
                      <Typography
                        color={theme.palette.text.secondary}
                        align={"center"}
                      >
                        No Course is selected. Click on any course card to
                        preview the timeline details of the course.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Paper>
      )}
    </>
  );
};

export default CourseProgressCard;
