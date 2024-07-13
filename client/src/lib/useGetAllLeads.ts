import { useQuery } from "react-query";
import { useAxios } from "../utils/Common";

export type Lead = {
  name: string;
  phoneNumber: string;
  _id: string;
};

const useGetAllLeads = () => {
  const axiosIns = useAxios();
  return useQuery<Lead[]>(
    "get-all-leads",
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/getAllLeads`,
        { withCredentials: true }
      );

      return data;
    },
    { retry: 0, refetchOnWindowFocus: false, refetchOnReconnect: false }
  );
};

export default useGetAllLeads;
