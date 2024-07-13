import { NextPage } from "next";
import React from "react";
import Banner from "../components/common/banner";
import Courses from "../components/common/courses";
import Learningjourney from "../components/common/learningJourney";
import LearningPhilosophies from "../components/common/learningPhilosophies";
import VideoPart from "../components/common/videoPart";
import Accordion from "../components/common/accordion";
import Leads from "../components/common/quickLead";
import Footer from "../components/common/footer";
import Book from "../components/students/dashboard/BookCard";
import { Box } from "@mui/material";

const LandingPage: NextPage = () => {
  return (
    <>
      <Box>
        <Banner />
      </Box>
      <Box>
        <Courses />
      </Box>
      <Learningjourney />

      <VideoPart />
      <LearningPhilosophies />
      {/* <Contact /> */}

      <Accordion />
      <Leads />
      <Book />
      <Footer />
    </>
  );
};

export default LandingPage;
