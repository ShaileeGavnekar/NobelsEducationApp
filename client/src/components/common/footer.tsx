import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, useTheme } from "@mui/material/styles";
import { H2, H3 } from "./typography";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { data } from "./Data";
import ContentDialog from "./ContentDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    full: {
      [theme.breakpoints.down("md")]: {
        paddingLeft: "2em",
      },
    },

    logo: {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "30px",
      lineHeight: "46px",
      color: "#36c394",
      marginBottom: "8px",
    },
    og: {
      color: "#fca70c",
    },
    copy: {
      color: "orange",
    },
    booknowbtn: {
      padding: "12px",
      marginTop: "16px",
      border: "none",
      borderRadius: "28px",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "500",
      backgroundColor: "rgb(255,255,255,0.2)",
      color: "#fff",
      "&:hover": {
        backgroundColor: "rgb(255,255,255,0.4)",
      },
    },
    links: {
      textDecoration: "none",
      color: "#fff",
      paddingBottom: "4px",
    },
  })
);

export default function Footer() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      {open && (
        <>
          <ContentDialog
            open={open}
            onClose={() => setOpen(false)}
            heading={selected}
            //@ts-ignore
            content={data[selected] as any}
          />
        </>
      )}
      <Box
        sx={{
          backgroundColor: "rgba(71,69,173) !important",
          [theme.breakpoints.down("md")]: {},
        }}
      >
        <Grid container pt={6} pb={6} pl={16}>
          <Grid item xs={3} sm={4} md={3} container alignItems="start" mb={6}>
            <Box pl={2} pr={2}>
              <Typography className={classes.logo}>
                No<span className={classes.og}>be</span>ls
              </Typography>
              <Typography sx={{ color: "#fff" }} mb={4}>
                At Nobels, we aspire to nourish tomorrow’s leaders. Nobels
                focuses on setting them up for a bright future and making them
                ready for tomorrow regardless of what profession they choose. We
                want to see the kids more confident than ever, with increased
                love for learning, and passion to explore different paths.
              </Typography>
              <H2 sx={{ color: "#fff" }}>Get Started</H2>
              <Button className={classes.booknowbtn}>Book a FREE Trial</Button>
            </Box>
          </Grid>
          <Grid item xs={3} sm={4} md={3} container alignItems="start" mb={6}>
            <Box>
              <H3 sx={{ color: "#fff" }} mb={2}>
                Company
              </H3>
              <Box
                onClick={() => {
                  setOpen(true);
                  setSelected("Privacy Policy");
                }}
                style={{ cursor: "pointer" }}
              >
                <Typography sx={{ color: "#fff" }}>Privacy Policy</Typography>
              </Box>
              <Box
                onClick={() => {
                  setOpen(true);
                  setSelected("Terms and Conditions");
                }}
                style={{ cursor: "pointer" }}
              >
                <Typography sx={{ color: "#fff" }}>
                  Terms and Conditions
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  setOpen(true);
                  setSelected("Refunds and Cancellations");
                }}
                style={{ cursor: "pointer" }}
              >
                <Typography sx={{ color: "#fff" }}>
                  Refunds and cancellation
                </Typography>
              </Box>
              {/* <Box
                onClick={() => {
                  router.push("exploreCourses");
                }}
              >
                <Typography sx={{ color: "#fff" }}>
                  Disclaimer policy
                </Typography>
              </Box> */}
            </Box>
          </Grid>
          <Grid item xs={3} sm={4} md={3} container alignItems="start" mb={6}>
            <Box>
              <H3 sx={{ color: "#fff" }} mb={2}>
                Courses
              </H3>
              <Box
                onClick={() => {
                  router.push("exploreCourses");
                }}
              >
                <Typography sx={{ color: "#fff" }}>All Courses</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3} container alignItems="start" mb={6}>
            <Box>
              <H3 sx={{ color: "#fff" }} mb={2}>
                Contact Us
              </H3>
              <Box
                onClick={() => {
                  router.push("exploreCourses");
                }}
              >
                <Typography sx={{ color: "#fff" }}>All Courses</Typography>
              </Box>
              <Box className={classes.links}>
                <a href="#">Whatsapp or</a>
              </Box>
              <Box className={classes.links}>
                <a href="tel:+9566296233">Phone: +91 9566296233</a>
              </Box>
              <Box className={classes.links}>
                <a href="mailto:obels@support.in">
                  Email us at <u>nobels@support.in</u>
                </a>
              </Box>

              <Box className={classes.links}>
                <a href="">
                  Address: T-Hub, Vittal Rao <br></br> Nagar Hi-techCity,
                  Hyderabad, 500081
                </a>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          pb={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ backgroundColor: "#4745AD" }}
          // backgroundColor='#4745AD'
        >
          {/* <Typography sx={{ color: "#fff" }}>
          <span className={classes.copy}>Copyright </span> 2022 © Imagineer
          Technologies Pvt.Ltd.
        </Typography> */}
        </Box>
      </Box>
    </>
  );
}
