import { NextPage } from "next";
import React from "react";
import { ComponentProps } from "../../_app";
import { Box, Grid, Paper, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import useMyClasses from "../../../lib/useMyClasses";
import { useAuth } from "../../../contexts/AuthContext";
import { H1, H4 } from "../../../components/common/typography";
import ClassesCard from "../../../components/students/Classes/ClassesCard";
import Image from "next/image";
import { styled, useTheme } from "@mui/material/styles";
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
  const { user } = useAuth();
  const newUser: any = user;
  const { data, isLoading } = useMyClasses(newUser.student._id);
  const [selectedIndex, setSelectedIndex] = React.useState();

  const theme = useTheme();
  if (isLoading) return <>Loading</>;
  return (
    <Box p={2}>
      <Box pb={4}>
        <H1 fontWeight="bold">My Classes</H1>
      </Box>

      <TabContext value={"1"}>
        <Box>
          <TabList onChange={() => {}} aria-label="lab API tabs example">
            <StyledTab label="All Classes" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <Box pb={4}>
                {data?.map((c, i) => {
                  return (
                    <Box pb={4}>
                      {/* @ts-ignore */}
                      <ClassesCard
                        topic={c.topic}
                        description={c.description}
                        startTime={c.startTime}
                        index={i}
                        selectedIndex={selectedIndex!}
                        onCardClick={(i) => setSelectedIndex(i as any)}
                        classId={c._id}
                        meetingId={c.meetingId}
                        password={c.passCode!}
                        attachments={c.attachments}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Grid>
            <Grid item xs={12} md={6} component={Paper} m={2}>
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
                  attachments={data?.[selectedIndex].attachments!}
                  studentSide
                />
              )}
            </Grid>
          </Grid>
          {/* <UpcomingClassTab classes={data!} /> */}
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
    </Box>
  );
};
export default MyClassesPage;
