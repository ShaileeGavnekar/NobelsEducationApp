import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TrialFormWrapper from "../../admin/trialForm";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("rgba(136, 76, 248, 1)"),
  backgroundColor: "rgba(136, 76, 248, 1)",
  "&:hover": {
    backgroundColor: "rgba(136, 76, 248, 1)",
  },
}));

export default function OutlinedCard() {
  const [openTrial, setOpenTrial] = React.useState(false);
  return (
    <>
      {openTrial && (
        <>
          <TrialFormWrapper open={openTrial} setOpenTrial={setOpenTrial} />
        </>
      )}
      <Box sx={{ minWidth: 275, height: "15em" }}>
        <Card variant="outlined" sx={{ height: "15em" }}>
          <Grid
            container
            sx={{ backgroundColor: "#E8CCFF", height: "15em" }}
            justifyContent="center"
          >
            <Box>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  color: "rgba(14, 0, 122, 1)",
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingTop: "1em",
                }}
              >
                Book a Free Trial Class
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  paddingTop: "1em",
                  color: "rgba(14, 0, 122, 1)",
                }}
              >
                Want to know your child's favourite class is going to look like?
                <br />
                What are you waiting for?
              </Typography>

              <Typography
                sx={{
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "2em",
                }}
              >
                <ColorButton
                  sx={{
                    padding: "5px",
                    height: "40px",
                    width: "180px",
                    borderRadius: "2em",
                  }}
                  variant="contained"
                  onClick={() => setOpenTrial(true)}
                >
                  Book a FREE trial ⮕
                </ColorButton>
                <div style={{ backgroundColor: "#E8CCFF" }}></div>
              </Typography>
            </Box>
          </Grid>
        </Card>
      </Box>
    </>
  );
}
