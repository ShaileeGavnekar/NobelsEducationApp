import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";

export type Course = {
  name: string;
  description?: string;
  numberOfClasses: string;
  price: number;
  teacherIds: Array<string>;
  discount: number;
  ageGroup: string;
  courseProgress: string;
  courseLevel: string;
  _id: string;
  starred: boolean;
  subHeader: string;
  tags: Array<string>;
  curriculum: Array<string>;
};

const useGetTeacherCourses = () => {
  const axiosIns = useAxios();
  return useQuery<Course[]>(
    "get-reacher-courses",
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/teacher/courses`,
        { withCredentials: true }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useGetTeacherCourses;
