import { Container, Grid, Typography } from "@mui/material";
import { PostType } from "./Post";
import Navbarcomp from "../common/navBarCom";
import { createStyles } from "@mui/styles";
import { makeStyles } from "@mui/styles";
import { Theme, useTheme } from "@mui/material/styles";
import { padding, styled } from "@mui/system";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  BannerContainer: {
    height: "40vh",
    width: "100%",
    backgroundImage: "url('/BG.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    [theme.breakpoints.down("md")]: {
      backgroundImage: "url('/resbackground.png')",
    },
  },

  Bannerhero: {
    width: "100%",
    marginBottom: "50px",
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
    margin: "0 auto",

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
    justifyContent: "center",
    margin: "0 auto",
    gap: "20px",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
      alignItems: "center",
      marginLeft: "2em",
    },
  },

  heading: {
    // fontFamily: "Lato",
    fontStyle: "normal",
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
    // fontFamily: "Poppins",
    fontStyle: "normal",
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
  },
  button: {
    backgroundColor: "#884CF8",
    // opacity: 0.1,
    // color: "#884CF8",
  },
}));

const purple = {
  10: "rgba(136, 76, 248, 1)",
  1: "rgba(136, 76, 248, 0.1)",
};

const BlogBanner: React.FC<PostType> = ({ title }) => {
  const classes = useStyles();
  return (
    <div className={classes.BannerContainer}>
      <Navbarcomp />
      <div className={classes.Bannerhero}>
        <div className={classes.Bannercontent}>
          <h1 className={classes.heading}>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default BlogBanner;
