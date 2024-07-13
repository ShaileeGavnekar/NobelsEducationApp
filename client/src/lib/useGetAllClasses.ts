import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";

export type Class = {
  topic: string;
  description: string;
  price: number;
  duration: string;
  startTime: string;
  teachers: Array<string>;
  _id: string;
  attachments: string;
  meetingId: string;
  passCode: string;
  batchName: string;
  courseName: string;
  batchId: string;
};

const useGetAllClasss = () => {
  const axiosIns = useAxios();
  return useQuery<Class[]>(
    "get-all-classs",
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/getAllClass`,
        { withCredentials: true }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useGetAllClasss;
