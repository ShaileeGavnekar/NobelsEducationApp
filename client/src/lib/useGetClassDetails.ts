import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";

export interface ClassDetails {
  topic: string;
  description: string;
  startTime: string;
  durations: string;
  courseName: string;
  courseId: string;
  meetingId: string;
  lectureNo: number;
  password: string;
  batchName: string;
  teacher: {
    email: string;
    name: string;
    _id: string;
  };
  participants: [
    {
      name: string;
      _id: string;
    }
  ];
}

const useGetClassDetails = (classId: string) => {
  const axiosIns = useAxios();
  return useQuery<ClassDetails>(
    `class-details-${classId}`,
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/getClassDetails`,
        { withCredentials: true, params: { classId: classId } }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useGetClassDetails;
