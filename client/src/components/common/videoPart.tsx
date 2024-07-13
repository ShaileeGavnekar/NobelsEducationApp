import React from "react";
// import "./Styles/Videopart.css"
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, useTheme } from "@mui/material/styles";
import { H2 } from "./typography";
import { Router, useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    videopartcontainer: {
      height: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "40px",
      [theme.breakpoints.down("md")]: {
        height: "70vh",
        marginTop: "50px",
      },
    },

    videoparthero: {
      height: "100%",
      width: "68%",
      [theme.breakpoints.down("md")]: {
        width: "90%",
      },
    },

    futurevd: {
      height: "70%",
      width: "100%",
      backgroundImage:
        "url('https://img.freepik.com/free-photo/positive-good-looking-schoolgirl-wearing-casual-attire-writing-exercise-book-having-positive-mood-sitting-table-living-room-online-education_176532-15165.jpg?w=2000&t=st=1649529275~exp=1649529875~hmac=f8479b1bba56cc11b3ceed5e9988c111dd65607bb44a364077962cfdcaedcc29')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
      [theme.breakpoints.down("md")]: {
        backgroundSize: "contain",
      },
    },

    vdheading: {
      height: "15%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "3em",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "0.8rem",
      color: "#0E007A",
      [theme.breakpoints.down("md")]: {
        textAlign: "center",
      },
    },

    vdbutton: {
      height: "15%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    vdbtn: {
      height: "40px",
      width: "140px",
      border: "none",
      backgroundColor: "#884CF8",
      color: "#FFFFFF",
      borderRadius: "6px",
      marginTop: "2em",
    },

    // @media all and (max-width:700px){
    //     .videopartcontainer{
    //         height: 70vh;
    //         margin-top: 50px;
    //     }
    //     .videoparthero{
    //         width: 90%;
    //     }
    //     .futurevd{
    //         backgroundSize: contain;
    //     }
    //     .vdheading{
    //         text-align: center;
    //     }
    // }
  })
);

function VideoPart() {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  return (
    <div className={classes.videopartcontainer}>
      <div className={classes.videoparthero}>
        <div className={classes.vdheading}>
          <H2>We ensure holistic development for your child</H2>
        </div>

        <div className={classes.futurevd}></div>

        <div className={classes.vdbutton}>
          <button
            className={classes.vdbtn}
            onClick={() => {
              router.push("/exploreCourses");
            }}
          >
            Explore All Courses
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPart;
