import React from "react";
// import "./styles/navbarcomp.css"
import Navbarcomp from "./navBarCom";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, useTheme } from "@mui/material/styles";
import TrialFormWrapper from "../admin/trialForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    BannerContainer: {
      height: "100vh",
      width: "100%",
      backgroundImage: "url('../BG.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      [theme.breakpoints.down("md")]: {
        backgroundImage: "url('/resbackground.png')",
      },
    },

    Bannerhero: {
      height: "90.5%",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },

    BannerLeft: {
      width: "50%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",

      [theme.breakpoints.down("md")]: {
        width: "100%",
        height: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },

    Bannercontent: {
      width: "80%",
      height: "100%",
      display: "flex",
      marginLeft: "5em",
      flexDirection: "column",
      justifyContent: "center",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        textAlign: "center",
        alignItems: "center",
        marginLeft: "2em",
      },
    },

    Bannerright: {
      width: "50%",
      height: "100%",
      display: "flex",
      alignItems: "flex-end",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        height: "40%",
        display: "flex",
        justifyContent: "column",
        alignItems: "center",
        // display: 'none',
      },
    },

    bannerimg: {
      height: "90%",
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "none",
        height: "100%",
        width: "100%",
        objectFit: "contain",
      },
    },

    bannerimgs: {
      display: "none",
      [theme.breakpoints.down("md")]: {
        height: "100%",
        display: "block",
        margin: "0 auto",
      },
    },

    heading: {
      fontWeight: "800",
      fontSize: "3rem",
      color: "#0e007a",
      letterSpacing: "0.2px",
      [theme.breakpoints.down("md")]: {
        fontSize: "2rem",
      },
    },

    child: {
      color: "#884cf8",
    },

    para: {
      fontWeight: "normal",
      fontSize: "1rem",
      color: "#000000",
      width: "70%",
      letterSpacing: "0.1px",

      [theme.breakpoints.down("md")]: {
        width: "90%",
      },
    },

    bookbtn: {
      width: "150px",
      height: "40px",
      border: "none",
      backgroundColor: "#884cf8",
      color: "#ffffff",
      borderRadius: "20px",
      fontSize: "0.8rem",
      boxShadow: "0px 14px 20px rgba(136, 76, 248, 0.1)",
    },

    // BannerLeft :{
    //     width: 100%,
    //     height: 60%,
    //     display: flex,
    //     flex-direction: column,
    //     align-items: "center"
    //   }

    // @media all and (max-width: 800px) {
    //   .Banner-container {
    //     /* background-image: url("../../../../Assets/resbackground.png"); */
    //   }
    //   .Banner-hero {
    //     flex-direction: column;
    //   }
    //   .Banner-left {
    //     width: 100%;
    //     height: 60%;
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //   }
    //   .Banner-right {
    //     width: 100%;
    //     height: 40%;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //   }
    //   .bannerimg {
    //     height: 100%;
    //     width: 100%;
    //     object-fit: contain;
    //   }
    //   .Banner-content {
    //     align-items: center;
    //     text-align: center;
    //   }

    //   .heading {
    //     font-size: 2rem;
    //   }
    //   .para {
    //     width: 90%;
    //   }
    //   .bannerimg {
    //     display: none;
    //   }
    //   .bannerimgs {
    //     display: block;
    //     height: 100%;
    //   }
    // }
  })
);

function Banner() {
  const classes = useStyles();
  const theme = useTheme();
  const [openTrial, setOpenTrial] = React.useState(false);
  return (
    <>
      {openTrial && (
        <>
          <TrialFormWrapper open={openTrial} setOpenTrial={setOpenTrial} />
        </>
      )}
      <div className={classes.BannerContainer}>
        <Navbarcomp />
        <div className={classes.Bannerhero}>
          <div className={classes.BannerLeft}>
            <div className={classes.Bannercontent}>
              <h1 className={classes.heading}>
                Building the next generation of{" "}
                <span className={classes.child}>Leaders</span> and{" "}
                <span className={classes.child}>Innovators</span>
                {/* Welcome to <span className={classes.child}>Child’s</span>{" "}
                Leadership Company{" "} */}
              </h1>
              <p className={classes.para}>
                Online Learning Journeys delivered live for the learners aged 5
                -15 Years.
              </p>
              <button
                className={classes.bookbtn}
                onClick={() => setOpenTrial(true)}
              >
                Book Free Trial
              </button>
            </div>
          </div>

          <div className={classes.Bannerright}>
            <img src="/banner-img.png" className={classes.bannerimg} />
            <img src="/banner-img1.png" className={classes.bannerimgs} />
            {/* <img src={bannerimg1} className={classes.bannerimgs} /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
