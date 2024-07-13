import React from "react";
// import "./Styles/LearningPhiloshophies.css"
// import graduated from '../../../Assets/graduated.png'
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, createTheme } from "@mui/material/styles";
import { H1 } from "./typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    learningphilosophiescontainer: {
      height: "60vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#0E007A",
      marginTop: "9em",
      [theme.breakpoints.down("md")]: {
        height: "140vh",
        marginTop: "30px",
      },
    },

    learningphilosophieshero: {
      width: "68%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "40px",
      [theme.breakpoints.down("lg")]: {
        width: "75%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },

    lpheading: {
      display: "flex",
      flexDirection: "column",
      height: "15%",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "0.8rem",

      fontStyle: "normal",
      fontWeight: "600",
      textAlign: "center",
      [theme.breakpoints.down("md")]: {
        height: "10%",
      },
    },

    lpcenter: {
      height: "70%",
      display: "flex",
      alignItems: "center",
      marginTop: "1em",
      justifyContent: "space-between",
      flexDirection: "row",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        gap: "20px",
        height: "80%",
      },
    },

    lpbutton: {
      height: "15%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      [theme.breakpoints.down("md")]: {
        height: "10%",
      },
    },

    lpbox: {
      width: "30%",
      height: "344px",
      background: "rgb(207, 191, 255,.3)",
      boxShadow: "0px 4px 30px rgba(65, 75, 99, 0.1)",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
    },

    circle: {
      height: "70px",
      width: "70px",
      background: "rgb(104, 56, 240, 0.2)",
      borderRadius: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    gd: {
      height: "50px",
      width: "50px",
    },

    lphd: {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontSize: "1.3rem",
      fontWeight: "700",
    },

    lpp: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "15px",
      textAlign: "center",
      width: "80%",
    },

    lcl1: {
      width: "30%",
      height: "344px",
      background: "rgb(254, 197, 238,.3)",
      boxShadow: "0px 4px 30px rgba(65, 75, 99, 0.1)",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
      //   background: 'rgb(254, 197, 238,0.4)',
    },

    lcl2: {
      width: "30%",
      height: "344px",
      background: "rgba(192, 237, 255)",
      boxShadow: "0px 4px 30px rgba(65, 75, 99, 0.1)",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
      //   background: 'rgb(192, 237, 255, 0.5)',
    },

    lc1: {
      height: "70px",
      width: "70px",
      background: "rgb(255, 103, 213,.2)",
      borderRadius: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      //   background: 'rgb(255, 103, 213,0.2)',
    },

    lc2: {
      height: "70px",
      width: "70px",
      background: "rgba(26, 186, 250, 0.2)",

      borderRadius: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      //   background: 'rgb(26, 186, 250,0.2)',
    },

    whatsappbtn: {
      height: "40px",
      width: "140px",
      border: "none",
      backgroundColor: "#884CF8;",
      color: "#FFFFFF",
      borderRadius: "6px",
    },
    awesome: {},
    // @media all and (max-width:950px){
    //     .learningphilosophieshero{
    //         width: 75%;
    //     }
    // }

    // @media all and (max-width:750px){
    //     .learningphilosophiescontainer{
    //         height: 140vh;
    //         marginTop: 30px;
    //     }
    //     .learningphilosophieshero{
    //         width: 100%;
    //     }
    //     lpcenter{
    //         flexDirection: column;
    //         gap: 20px;
    //         height: 80%;
    //     }
    //     .lpbutton{
    //         height: 10%;
    //     }
    //     lpheading{
    //         height: 10%;
    //     }
    //     .lpbox{
    //         width: 60%;
    //     }

    // }

    // @media all and (max-width:500px){
    //     .lpbox{
    //         width: 80%;
    //     }
    // }
  })
);

function LearningPhilosophies() {
  const classes = useStyles();
  const theme = createTheme();
  return (
    <div className={classes.learningphilosophiescontainer}>
      <div className={classes.learningphilosophieshero}>
        <div className={classes.lpheading}>
          <H1 className={classes.awesome}>Why Nobels ?</H1>
          {/* <H1>Our Learning Philosophies</H1> */}
        </div>

        <div className={classes.lpcenter}>
          <div className={classes.lpbox}>
            <div>
              <div className={classes.circle}>
                <img src="/graduated.png" className={classes.gd} />
              </div>
            </div>
            <h1 className={classes.lphd}>Modern Subjects</h1>
            <p className={classes.lpp}>
              Kids who are exposed to modern subjects at an early stage can
              adapt, learn, and prepare better for the future.
            </p>
          </div>
          <div className={classes.lcl1}>
            <div>
              <div className={classes.lc1}>
                <img src="/graduated.png" className={classes.gd} />
              </div>
            </div>
            <h1 className={classes.lphd}>6C Approach</h1>
            <p className={classes.lpp}>
              Our progressive approach through the online courses offered
              incorporates 6C's - Cognitive development, Communication,
              Creativity, Critical thinking, Confidence, Concentration.
            </p>
          </div>
          <div className={classes.lcl2}>
            <div>
              <div className={classes.lc2}>
                <img src="/graduated.png" className={classes.gd} />
              </div>
            </div>
            <h1 className={classes.lphd}>Best Learning Journeys</h1>
            <p className={classes.lpp}>
              Each course is taught using the best strategies for children,
              developed through extensive research by the R&D.
            </p>
          </div>
        </div>

        <div className={classes.lpbutton}>
          <button className={classes.whatsappbtn}>Join Whatsapp</button>
        </div>
      </div>
    </div>
  );
}

export default LearningPhilosophies;
