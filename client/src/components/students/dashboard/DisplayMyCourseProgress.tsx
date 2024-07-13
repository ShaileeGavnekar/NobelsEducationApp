import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CourseProgressCard from "./CourseProgressCard";

const DisplayMyCourseProgress = () => {
  return (
    <>
      <Box>
        <Typography variant="h2">My Course Progress</Typography>
        <Typography variant="subtitle1">
          Your data, activity, and preferences that help make us more useful to
          you
        </Typography>
      </Box>
      <Box m={4}>
        <Paper elevation={3}>
          <Box m={4}>
            <Typography variant="h6">My Courses</Typography>
            <Typography variant="subtitle2">
              This info is visible to lorem ispum get text
            </Typography>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <ListItem alignItems="flex-start">
                {/* @ts-ignore */}
                <CourseProgressCard />
              </ListItem>
            </List>
          </Box>
          <Button>update</Button>
        </Paper>
      </Box>
    </>
  );
};

export default DisplayMyCourseProgress;
