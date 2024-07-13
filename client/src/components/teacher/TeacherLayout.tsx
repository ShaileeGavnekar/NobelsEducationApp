import { Container, Grid, Box } from "@mui/material";
import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { styled } from "@mui/system";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Person } from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BookIcon from "@mui/icons-material/Book";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { themeShadows } from "../../theme/themeColors";
import Sidebar, { ISideBarProps } from "../students/StudentLayout/Sidebar";
import Navbar from "../students/StudentLayout/Navbar";

const MobileSidebar = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "250px",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const profile = [
  {
    title: "Account",
    icon: Person,
    link: "/dashboard/teacher",
  },
];

const manage = [
  {
    title: "My Courses",
    icon: ListIcon,
    link: "/dashboard/teacher/myCourses",
  },
  {
    title: "My Classes",
    icon: AnalyticsIcon,
    link: "/dashboard/teacher/myClasses",
  },
  {
    title: "Blog",
    icon: BookIcon,
    link: "/dashboard/teacher/blog",
  },
];

const TeacherLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const path = router.pathname;
  const isDetailPage = React.useMemo(() => {
    return path.split("/")?.[3] === "[courseDetails]";
  }, [path]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const sideBarProps: ISideBarProps = {
    menuItems: [
      { label: "Profile", items: profile },
      { label: "Manage", items: manage },
    ],
  };
  if (isDetailPage) {
    return (
      <>
        {" "}
        <div
          style={{
            backgroundColor: theme.palette.background.default,
            minHeight: "100vh",
          }}
        >
          <Box boxShadow={themeShadows[8]} pl={2} pr={2}>
            <Navbar handleToggle={handleToggle} showMenu={true} />
          </Box>
          <Grid container>
            <Grid item xs={12} md={12} pt={2}>
              {children}
            </Grid>
          </Grid>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
            onClick={handleClose}
          >
            <MobileSidebar>
              <Sidebar {...sideBarProps} />
            </MobileSidebar>
          </Backdrop>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        style={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Box boxShadow={themeShadows[8]} pl={2} pr={2}>
          <Navbar handleToggle={handleToggle} showMenu={false} />
        </Box>
        <Grid container>
          {!matches && (
            <Grid item md={2}>
              <Sidebar {...sideBarProps} />
            </Grid>
          )}
          <Grid item xs={12} md={10} pt={2}>
            <Container maxWidth="xl" style={{ padding: 0 }}>
              {children}
            </Container>
          </Grid>
        </Grid>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
          onClick={handleClose}
        >
          <MobileSidebar>
            <Sidebar {...sideBarProps} />
          </MobileSidebar>
        </Backdrop>
      </div>
    </>
  );
};

export default React.memo(TeacherLayout);
