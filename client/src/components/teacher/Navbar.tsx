import React from "react";
import Image from "next/image";
import { styled, Box } from "@mui/system";
import { Icon, MenuItem, Avatar, Hidden, Link } from "@mui/material";
import { Span } from "../common/typography";
import Menu from "../common/Topbar/Menu";
import { Home, Person, Settings } from "@mui/icons-material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { Logout } from "../../lib/logout";
import useCustomSnackbar from "../../hooks/useSnackbar";
import { useAuth } from "../../contexts/AuthContext";

const UserMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 24,
  padding: 4,
  "& span": {
    margin: "0 8px",
  },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": {
    marginRight: "10px",
    color: theme.palette.text.primary,
  },
}));
const Navbar = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user: user1 } = useAuth();
  const { showError, showSuccess } = useCustomSnackbar();
  const { mutate } = useMutation(Logout, {
    onSuccess: (data) => {
      queryClient.setQueriesData("user", undefined);
      showSuccess("Logout successfully");
      router.push("/");
    },
    onError: (e: any) => {
      showError(e.message);
      console.log(e);
    },
  });
  const user = {
    name: user1?.user?.name,
    avatar: `${process.env.NEXT_PUBLIC_BACKEND}/student/getAvatar?Key=${user1?.user.avatar}`,
  };
  return (
    <Box p={1} display="flex" justifyContent="space-between">
      <Image src="/next.png" width="100x" height="55px" alt="logo" />
      <Box
        display="flex"
        alignItems="center"
        style={{ fontFamily: "montserrat" }}
      >
        <Menu
          menuButton={
            <UserMenu>
              <Hidden xsDown>
                <Span>
                  Hi <strong>{user.name}</strong>
                </Span>
              </Hidden>
              <Avatar src={user.avatar} sx={{ cursor: "pointer" }} />
            </UserMenu>
          }
        >
          <StyledItem>
            <Link onClick={() => mutate()}>
              <Icon>
                <PowerSettingsNewIcon />
              </Icon>
              <Span> Logout </Span>
            </Link>
          </StyledItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
