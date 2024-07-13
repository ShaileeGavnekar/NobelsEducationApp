import { Box, Button, Paper } from "@mui/material";
import { Theme, Typography } from "@mui/material";
import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { Classes } from "../../../lib/useMyClasses";
import dynamic from "next/dynamic";
import { useMutation } from "react-query";
import { getRegistrationTokenMutation } from "../../../lib/mutations/studentMutations/GetRegistrantTokenMutation";
import { useAuth } from "../../../contexts/AuthContext";
import moment from "moment";

const MeetingComponent = dynamic(() => import("../../zoom/Meeting"), {
  ssr: false,
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    upperContainer: {
      padding: theme.spacing(2),
      margin: theme.spacing(4),
    },
    box: { lineHeight: "normal", display: "flex" },
    time: { marginTop: theme.spacing(1) },
    buttonBox: {
      width: "100%",
    },
    button: {
      float: "right",
      marginTop: theme.spacing(2.5),
      marginRight: theme.spacing(1),
    },
  })
);

interface IClassCard {
  clas: Classes;
}

const ClassCard: React.FC<IClassCard> = ({ clas }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const [openMeeting, setOpenMeeting] = React.useState(false);
  const { mutate, data } = useMutation(getRegistrationTokenMutation, {
    onSuccess: () => {
      setOpenMeeting(true);
    },
  });
  return (
    <>
      {openMeeting && (
        <>
          <MeetingComponent
            signature={data?.signature}
            meetingNumber={clas.meetingId}
            password={clas.passCode!}
          />
        </>
      )}
      <Paper
        className={classes.upperContainer}
        sx={{ boxShadow: "3px 2px 29px -19px rgba(0,0,0,0.75)" }}
      >
        <Box my={2} mb={4} className={classes.box}>
          <Box>
            <Typography variant="subtitle1">
              Class 1 (Data Structures and Algorithms)
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              style={{ fontStyle: "italic" }}
            >
              We will be covering up the basics data structures like arrays,
              hash maps and hash sets in this session
            </Typography>

            <Typography className={classes.time}>
              {/* 02 February 2022, 02:00 PM */}
              {moment(clas.startTime).format("DD MMMM YYYY, HH:MM A")}
            </Typography>
          </Box>
          <Box className={classes.buttonBox}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() =>
                mutate({
                  meetingId: clas.meetingId,
                  apiKey: process.env.NEXT_PUBLIC_ZOOM_KEY as string,
                  email: "validmail@gmail.com" as string,
                  name: user?.user.name as string,
                })
              }
            >
              JOIN CLASS
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default ClassCard;
