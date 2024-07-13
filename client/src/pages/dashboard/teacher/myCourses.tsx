import { Box, Grid, Theme } from "@mui/material";
import React from "react";
import CourseProgressCard from "../../../components/students/dashboard/CourseProgressCard";
import Timeline from "../../../components/students/dashboard/Timeline";
import { createStyles, makeStyles } from "@mui/styles";
import { H1 } from "../../../components/common/typography";
import { useAuth } from "../../../contexts/AuthContext";
import useGetTeacherCourses from "../../../lib/useGetTeacherCourses";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    time: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  })
);

const TeachersMyCourses: React.FC = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const [course, setCourse] = React.useState<any>();
  const [i, setI] = React.useState();
  const u: any = user;
  const { data }: { data: any } = useGetTeacherCourses();

  const handleSelect = (inx: number) => {
    console.log(inx);
    if (inx === i) {
      setI(null as any);
      setCourse(null as any);
    } else {
      setI(inx as any);
      setCourse(data[inx]);
    }
  };

  const getProgressItems = () => {
    if (Boolean(course?.courseProgress)) {
      return JSON.parse(course?.courseProgress);
    }
    return null;
  };

  return (
    <Box p={2}>
      <Box pb={4}>
        <H1 fontWeight="bold">My Courses & Progress</H1>
      </Box>
      {data && data.length > 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            {data.map((c: any, index: any) => (
              <Box mb={4} key={index}>
                <CourseProgressCard
                  course={c}
                  handleClick={() => handleSelect(index)}
                  index={index}
                  selectedIndex={i!}
                />
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} md={5} className={classes.time}>
            {/* {JSON.stringify(course)} */}
            <Timeline
              wrapped={false}
              courseName={course?.name}
              progressItems={getProgressItems()}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default TeachersMyCourses;
