import { formatError } from "../../utils/utils";
import { useAxios } from "./../../utils/Common";

export const SendOTPMutation = async ({
  phoneNumber,
}: {
  phoneNumber: string;
}) => {
  const axiosIns = useAxios();
  try {
    const { data } = await axiosIns.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/send-otp`,

      { withCredentials: true, params: { mobileNumber: phoneNumber } }
    );
    return data;
  } catch (error) {
    const e = formatError(error);
    throw new Error(e);
  }
};
