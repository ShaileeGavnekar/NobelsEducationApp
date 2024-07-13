import { useQuery } from "react-query";
import { Course } from "../types/Course";
import { useAxios } from "../utils/Common";

export const useGetAllCourses = () => {
  const axiosIns = useAxios();
  return useQuery<Course[], Error>(
    "allCourses",
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/student/getAllCourse`,
        { withCredentials: true }
      );

      return data;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
};
