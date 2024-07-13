import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Contact from "../../common/contact";
import Footer from "../../common/footer";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, useTheme } from "@mui/material/styles";
import Book from "./BookCard";
import Curriculum from "./Curriculum";
import { H1 } from "../../common/typography";
import { Course } from "../../../types/Course";
import { useAuth } from "../../../contexts/AuthContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    vdheading: {
      width: "65%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "30px",
      color: "rgb(69, 18, 117)",
      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
      },
      [theme.breakpoints.down("lg")]: {
        width: "90%",
      },
    },
  })
);
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#7125FF"),
  backgroundColor: "#7125FF",
  "&:hover": {
    backgroundColor: "#7125FF",
  },
}));

const ClrButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#a821fc"),
  backgroundColor: "#a821fc",
  "&:hover": {
    backgroundColor: "#a821fc",
  },
}));
interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { user } = useAuth();
  const classes = useStyles();
  const theme = useTheme();
  console.log(course);
  return (
    <>
      <br />
      <br />
      <br />
      <Curriculum
        points={course.curriculum}
        courseTimeline={course.courseTimeline}
      />
      <Grid
        container
        sx={{
          padding: "5em",
          display: "flex",
          justifyContent: "center",

          margin: "0 auto",
        }}
      >
        {/* <div className={classes.vdheading}>
          <H1>Our Expert</H1>
        </div> */}
        <br />
        {/* <Grid
          container
          direction="row"
          sx={{ display: "flex", justifyContent: "center", margin: "0 auto" }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12} sm={6} md={4} lg={4} sx={{ paddingTop: "3em" }}>
            <Card
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                boxShadow: "1px 2px 14px 0px rgba(10, 0, 72, 0.1);",
                borderRadius: "8px",
              }}
            >
              <CardActionArea>
                <CardMedia
                  sx={{ padding: "1.5em", borderRadius: "2em" }}
                  component="img"
                  height="50%"
                  image="https://img.freepik.com/free-photo/education-teachers-university-schools-concept_1258-14246.jpg?size=626&ext=jpg&ga=GA1.1.595728419.1642032000"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ color: "rgb(69, 18, 117)" }}
                  >
                    Lyra Mehreen
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Yoga Tales
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4} sx={{ paddingTop: "3em" }}>
            <Card
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                boxShadow: "1px 2px 14px 0px rgba(10, 0, 72, 0.1);",
                borderRadius: "8px",
              }}
            >
              <CardActionArea>
                <CardMedia
                  sx={{ padding: "1.5em", borderRadius: "2em" }}
                  component="img"
                  height="50%"
                  image="https://img.freepik.com/free-photo/education-teachers-university-schools-concept_1258-14246.jpg?size=626&ext=jpg&ga=GA1.1.595728419.1642032000"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ color: "rgb(69, 18, 117)" }}
                  >
                    Lyra Mehreen
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Yoga Tales
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid> */}
      </Grid>

      <br />

      <Book />
      {!user && <Footer />}
    </>

    // <Card sx={{ maxWidth: 345 }}>
    //     <CardMedia
    //         component="img"
    //         height="140"
    //         image="/static/images/cards/contemplative-reptile.jpg"
    //         alt="green iguana"
    //     />
    //     <CardContent>
    //         <Typography gutterBottom variant="h5" component="div">
    //             {course.name}
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //             {course.description}
    //         </Typography>
    //     </CardContent>
    //     <CardActions>
    //         <Button size="small">Trial</Button>
    //         <Button size="small">Buy Course</Button>
    //     </CardActions>
    // </Card>
  );
};

export default CourseCard;
