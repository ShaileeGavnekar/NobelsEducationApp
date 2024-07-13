import React from "react";
import { useRouter } from "next/router";
import Banner from "../components/students/dashboard/detailBanner";
import Demo from "../components/students/dashboard/demo";
import Expert from "../components/students/dashboard/Expert";
import useCourse from "../lib/useCourse";
import useCustomSnackbar from "../hooks/useSnackbar";

const CourseDetails = () => {
  const router = useRouter();
  const { courseDetails: courseId } = router.query;
  const { data, isLoading, error } = useCourse(courseId! as string);
  const { showError } = useCustomSnackbar();
  React.useEffect(() => {
    if (Boolean(error)) {
      router.push("/");
      showError("Invalid URL or No such course exists.");
    }
  }, [error, data, isLoading]);

  if (isLoading || !Boolean(data)) return <>Loading....</>;
  return (
    <>
      <Banner course={data as any} />
      <Demo />
      <Expert course={data!} />
    </>
  );
};

export default CourseDetails;
