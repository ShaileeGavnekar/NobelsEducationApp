import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";

export type TeacherDetails = {
  name: string;
  email: string;
  dob: string;
  phoneNumber: string;
  _id: string;
};

const useDataCodes = (dataCode: string) => {
  const axiosIns = useAxios();
  return useQuery<TeacherDetails>(
    "teacher-details",
    async () => {
      try {
        const { data } = await axiosIns.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/teacher/getDetailsUsingToken`,

          { withCredentials: true, params: { dataCode: dataCode } }
        );

        return data;
      } catch (e: any) {
        throw new Error("Something went sring");
      }
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useDataCodes;
