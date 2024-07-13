import { useQuery } from "react-query";
import { Course } from "../types/Course";
import { useAxios } from "../utils/Common";

const useAllCourses = () => {
  const axiosIns = useAxios();
  return useQuery<Course[]>(
    "all-course",
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/getAllCourses`,
        { withCredentials: true }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useAllCourses;
