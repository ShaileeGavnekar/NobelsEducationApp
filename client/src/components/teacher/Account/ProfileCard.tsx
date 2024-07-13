import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../../../contexts/AuthContext";

const ProfileCard = () => {
  const { user } = useAuth();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar src={user?.user?.avatar} />}
        title={user?.user?.name}
        subheader="Teacher"
      />
    </Card>
  );
};

export default ProfileCard;
