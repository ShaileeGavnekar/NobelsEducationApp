import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, useTheme } from "@mui/material/styles";
import { H1 } from "../../common/typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    coursesContainer: {
      height: "40vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        height: "90vh",
      },
      [theme.breakpoints.down("md")]: {
        height: "100%",
      },
    },

    courseshero: {
      width: "65%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      // gap: "30px",
      color: "rgb(69, 18, 117)",
      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
      },
      [theme.breakpoints.down("lg")]: {
        width: "90%",
      },
    },

    coursesheading: {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "700",
      fontSize: "1.5rem",
      color: "#0E007A",
    },

    courseboxes: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      marginTop: "auto",
      marginBottom: "auto",
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        gap: "30px",
        alignItems: "center",
        justifyContent: "center",
      },
    },

    coursebox1: {
      width: theme.spacing(30),
      height: theme.spacing(22),
      background:
        "linear-gradient(180deg, rgba(159, 125, 255, 0.5) 0%, rgba(206, 189, 255, 0.5) 100%)",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "1em",

      // [theme.breakpoints.down('sm')]: {
      //   width: '200px',
      // },
    },

    imgcr: {
      height: "25px",
      width: "25px",
    },

    boxp: {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "600",
      fontsize: "0.78rem",
      color: "#6838F0",
    },

    cd: {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "600",
      fontsize: "0.78rem",

      color: "#FF67D5",
    },

    cr: {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "600",
      fontsize: "0.78rem",

      color: "#1ABAFA",
    },

    cf: {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "600",
      fontsize: "0.78rem",

      color: "#FF9731",
    },

    cl1: {
      width: theme.spacing(30),
      height: theme.spacing(22),
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "1em",
      background:
        "linear-gradient(180deg, rgba(254, 137, 222, 0.5) 0%, rgba(255, 149, 226, 0.5) 100%)",
    },

    cl2: {
      width: theme.spacing(30),
      height: theme.spacing(22),
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "1em",
      background:
        "linear-gradient(180deg, rgba(125, 218, 255, 0.5) 0%, rgba(204, 240, 255, 0.5) 100%)",
    },

    cl3: {
      width: theme.spacing(30),
      height: theme.spacing(22),
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "1em",
      background:
        "linear-gradient(180deg, rgba(255, 202, 150, 0.5) 0%, rgba(255, 204, 153, 0.5) 100%)",
    },
  })
);

const Courses = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.coursesContainer}>
      <div className={classes.courseshero}>
        {/* <H1 className={classes.courseshero}>Our Courses</H1> */}

        <div className={classes.courseboxes}>
          <div
            className={classes.coursebox1}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h1>12</h1>

            <p style={{ marginTop: "-1em" }}>Classes</p>
          </div>

          <div
            className={classes.cl1}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h1>1:5</h1>

            <p style={{ marginTop: "-1em" }}>Live-Class Ratio</p>
          </div>

          <div
            className={classes.cl2}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h1>30+</h1>

            <p style={{ marginTop: "-1em" }}>Activities</p>
          </div>

          <div
            className={classes.cl3}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h1>1</h1>

            <p style={{ marginTop: "-1em" }}>Certification</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
