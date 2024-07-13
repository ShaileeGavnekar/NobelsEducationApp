import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Contact from "../../common/contact";
import Footer from "../../common/footer";
import CakeIcon from "@mui/icons-material/Cake";
import StairsIcon from "@mui/icons-material/Stairs";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { AppRoutes } from "../../../utils/Common";
import { Course } from "../../../types/Course";
import { Box } from "@mui/system";
import { H1, H2, H3, H4, H5, H6 } from "../../common/typography";
import { useTheme } from "@mui/material/styles";
import TrialFormWrapper from "../../admin/trialForm";

const BookTrialBtn = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#884CF8"),
  backgroundColor: "#884CF8",
  width: "100%",
  "&:hover": {
    backgroundColor: "#884CF8",
  },
}));

const DetailsBtn = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(136, 76, 248, 0.1)",
  borderRadius: "2em",
  color: "#884CF8",
  margin: "0.5em",
  width: "100%",
  "&:hover": {
    backgroundColor: "rgba(136, 76, 248, 1)",
    color: "white",
  },
}));
interface CourseCardProps {
  course: Course;
}

const CourseCard2: React.FC<CourseCardProps> = ({ course }) => {
  const router = useRouter();
  const theme = useTheme();
  const handleRedirection = () => {
    router.push(`/${course._id}`);
  };
  const [openTrial, setOpenTrial] = React.useState(false);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {openTrial && (
        <>
          <TrialFormWrapper open={openTrial} setOpenTrial={setOpenTrial} />
        </>
      )}
      <Card
        sx={{
          maxWidth: "100%",
          height: matches ? "540px" : "500px",
          boxShadow: "0px 4px 300px rgba(65, 75, 99, 0.1) !important",
          borderRadius: "8px",
        }}
        onClick={handleRedirection}
      >
        <CardActionArea>
          <CardMedia
            sx={{ padding: "1.5em", borderRadius: "1.8em" }}
            height="300px"
            component="img"
            image={
              Boolean(course?.avatar)
                ? `${process.env.NEXT_PUBLIC_BACKEND}/student/getCourseAvatar?key=${course.avatar}`
                : "https://houseofsoftskills.com/assets/img/speaking.jpg"
            }
            // image="https://houseofsoftskills.com/assets/img/speaking.jpg"
            alt="green iguana"
          />
          <CardContent sx={{ padding: "0 1.5em 1.5em 1.5em" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              mb={2}
              style={{
                color: "rgb(69, 18, 117)",
              }}
            >
              <H4 fontWeight="bold" sx={{ color: "rgb(69, 18, 117)" }}>
                {course.name}
              </H4>
            </Box>

            <Box height={"84px"}>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {course.description}
              </Typography>
            </Box>
            <Box
              display={matches ? "" : "flex"}
              //   justifyContent="space-between"
              alignItems="center"
            >
              <Box width="100%" paddingRight={2}>
                <DetailsBtn
                  variant="contained"
                  onClick={() => handleRedirection()}
                >
                  View Details
                </DetailsBtn>
              </Box>
              <Box
                width="100%"
                paddingLeft={matches ? 0 : 6}
                mt={matches ? 2 : 0}
              >
                <BookTrialBtn
                  variant="contained"
                  sx={{ borderRadius: "2em" }}
                  onClick={() => setOpenTrial(true)}
                >
                  Book Free Trial
                </BookTrialBtn>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default CourseCard2;
