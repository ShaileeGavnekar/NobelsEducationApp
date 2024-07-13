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
        avatar={
          <Avatar
            src={`${process.env.NEXT_PUBLIC_BACKEND}/student/getAvatar?Key=${user?.user.avatar}`}
          />
        }
        title={user?.user?.name}
        subheader={user?.user.role.toLowerCase()}
      />
    </Card>
  );
};

export default ProfileCard;
