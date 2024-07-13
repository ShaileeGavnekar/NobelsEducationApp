import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Grid, Theme, Typography, useTheme } from "@mui/material";
import { ComponentProps } from "../../_app";
import { createStyles, makeStyles } from "@mui/styles";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingScreen from "../../../components/common/LoadingScreen";
import { H1, H2 } from "../../../components/common/typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../../components/students/Account/TabPanel";
import { styled } from "@mui/material/styles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ReceiptIcon from "@mui/icons-material/Receipt";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Profile from "../../../components/students/Account/Profile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      padding: theme.spacing(2),
      marginLeft: theme.spacing(6),
      marginTop: theme.spacing(2),
      fontWeight: "bold",
      fontSize: theme.spacing(4),
    },
  })
);

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  "&.Mui-selected": {
    color: theme.palette.primary.dark,
  },
}));

const tabProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const AdminDashboard: React.FC<ComponentProps> = () => {
  const { isLoading } = useAuth();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  if (isLoading) return <LoadingScreen loading={isLoading} />;
  return (
    <Box p={2}>
      <Box pb={2}>
        <H1 fontWeight="bold">My Profile</H1>
      </Box>
      <Box pb={2} sx={{ width: "100%" }}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab
              label="Profile"
              icon={<AccountBoxIcon />}
              iconPosition="start"
              {...tabProps(0)}
            />
            {/* <StyledTab
              label="Billing"
              icon={<ReceiptIcon />}
              iconPosition="start"
              {...tabProps(1)}
            />
            <StyledTab
              label="Change Password"
              icon={<VpnKeyIcon />}
              iconPosition="start"
              {...tabProps(2)}
            /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Profile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Billing Details
        </TabPanel>
        <TabPanel value={value} index={2}>
          Change Password
        </TabPanel>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
