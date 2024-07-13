import { NextPage } from "next";
import React from "react";
import { ComponentProps } from "../../_app";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CreateClassForm from "../../../components/admin/CreateClassForm";
import AddIcon from "@mui/icons-material/Add";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import Image from "next/image";
import { H1, H4 } from "../../../components/common/typography";
import ClassesCard from "../../../components/students/Classes/ClassesCard";
import { styled, useTheme } from "@mui/material/styles";
import useGetAllClasss from "../../../lib/useGetAllClasses";
import { isUndefined } from "lodash";
import ClassDetails from "../../../components/admin/ClassDetails";

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  "&.Mui-selected": {
    color: theme.palette.primary.dark,
  },
}));

const MyClassesPage: NextPage<ComponentProps> = () => {
  const [tab, setTab] = React.useState("1");
  const [selectedIndex, setSelectedIndex] = React.useState();
  const theme = useTheme();
  const [openAdd, setOpenAdd] = React.useState(false);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { data, isLoading } = useGetAllClasss();

  if (isLoading) return <>Loading</>;
  return (
    <Box p={2}>
      {openAdd && (
        <CreateClassForm
          open={openAdd}
          onClose={() => {
            setOpenAdd(false);
          }}
        />
      )}
      <Box pb={4}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <H1>Classes</H1>
            <H4>Manage all your classes from here</H4>
          </Grid>
          <Grid item>
            <Tooltip title="Create Class">
              <Box
                style={{
                  borderStyle: "solid",
                  borderRadius: "50%",
                  borderWidth: "thin",
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => setOpenAdd(true)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      <TabContext value={tab}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Box>
              <TabList
                onChange={(e, b) => {
                  setTab(b);
                }}
                aria-label="lab API tabs example"
              >
                <StyledTab label="All Classes" value="1" />
              </TabList>
            </Box>
          </Grid>
          <Grid item>
            <Tooltip title="Filters">
              <IconButton>
                <FilterListOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <TabPanel value="1">
          <Grid container spacing={2}>
            <Grid item xs={12} md={5} sm={12}>
              {data?.map((c, i) => {
                return (
                  <Box pb={4}>
                    <ClassesCard
                      topic={c.topic}
                      description={c.description}
                      startTime={c.startTime}
                      index={i}
                      selectedIndex={selectedIndex!}
                      batchName={c.batchName}
                      onCardClick={(i) => setSelectedIndex(i as any)}
                      classId={c._id}
                      meetingId={c.meetingId}
                      password={c.passCode}
                      attachments={c.attachments}
                    />
                  </Box>
                );
              })}
            </Grid>
            {!matches && (
              <Grid item xs={12} md={6} sm={0} component={Paper} m={2}>
                {isUndefined(selectedIndex) ? (
                  <>
                    <Box pl={2}>
                      <H4 pb={2}>
                        <b>
                          Please select or click on a class card to preview
                          joining details.
                        </b>
                      </H4>
                      <Box>
                        <Box style={{ width: "fit-content", margin: "auto" }}>
                          <Image src={"/select.png"} width={500} height={400} />
                          <Box mb={4} width={"500px"}>
                            <Typography
                              color={theme.palette.text.secondary}
                              align={"center"}
                            >
                              No Class is selected. Click on any class card to
                              preview the details of the class ,join classes and
                              make changes if needed.
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <ClassDetails
                    classId={data?.[selectedIndex]._id!}
                    attachments={data?.[selectedIndex]?.attachments}
                  />
                )}
              </Grid>
            )}
          </Grid>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Box>
  );
};
export default MyClassesPage;
