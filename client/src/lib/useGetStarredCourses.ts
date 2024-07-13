import { useQuery } from "react-query";
import { Course } from "../types/Course";
import { useAxios } from "../utils/Common";

const useGetStarredCourse = () => {
  const axiosIns = useAxios();
  return useQuery<Course[]>(
    "single-starerd-course",
    async () => {
      try {
        const { data } = await axiosIns.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/student/getStarredCourse`,
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

export default useGetStarredCourse;
