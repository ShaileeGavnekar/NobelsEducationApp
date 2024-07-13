import { formatError } from "../../utils/utils";
import { useAxios } from "./../../utils/Common";

export const ResetPasswordMutation = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  const axiosIns = useAxios();
  try {
    const { data } = await axiosIns.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/student/updatePw`,
      { dataCode: token, password },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    const e = formatError(error);
    throw new Error(e);
  }
};
