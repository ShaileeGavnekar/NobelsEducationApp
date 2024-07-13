import React from "react";
// import "./styles/navbarcomp.css"
import Navbarcomp from "../../common/navBarCom";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, useTheme } from "@mui/material/styles";
import { padding, styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    BannerContainer: {
      width: "100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },

    Bannerhero: {
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
      color: theme.palette.text.primary,
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
  })
);

const purple = {
  10: "rgba(136, 76, 248, 1)",
  1: "rgba(255, 255, 255, 0.8)",
};
const Tab = styled(TabUnstyled)(({ theme }) => ({
  color: `${purple[10]}`,
  cursor: "pointer",
  backgroundColor: `${purple[1]}`,
  fontSize: "0.875rem",
  width: "6rem",
  padding: "10px 12px",
  margin: "6px 6px",
  border: "none",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: `${purple[10]}`,
    color: "white",
  },
  "&:focus ": {
    color: "#fff",
    borderRadius: "3px",
    outlineOffset: "2px",
  },
  [`&.${tabUnstyledClasses.selected}`]: {
    backgroundColor: ` ${purple[10]}`,
    color: "white",
  },
  [`&.${buttonUnstyledClasses.disabled}`]: {
    opacity: "0.5",
    cursor: "not-allowed",
  },
}));
const TabPanel = styled(TabPanelUnstyled)(({ theme }) => ({
  width: "100%",
  fontSize: "0.875rem",
}));
const TabsList = styled(TabsListUnstyled)(({ theme }) => ({
  minWidth: "320px",
  borderRadius: "8px",
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignContent: "space-between",
  flexWrap: "wrap",
}));

const Banner = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.BannerContainer}>
      <div className={classes.Bannerhero}>
        <div className={classes.Bannercontent}>
          <h1 className={classes.heading}>Explore Our range of courses </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
