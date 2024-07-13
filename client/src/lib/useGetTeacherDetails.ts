import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";

export interface TeacherDetails {
  _id: string;
  name: string;
  email: string;
  initialized: boolean;
  dob: string;
  contactNumber: string;
  address: string;
  joinedOn: string;
  coursesEnrolled: [
    {
      courseName: string;
      price: number;
    }
  ];
}

const useGetTeacherDetails = (teacherId: string) => {
  const axiosIns = useAxios();
  return useQuery<TeacherDetails>(
    `class-details-${teacherId}`,
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/getTeacherDetails`,
        { withCredentials: true, params: { teacherId: teacherId } }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useGetTeacherDetails;
