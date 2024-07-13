import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { makeStyles, createStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Theme, useTheme } from "@mui/material/styles";
import { H1, H6 } from "./typography";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { SaveLeadMutation } from "../../lib/mutations/SaveLead";
import { useMutation } from "react-query";
import useCustomSnackbar from "../../hooks/useSnackbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    vdheading: {
      height: "15%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // fontFamily: "Lato",
      // fontStyle: "normal",
      fontWeight: "200",
      fontSize: "0.8rem",
      color: "#0E007A",
      marginTop: "5em",
      [theme.breakpoints.down("md")]: {
        textAlign: "center",
      },
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
    vheading: {
      height: "15%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // fontFamily: "Lato",
      // fontStyle: "normal",
      fontWeight: "200",
      fontSize: "0.8rem",
      color: "#0E007A",
      [theme.breakpoints.down("md")]: {
        textAlign: "center",
      },
    },
    lcl1: {
      width: "50%",
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
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "64px",
      //   background: 'rgb(254, 197, 238,0.4)',
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
    vdbutton: {
      height: "15%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "1em",
      marginTop: "3em",
    },

    vdbtn: {
      height: "40px",
      width: "140px",
      border: "none",
      backgroundColor: "#884CF8",
      color: "#FFFFFF",
      borderRadius: "6px",
      marginBottom: "3em",
    },
  })
);

export default function QuickLead() {
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const classes = useStyles();
  const theme = useTheme();
  const { showError: showErrorMsg, showSuccess } = useCustomSnackbar();
  const { mutate } = useMutation(SaveLeadMutation, {
    onSuccess: () => {
      showSuccess("We have saved your data, and will call you soon!");
    },
    onError: (e: { message: string }) => {
      showErrorMsg(e.message);
    },
  });
  const handleSubmit = () => {
    mutate({ name, phoneNumber });
    setName("");
    setPhoneNumber("");
  };

  return (
    <Box style={{}}>
      <div className={classes.lcl1}>
        <h1 className={classes.lphd}>Request A Quick Call-Back</h1>
        <Box m={2}>
          <Box m={2}>
            <TextField
              size="small"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              sx={{ m: 1, width: "25ch" }}
            />
          </Box>
          <Box m={2}>
            <TextField
              size="small"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              placeholder="Mobile Number"
            />
          </Box>
          <Box m={2}>
            <Button
              variant="contained"
              sx={{ m: 1, width: "25ch" }}
              onClick={handleSubmit}
            >
              REQUEST A CALLBACK
            </Button>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
