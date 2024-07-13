import React from "react";
import { H1 } from "./typography";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    coursesContainer: {
      height: "40vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        height: "130vh",
        marginTop: theme.spacing(10),
      },
    },

    courseshero: {
      width: "75%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "30px",
      color: "#0E007A",
      // fontFamily: "Lato",
      // fontStyle: "normal",
      // fontWeight: "600",
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
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        gap: "60px",
        alignItems: "center",
        justifyContent: "center",
      },
    },

    coursebox1: {
      width: "300px",
      height: "200px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        "linear-gradient(180deg, rgba(254, 137, 222, 0.5) 0%, rgba(255, 149, 226, 0.5) 100%)",
      // width: "300px",
      // height: "200px",
      // background:
      //   "linear-gradient(180deg, rgba(159, 125, 255, 0.5) 0%, rgba(206, 189, 255, 0.5) 100%)",
      // borderRadius: "20px",
      // display: "flex",
      // alignItems: "center",
      // justifyContent: "center",
      // [theme.breakpoints.down("md")]: {
      //   width: "200px",
      // },
      // [theme.breakpoints.down("md")]: {
      //   width: "160px",
      // },
    },

    courseInner: {
      width: "85%",
      height: "100%",
      background: "#FFFFFF",
      boxShadow: "0px 10px 30px rgba(13, 0, 51, 0.05)",
      borderRadius: "20px",
      marginTop: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },

    imgcr: {
      height: "56px",
      width: "56px",
    },

    boxp: {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "20px",
      color: "#6838F0",
    },

    cd: {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "20px",

      color: "#FF67D5",
    },

    cr: {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "20px",

      color: "#1ABAFA",
    },

    cf: {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "20px",

      color: "#FF9731",
    },

    cl1: {
      width: "300px",
      height: "200px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        "linear-gradient(180deg, rgba(254, 137, 222, 0.5) 0%, rgba(255, 149, 226, 0.5) 100%)",
    },

    cl2: {
      width: "300px",
      height: "200px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        "linear-gradient(180deg, rgba(125, 218, 255, 0.5) 0%, rgba(204, 240, 255, 0.5) 100%)",
    },

    cl3: {
      width: "300px",
      height: "200px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
        <H1 className={classes.courseshero}>Our Courses</H1>

        <div className={classes.courseboxes}>
          <div className={classes.coursebox1}>
            <div className={classes.courseInner}>
              <img src="/Criticalthinking.png" className={classes.imgcr} />
              <p className={classes.boxp}>Critical thinking</p>
            </div>
          </div>

          <div className={classes.cl1}>
            <div className={classes.courseInner}>
              <img src="/Cognitive.png" className={classes.imgcr} />
              <p className={classes.cd}>Cognitive growth</p>
            </div>
          </div>

          <div className={classes.cl2}>
            <div className={classes.courseInner}>
              <img src="/Creative.png" className={classes.imgcr} />
              <p className={classes.cr}>Creativity</p>
            </div>
          </div>

          <div className={classes.cl3}>
            <div className={classes.courseInner}>
              <img src="/Confidence.png" className={classes.imgcr} />
              <p className={classes.cf}>Confidence</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
