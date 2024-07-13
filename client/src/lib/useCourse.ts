import { useQuery } from "react-query";
import { Course } from "../types/Course";
import { useAxios } from "../utils/Common";

const useCourse = (courseId: string) => {
  const axiosIns = useAxios();
  return useQuery<Course>(
    "single-course",
    async () => {
      try {
        const { data } = await axiosIns.post(
          `${process.env.NEXT_PUBLIC_BACKEND}/student/getCourseDetails`,
          { courseId },
          { withCredentials: true }
        );

        return data;
      } catch (e) {
        throw new Error("Something went wrong");
      }
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useCourse;
