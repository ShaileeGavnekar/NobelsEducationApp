import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";
import { Batch } from "./useGetAllBatches";

export type Course = {
  avatar: string;
  name: string;
  description?: string;
  numberOfClasses: string;
  price: number;
  teacherIds: Array<string>;
  discount: number;
  subHeader: string;
  tags: Array<string>;
  ageGroup: string;
  courseProgress: string;
  courseLevel: string;
  _id: string;
  starred: boolean;
  curriculum: Array<string>;
  courseTimeline: string;
  batches: Array<Batch>;
};

const useGetAllCourses = () => {
  const axiosIns = useAxios();
  return useQuery<Course[]>(
    "get-all-courses",
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

export default useGetAllCourses;
