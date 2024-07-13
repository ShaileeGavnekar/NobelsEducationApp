import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";

export interface Classes {
  courseId: string;
  startTime: string;
  passCode?: string;
  meetingId: string;
  meetingLink: string;
  topic: string;
  description: string;
  attachments: string;
  _id: string;
}

const useGetTeachersClasses = () => {
  const axiosIns = useAxios();
  return useQuery<Classes[]>(
    "all-teacher-classes",
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/teacher/classes`,
        { withCredentials: true }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useGetTeachersClasses;
