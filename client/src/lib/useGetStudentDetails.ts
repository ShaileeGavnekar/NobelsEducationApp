import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";

export interface StudentDetails {
  _id: string;
  name: string;
  email: string;
  initialized: boolean;
  dob: string;
  contactNumber: string;
  address: string;
  joinedOn: string;
  coursesPurchased: [
    {
      courseId: string;
      courseName: string;
      price: number;
      batchName: string;
      batchId: string;
    }
  ];
}

const useGetStudentDetails = (studentId: string) => {
  const axiosIns = useAxios();
  return useQuery<StudentDetails>(
    `class-details-${studentId}`,
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/getstudentDetails`,
        { withCredentials: true, params: { studentId: studentId } }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useGetStudentDetails;
