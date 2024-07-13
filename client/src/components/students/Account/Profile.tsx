import React from "react";
import { Grid } from "@mui/material";
import StudentCard from "../../../components/students/dashboard/StudentCard";
import UpdateStudentCard from "../../../components/students/dashboard/UpdateStudentCard";

const Profile: React.FC = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} md={4}>
        <StudentCard />
      </Grid>
      <Grid item xs={12} md={8}>
        <UpdateStudentCard />
      </Grid>
    </Grid>
  );
};

export default Profile;
