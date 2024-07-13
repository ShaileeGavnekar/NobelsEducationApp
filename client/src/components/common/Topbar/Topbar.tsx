import React from "react";
import { styled, useTheme, Box } from "@mui/system";
import {
  Icon,
  IconButton,
  MenuItem,
  Avatar,
  useMediaQuery,
  Hidden,
  Link,
} from "@mui/material";

import { topBarHeight } from "../../../utils/constants";
import { themeShadows } from "../../../theme/themeColors";
import { Span } from "../typography";
import useSettings from "../../../hooks/useSettings";
import Menu from "./Menu";
import { Home, Person, Settings } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useMutation, useQueryClient } from "react-query";
import useCustomSnackbar from "../../../hooks/useSnackbar";
import { useRouter } from "next/router";
import { Logout } from "../../../lib/logout";
import { useAuth } from "../../../contexts/AuthContext";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: "all 0.3s ease",
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down("xs")]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

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

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: {
    display: "none !important",
  },
}));

interface TopbarProps {
  fixed?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ fixed }) => {
  const theme = useTheme();
  const { user: user1 } = useAuth();
  const { settings, updateSettings } = useSettings();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const queryClient = useQueryClient();
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

  const updateSidebarMode = (sidebarSettings: any) => {
    updateSettings({
      leftSidebar: {
        ...sidebarSettings,
      },
    });
  };

  const user = {
    name: user1?.user?.name,
    avatar: `${process.env.NEXT_PUBLIC_BACKEND}/student/getAvatar?Key=${user1?.user.avatar}`,
  };
  const handleSidebarToggle = () => {
    let { leftSidebar } = settings;
    let mode;
    if (isMdScreen) {
      mode = leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <MenuIcon />
          </StyledIconButton>

          <IconBox>
            <StyledIconButton>
              <MailOutlineIcon />
            </StyledIconButton>

            <StyledIconButton>
              <WebAssetIcon />
            </StyledIconButton>

            <StyledIconButton>
              <StarOutlineIcon />
            </StyledIconButton>
          </IconBox>
        </Box>
        <Box display="flex" alignItems="center">
          <StyledIconButton>
            <SearchIcon />
          </StyledIconButton>
          <StyledIconButton>
            <NotificationsIcon />
          </StyledIconButton>

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
              <Link href="#">
                <Icon>
                  <Person />
                </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>
            <StyledItem>
              <Link href="#">
                <Icon>
                  <Settings />
                </Icon>
                <Span> Settings </Span>
              </Link>
            </StyledItem>
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
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default Topbar;
