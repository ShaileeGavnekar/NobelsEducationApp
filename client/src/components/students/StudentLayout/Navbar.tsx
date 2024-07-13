import React from "react";
import Image from "next/image";
import { styled, Box } from "@mui/system";
import {
  Icon,
  MenuItem,
  Avatar,
  Hidden,
  Link,
  SvgIconTypeMap,
} from "@mui/material";
import { Span } from "../../common/typography";
import Menu from "../../common/Topbar/Menu";
import { Home, Person, Settings } from "@mui/icons-material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { Logout } from "../../../lib/logout";
import useCustomSnackbar from "../../../hooks/useSnackbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../../contexts/AuthContext";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ApiIcon from "@mui/icons-material/Api";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PeopleIcon from "@mui/icons-material/People";

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
const Navbar: React.FC<{ handleToggle: () => void; showMenu: boolean }> = ({
  handleToggle,
  showMenu,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showError, showSuccess } = useCustomSnackbar();
  const theme = useTheme();
  const { user: user1 } = useAuth();
  const auth = useAuth();
  const adminNavigations: Array<{
    title: string;
    action: () => void;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    };
  }> = [
    {
      title: "Profile",
      action: () => {
        router.push("/");
      },
      icon: Person,
    },
    {
      title: "Manage Courses",
      action: () => {
        router.push("/dashboard/admin/course1");
      },
      icon: AdfScannerIcon,
    },
    {
      title: "Manage Classes",
      action: () => {
        router.push("/dashboard/admin/class1");
      },
      icon: AllInboxIcon,
    },
    {
      title: "Manage Students",
      action: () => {
        router.push("/dashboard/admin/student");
      },
      icon: AnalyticsIcon,
    },
    {
      title: "Manage Teachers",
      action: () => {
        router.push("/dashboard/admin/teacher");
      },
      icon: ApiIcon,
    },
    {
      title: "Leads",
      action: () => {
        router.push("/dashboard/admin/leads");
      },
      icon: PeopleIcon,
    },
    {
      title: "Blog",
      action: () => {
        router.push("/dashboard/admin/blog");
      },
      icon: AssignmentIndIcon,
    },
    {
      title: "Log out",
      action: () => {
        mutate();
      },
      icon: PowerSettingsNewIcon,
    },
  ];
  const teacherNavigations = [
    {
      title: "Profile",
      action: () => {
        router.push("/dashboard/teacher");
      },
      icon: Person,
    },
    {
      title: "Manage Courses",
      action: () => {
        router.push("/dashboard/teacher/myCourses");
      },
      icon: AdfScannerIcon,
    },
    {
      title: "Manage Classes",
      action: () => {
        router.push("/dashboard/teacher/myClasses");
      },
      icon: AllInboxIcon,
    },
    {
      title: "Blog",
      action: () => {
        router.push("/dashboard/teacher/blog");
      },
      icon: AssignmentIndIcon,
    },
    {
      title: "Log out",
      action: () => {
        mutate();
      },
      icon: PowerSettingsNewIcon,
    },
  ];
  const studentNavigations = [
    {
      title: "Profile",
      action: () => {
        router.push("/dashboard/student");
      },
      icon: Person,
    },
    {
      title: "Explore Courses",
      action: () => {
        router.push("/dashboard/student/exploreCourses");
      },
      icon: AnalyticsIcon,
    },
    {
      title: "My Courses",
      action: () => {
        router.push("/dashboard/student/myCourses");
      },
      icon: AdfScannerIcon,
    },
    {
      title: "My Classes",
      action: () => {
        router.push("/dashboard/student/myClasses");
      },
      icon: AllInboxIcon,
    },
    {
      title: "Blog",
      action: () => {
        router.push("/dashboard/student/blog");
      },
      icon: AssignmentIndIcon,
    },
    {
      title: "Log out",
      action: () => {
        mutate();
      },
      icon: PowerSettingsNewIcon,
    },
  ];

  const navigations =
    auth.user?.user.role === "ADMIN"
      ? adminNavigations
      : auth.user?.user.role === "TEACHER"
      ? teacherNavigations
      : studentNavigations;
  const matches = useMediaQuery(theme.breakpoints.down("md"));
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {(showMenu || matches) && (
          <IconButton>
            <MenuIcon onClick={handleToggle} />
          </IconButton>
        )}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Image src="/next.png" width="100x" height="55px" alt="logo" />
        </Box>
      </Box>
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
          {navigations.map((a) => {
            return (
              <StyledItem>
                <Link onClick={a.action}>
                  <Icon>
                    <a.icon />
                  </Icon>
                  <Span> {a.title}</Span>
                </Link>
              </StyledItem>
            );
          })}
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
