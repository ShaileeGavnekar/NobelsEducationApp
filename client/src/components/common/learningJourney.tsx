import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { H1 } from "./typography";
import { Box, Button, Chip } from "@mui/material";
import { useRouter } from "next/router";
import useGetStarredCourse from "../../lib/useGetStarredCourses";
import CourseCard2 from "../students/dashboard/CourseCard2";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    explorecontainer: {
      // height: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "rgb(69, 18, 117)",
      // marginTop: "50px",
      marginTop: theme.spacing(15),
      [theme.breakpoints.down("md")]: {
        marginTop: theme.spacing(15),
      },
    },

    explorehero: {
      width: "68%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-evenly",
      [theme.breakpoints.down("lg")]: {
        width: "90%",
      },
      [theme.breakpoints.down("md")]: {
        width: "90%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },

    agegroups: {
      display: "flex",
      flexDirection: "row",
      gap: "20px",
      [theme.breakpoints.down("lg")]: {
        display: "grid",
        gridTemplateColumns: "repeat(4, auto)",
      },
      [theme.breakpoints.down("sm")]: {
        gap: "10px",
      },
    },

    ages: {
      width: "100px",
      height: "40px",
      backgroundColor: "#f4eeff",
      color: "#884cf8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      fontSize: "0.8rem",
      fontWeight: "500",
      cursor: "pointer",
      [theme.breakpoints.down("sm")]: {
        width: "80px",
        height: "35px",
      },
    },

    exploreheading: {
      textAlign: "center",
      color: "#0E007A",
      marginTop: "3em",
      [theme.breakpoints.down("md")]: {
        fontSize: "0.8rem",
      },
    },

    agesbg: {
      backgroundColor: "#884cf8",
      color: "white",
    },

    subscribehere: {
      width: "160px",
      height: "40px",
      border: "none",
      backgroundColor: "#884CF8",
      color: "white",
      borderRadius: "5px",
      fontWeight: "400",
      fontSize: "0.9rem",
      cursor: "pointer",
      fontFamily: "Lato",
      fontStyle: "normal",
      marginTop: "2em",
      "&:hover": {
        backgroundColor: "#884CF8",
        color: "white",
      },
    },

    // journeyboxes: {
    //   display: "flex",
    //   flexDirection: "row",
    //   width: "100%",
    //   justifyContent: "space-between",
    //   padding: "1em",
    //   marginTop: "1em",
    //   [theme.breakpoints.down("sm")]: {
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   },
    // },

    journeybox: {
      // width: "250px",
      height: "332px",
      background: "#1abafa49",
      boxShadow: "0px 4px 20px rgba(10, 0, 72, 0.1)",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
    },

    journeybox1: {
      // width: "250px",
      height: "300px",
      background: "#1abafa49",
      boxShadow: "0px 4px 20px rgba(10, 0, 72, 0.1)",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    gridItem: {
      [theme.breakpoints.down("md")]: {
        margin: "auto",
      },
    },

    journeybox2: {
      // width: "250px",
      height: "300px",
      background: "#1abafa49",
      boxShadow: "0px 4px 20px rgba(10, 0, 72, 0.1)",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },

    imgbox: {
      height: "60%",
      marginBottom: "-5px",
    },

    one: {
      height: "100%",
      width: "100%",
      objectFit: "contain",
      objectPosition: "center",
    },

    btmbox: {
      height: "45%",
      width: "100%",
      backgroundImage: "url('/bottombox.png')",
      backgroundPosition: "center",
      backgroundSize: "cover",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "1px",
    },

    spark: {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "15px",
      lineHeight: "22px",
      marginTop: "2em",
      color: "rgba(255, 255, 255, 0.9)",
    },

    studio: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "12px",
      width: "80%",
      marginTop: "-1em",
      textAlign: "center",
      color: "rgba(255, 255, 255, 0.9)",
    },

    rows: {
      display: "flex",
      flexDirection: "row",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "10px",
      color: "#ffffffda",
      gap: "10px",
      marginTop: "-0.5em",
    },

    p: {
      backgroundColor: "rgba(238, 238, 238, 0.192)",
      padding: "5px",
      borderRadius: "20px",
    },
  })
);

function Learningjourney() {
  const router = useRouter();
  const Agegroup = [
    "All ages",
    "3 Yrs",
    "4 Yrs",
    "7 Yrs",
    "9 Yrs",
    "10-11 Yrs",
    "12-15 Yrs",
    "See all",
  ];
  const [ageselect, setAgeselect] = useState("5 to 6");
  const { data, isLoading, error } = useGetStarredCourse();

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.explorecontainer}>
      <div className={classes.explorehero}>
        <Box my={4}>
          <div className={classes.exploreheading}>
            <H1>Explore Our Learning Journeys </H1>
          </div>
        </Box>
        {/* <Box my={4}>
          <div className={classes.agegroups}>
            {Agegroup.map((item, index) => (
              <div
                key={index}
                className={classes.ages}
                onClick={() => setAgeselect(item)}
              >
                <p>{item}</p>
              </div>
            ))}
          </div>
        </Box> */}
        <Box sx={{ width: "fit-content" }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            {data?.map((f, i) => {
              return (
                <>
                  <Grid item xs={10} md={5} key={i}>
                    <CourseCard2 course={f} />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Box>
      </div>

      <Box mt={2}>
        <Button
          className={classes.subscribehere}
          onClick={() => router.push("/exploreCourses")}
        >
          Explore More !
        </Button>
      </Box>
    </div>
  );
}

export default Learningjourney;
