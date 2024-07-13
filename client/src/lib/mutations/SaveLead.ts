import { formatError } from "../../utils/utils";
import { useAxios } from "./../../utils/Common";

export const SaveLeadMutation = async ({
  name,
  phoneNumber,
}: {
  name: string;
  phoneNumber: string;
}) => {
  const axiosIns = useAxios();
  try {
    const { data } = await axiosIns.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/student/createLeads`,
      { name, phoneNumber },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    const e = formatError(error);
    throw new Error(e);
  }
};
