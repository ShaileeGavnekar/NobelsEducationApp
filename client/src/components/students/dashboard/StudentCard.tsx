import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Theme,
  Avatar,
  Box,
  Switch,
  Chip,
} from "@mui/material";
import React, { useState } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import { useAuth } from "../../../contexts/AuthContext";
import { H2 } from "../../common/typography";
import Uploader from "../../../components/common/Uploader";
import { styled } from "@mui/material/styles";
import { useQueryClient } from "react-query";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    upperContainer: {
      boxShadow: "0px 4px 30px rgba(65, 75, 99, 0.1) !important",
      padding: theme.spacing(2),
      position: "relative",
      minHeight: "500px",
    },
    containerGrids: { margin: theme.spacing(2) },
    badge: {
      position: "absolute",
      top: "24px",
      right: "24px",
    },
    avatar: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  })
);

const StudentCard: React.FC = () => {
  const { user, refetchViewer } = useAuth();
  const authContext = useAuth();
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [blocked, setBlocked] = useState<boolean>(false);

  const [uploadFiles, setUploadFiles] = useState<boolean>(false);
  const handleOpen = () => setUploadFiles(true);
  const handleClose = () => setUploadFiles(false);
  const onUploadComplete = async () => {
    const m = refetchViewer();
    setUploadFiles(false);
  };
  return (
    <>
      <Card className={classes.upperContainer}>
        <CardContent>
          <Chip
            label={blocked ? "Blocked" : "Active"}
            color={blocked ? "error" : "success"}
            className={classes.badge}
            size="medium"
          />
          <Avatar
            alt="Remy Sharp"
            src={`${process.env.NEXT_PUBLIC_BACKEND}/student/getAvatar?Key=${user?.user.avatar}`}
            sx={{ width: 100, height: 100 }}
            className={classes.avatar}
          />
          <Box sx={{ textAlign: "center" }}>
            <H2>{user?.user.name}</H2>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button variant="outlined" onClick={handleOpen}>
              Edit Image
            </Button>
          </Box>
          <Uploader
            entity="USER_AVATAR"
            endpoint={"/student/addMyAvatar"}
            allowedExtensions={["image/*", ".jpg", ".jpeg", ".png"]}
            fieldName={"avatar"}
            onComplete={onUploadComplete}
            id={user?.user?._id!}
            open={uploadFiles}
            onClose={() => {
              setUploadFiles(false);
            }}
          />
          <Box pt={5}>
            <Grid container className={classes.containerGrids}>
              <Grid item xs={10}>
                <Typography>
                  <b>Blocked</b>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Apply disable account
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Switch
                  defaultChecked={blocked}
                  color="secondary"
                  onClick={() => setBlocked(!blocked)}
                />
              </Grid>
            </Grid>

            <Grid container className={classes.containerGrids}>
              <Grid item xs={10}>
                <Typography>
                  <b>Email Verified</b>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Disabling this will automatically send the user a verification
                  email
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Switch defaultChecked color="secondary" />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default StudentCard;
