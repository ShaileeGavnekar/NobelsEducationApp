import { useQuery } from 'react-query';
import { useAxios } from '../utils/Common';

const useEnrolledCourses = (studentId: string) => {
  const axiosIns = useAxios();
  return useQuery(
    'enrolled-courses',
    async () => {
      const { data } = await axiosIns.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/student/getMyCourse`,
        { studentId },
        { withCredentials: true }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useEnrolledCourses;
