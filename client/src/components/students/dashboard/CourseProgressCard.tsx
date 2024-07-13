import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  linearProgressClasses,
  Link,
  Paper,
  styled,
  Theme,
  Typography,
} from "@mui/material";

import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import useCourse from "../../../lib/useCourse";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      padding: theme.spacing(2),
      marginLeft: theme.spacing(6),
      marginTop: theme.spacing(2),
      fontWeight: "bold",
      fontSize: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(4),
    },
    row: { display: "flex" },
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

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#884CF8" : "#308fe8",
  },
}));

const CourseProgressCard = ({
  course,
  handleClick,
  index,
  selectedIndex,
}: {
  course: any;
  handleClick?: () => void;
  index: number;
  selectedIndex: number | null;
}) => {
  const classes = useStyles();
  const router = useRouter();

  const getProgress = () => {
    if (course?.classesCompleted > course?.numberOfClasses) return 100;
    else return (course?.classesCompleted / course?.numberOfClasses) * 100;
  };

  return (
    <>
      <style jsx global>{`
        .avatar {
          border-radius: 10%;
        }
      `}</style>
      <Paper
        elevation={1}
        className={classes.paper}
        sx={{ boxShadow: "3px 2px 29px -19px rgba(0,0,0,0.75)" }}
        onClick={() => handleClick?.()}
        {...(index === selectedIndex
          ? { style: { backgroundColor: "#F0F0F0", cursor: "pointer" } }
          : { style: { cursor: "pointer" } })}
      >
        <Grid container>
          <Grid item xs={12} md={4}>
            <Image
              width="175px"
              height="120px"
              alt="img"
              src="/dsa.jpg"
              className="avatar"
            />
          </Grid>
          <Grid item container xs={12} md={8}>
            <Grid item container xs={12}>
              <Grid item xs={12} md={8}>
                <Typography
                  sx={{
                    color: "#884CF8",
                    fontSize: "1.4em",
                  }}
                >
                  <b>{course?.name}</b>
                </Typography>
                <Typography>{course?.description}</Typography>
              </Grid>
            </Grid>
            <Box width={"100%"}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "8px" }}>
                      <AccessTimeOutlinedIcon />
                    </div>
                    <div>
                      <Typography>{course?.numberOfClasses} Classes</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "8px" }}>
                      <PeopleAltOutlinedIcon />
                    </div>
                    <div>
                      <Typography>
                        {course?.teacherDetails?.[0]?.name}
                      </Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "8px" }}>
                      <PlaceOutlinedIcon />
                    </div>
                    <div>
                      <Typography>Zoom</Typography>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <BorderLinearProgress
                variant="determinate"
                value={getProgress()}
              />
              <br />
              <Typography color="textSecondary" sx={{ color: "#000" }}>
                {course?.classesCompleted > course?.numberOfClasses
                  ? course?.numberOfClasses
                  : course?.classesCompleted}{" "}
                out {course?.numberOfClasses} classes are completed
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default CourseProgressCard;
