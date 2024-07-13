import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";

export type Student = {
  name: string;
  email: string;
  dob: string;
  phoneNumber: string;
  _id: string;
};

const useGetAllStudents = () => {
  const axiosIns = useAxios();
  return useQuery<Student[]>(
    "get-all-Students",
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/getAllStudents`,
        { withCredentials: true }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useGetAllStudents;
