import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";

export type Teacher = {
  userId: string;
  expertiseCourse: Array<string>;
  _id: string;
};
const useGetAllTeachers = () => {
  const axiosIns = useAxios();
  return useQuery<Teacher[], Error>(
    "allTeachers",
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/getAllTeachers`,
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

export default useGetAllTeachers;
