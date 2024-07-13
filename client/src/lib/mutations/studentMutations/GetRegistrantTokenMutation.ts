import { useAxios } from "../../../utils/Common";

export interface GetRegistrantToken {
  meetingId: string;
  email: string;
  name: string;
  apiKey: string;
}

export const getRegistrationTokenMutation = async (
  data: GetRegistrantToken
) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/student/addMeInClass`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
