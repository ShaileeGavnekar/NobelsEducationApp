import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { makeStyles, createStyles } from "@mui/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Theme, useTheme } from "@mui/material/styles";
import { H1 } from "./typography";
import { Box } from "@mui/material";

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

// const Accordion = styled((props,children) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} ></MuiAccordion>
// ))(({ theme }) => ({
//   //   border: `0.5px solid ${theme.palette.divider}`,
//   boxShadow: "-5px 13px 15px 1px rgba(242,239,242,1)",
//   "&:not(:last-child)": {},
//   "&:before": {
//     display: "none",
//   },
// }));

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     {...props}
//     expandIcon={
//       <AddCircleIcon
//         sx={{ fontSize: "1.2rem", color: "#7125FF", flexDirection: "right" }}
//       />
//     }
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "#fff",
//   flexDirection: "row",
//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     transform: "rotate(90deg)",
//   },
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   boxShadow: "5px 10px 30px rgba(67, 64, 95, 0.1)",
// }));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string[]>(["panel1"]);

  //@ts-ignore
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(expanded.includes(panel) ? [] : [panel]);
  };

  const classes = useStyles();
  const theme = useTheme();
  const answers = [
    {
      question: "What is the outcome from the courses offered by Nobels?",
      answer: ` We want to see the kids more confident than ever, with increased love for learning, and passion to explore different paths.`,
    },
    {
      question: "What is the class size ? ",
      answer: `All of the sessions are held in small groups of 3-5 children to ensure best interaction.`,
    },
    {
      question: "The courses are live or pre-recorded?",
      answer: `All of the courses are LIVE.`,
    },
    {
      question: "What is the language of interaction?",
      answer: ` All the courses at Nobels are conducted in English.`,
    },
  ];

  return (
    <Box>
      <Grid
        container
        sx={{
          height: "75%",
          width: "75%",
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <div>
          <div className={classes.vdheading}>
            <H1>Frequently Asked Questions (FAQs)</H1>
          </div>
          <br />

          {answers.map((a, i) => {
            return (
              <>
                {" "}
                <Box m={2}>
                  <Accordion
                    expanded={expanded.includes(`panel${i}`)}
                    onChange={handleChange(`panel${i}`)}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography>
                        <b>{a.question}</b>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{a.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </>
            );
          })}
        </div>
      </Grid>
      <div className={classes.vdbutton}>
        <button
          className={classes.vdbtn}
          onClick={() => {
            setExpanded(["panel0", "panel1", "panel2", "panel3"]);
          }}
        >
          View All FAQs
        </button>
      </div>
    </Box>
  );
}
