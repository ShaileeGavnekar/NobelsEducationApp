import { Container, Grid, useTheme, Box } from "@mui/material";
import React, { useState } from "react";
import { themeShadows } from "../../../theme/themeColors";
import Backdrop from "@mui/material/Backdrop";
import { styled } from "@mui/system";
import Sidebar, { ISideBarProps } from "../../students/StudentLayout/Sidebar";
import Navbar from "../../students/StudentLayout/Navbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Person } from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BookIcon from "@mui/icons-material/Book";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

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
    link: "/dashboard/admin",
  },
];

const manage = [
  {
    title: "Manage Courses",
    icon: DashboardIcon,
    link: "/dashboard/admin/course1",
  },
  {
    title: "Manage Batches",
    icon: AnalyticsIcon,
    link: "/dashboard/admin/batch1",
  },
  {
    title: "Manage Classes",
    icon: ListIcon,
    link: "/dashboard/admin/class1",
  },
  {
    title: "Manage Students",
    icon: AnalyticsIcon,
    link: "/dashboard/admin/student",
  },
  {
    title: "Manage Teachers",
    icon: AnalyticsIcon,
    link: "/dashboard/admin/teacher",
  },

  {
    title: "Leads",
    icon: GroupOutlinedIcon,
    link: "/dashboard/admin/leads",
  },
  {
    title: "Blog",
    icon: BookIcon,
    link: "/dashboard/admin/blog",
  },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
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
  return (
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
        <Grid item md={2} sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar {...sideBarProps} />
        </Grid>
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
          <Sidebar menuItems={sideBarProps.menuItems} />
        </MobileSidebar>
      </Backdrop>
    </div>
  );
};

export default React.memo(AdminLayout);
