import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";

export type Teacher = {
  name: string;
  email: string;
  dob: string;
  phoneNumber: string;
  _id: string;
};

const useGetAllTeachers = () => {
  const axiosIns = useAxios();
  return useQuery<Teacher[]>(
    "get-all-teachers",
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/getAllTeachers`,
        { withCredentials: true }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useGetAllTeachers;
