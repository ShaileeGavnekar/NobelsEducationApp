import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";

export type Batch = {
  name: string;
  description: string;
  courseName: string;
  courseId: string;
  age: number;
  upperLimit: number;
  currentStrength: number;
  _id: string;
};

const useGetAllBatches = () => {
  const axiosIns = useAxios();
  return useQuery<Batch[]>(
    "get-all-batches",
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/getAllBatches`,
        { withCredentials: true }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useGetAllBatches;
