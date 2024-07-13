import { Box, Container, Grid } from "@mui/material";
import { isUndefined } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Contact from "../components/common/contact";
import Footer from "../components/common/footer";
import LoadingScreen from "../components/common/LoadingScreen";
import CourseCard from "../components/students/dashboard/CourseCard";
import Banner from "../components/common/coursesBanner";
import { useGetAllCourses } from "../queries/GetAllCoursesQuery";
import { ComponentProps } from "./_app";
import { height, styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import FilteredCourses from "../components/common/filteredCourses";
import BookCard from "../components/students/dashboard/BookCard";

const purple = {
  10: "rgba(136, 76, 248, 1)",
  1: "rgba(136, 76, 248, 0.1)",
};
const Tab = styled(TabUnstyled)(({ theme }) => ({
  color: `${purple[10]}`,
  cursor: "pointer",
  backgroundColor: `${purple[1]}`,
  fontSize: "0.875rem",
  width: "6rem",
  padding: "10px 12px",
  margin: "6px 6px",
  border: "none",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: `${purple[10]}`,
    color: "white",
  },
  "&:focus ": {
    color: "#fff",
    borderRadius: "3px",
    outlineOffset: "2px",
  },
  [`&.${tabUnstyledClasses.selected}`]: {
    backgroundColor: ` ${purple[10]}`,
    color: "white",
  },
  [`&.${buttonUnstyledClasses.disabled}`]: {
    opacity: "0.5",
    cursor: "not-allowed",
  },
}));
const TabPanel = styled(TabPanelUnstyled)(({ theme }) => ({
  width: "100%",
  fontSize: "0.875rem",
}));
const TabsList = styled(TabsListUnstyled)(({ theme }) => ({
  minWidth: "320px",
  borderRadius: "8px",
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignContent: "space-between",
  flexWrap: "wrap",
}));
const ExploreCoursePage: NextPage<ComponentProps> = () => {
  const [filterCourses, setFilterCourses] = useState<any>(null);
  const { data, error, isLoading } = useGetAllCourses();

  const filteredData = (age: number[]) => {
    if (!isUndefined(data)) {
      const filterData = data.filter((course) =>
        age.includes(Number(course.ageGroup))
      );
      setFilterCourses(filterData);
    }
    console.log(filterCourses);

    return filterCourses;
  };

  if (isLoading) {
    return <LoadingScreen loading={isLoading} />;
  }
  if (error || isUndefined(data)) {
    return <>Error Occured</>;
  }

  return (
    <>
      <Box>
        <Banner />
        <Box>
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab>All Ages</Tab>
              <Tab onClick={() => filteredData([3])}>3 Yrs</Tab>
              <Tab onClick={() => filteredData([4])}>4 Yrs</Tab>
              <Tab onClick={() => filteredData([5])}>5 Yrs</Tab>
              <Tab onClick={() => filteredData([9])}>9 Yrs</Tab>
              <Tab onClick={() => filteredData([10, 11])}>10-11 Yrs</Tab>
              <Tab onClick={() => filteredData([12, 13, 14, 15])}>
                12-15 Yrs
              </Tab>
            </TabsList>
            <TabPanel value={0}>
              <FilteredCourses courses={data} />
            </TabPanel>
            {[1, 2, 3, 4, 5, 6, 7].map((val, i) => (
              <TabPanel value={val} key={i}>
                <FilteredCourses courses={filterCourses} />
              </TabPanel>
            ))}
          </TabsUnstyled>
        </Box>
      </Box>{" "}
      <br />
      <br />
      {/* <Contact /> */}
      <BookCard />
      <Footer />
    </>
  );
};
export default ExploreCoursePage;
