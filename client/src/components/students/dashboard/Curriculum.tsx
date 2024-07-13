import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Image from "next/image";
import CourseTimeline from "../CourseTimeline";

export default function OutlinedCard({
  points,
  courseTimeline,
}: {
  points: string[];
  courseTimeline: string;
}) {
  console.log(courseTimeline);
  let parsedTimeline: any;

  try {
    parsedTimeline = JSON.parse(courseTimeline);
  } catch (e) {
    parsedTimeline = [];
  }

  return (
    <Box>
      <Grid
        container
        justifyContent="center"
        alignItems="flex-start"
        padding={4}
        sx={{
          backgroundColor: "rgba(232, 204, 255, 1)",
          height: "100%",
        }}
      >
        <Grid item xs={12} lg={12} mb={12}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Typography
              variant="h4"
              sx={{
                color: "rgba(14, 0, 122, 1)",
                fontWeight: "800",
              }}
            >
              Curriculum
            </Typography>
            <Typography
              sx={{ mb: 1.5, color: "rgba(14, 0, 122, 1)" }}
              color="text.secondary"
            >
              In this course , your child will achieve the following outcomes
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: "2.6" }}>
              {points.map((p) => {
                return <li style={{ color: "#000" }}>{p}</li>;
              })}
            </Typography>
            <br />
            <div>
              {/* <button
                style={{
                  width: "150px",
                  height: "40px",
                  border: "none",
                  backgroundColor: "#884cf8",
                  color: "#ffffff",
                  borderRadius: "20px",
                  fontSize: "15px",
                }}
              >
                Buy Course
              </button> */}

              <Button
                variant="outlined"
                href="#outlined-buttons"
                sx={{
                  // marginLeft: "1em",
                  color: "rgba(136, 76, 248, 1)",
                  border: " 1px solid rgba(136, 76, 248, 1)",
                  borderRadius: "3em",
                }}
              >
                Book a free Trial
              </Button>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} lg={12} md={12} sm={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="h4"
              sx={{
                color: "rgba(14, 0, 122, 1)",
                fontWeight: "800",
              }}
            >
              Course Timeline
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <CourseTimeline timelineComps={parsedTimeline} />
          </Box>
        </Grid>

        {/*  */}
      </Grid>
    </Box>
  );
}
