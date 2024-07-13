import { useQuery } from "react-query";
import { Course } from "../types/Course";
import { useAxios } from "../utils/Common";

export interface Classes {
  courseId: string;
  startTime: string;
  passCode?: string;
  meetingId: string;
  meetingLink: string;
  topic: string;
  description: string;
  _id: string;
  attachments: string;
}

const useMyClasses = (studentId: string) => {
  const axiosIns = useAxios();
  return useQuery<Classes[]>(
    "all-classes",
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/student/getMyClasses`,
        { withCredentials: true, params: { studentId: studentId } }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useMyClasses;
