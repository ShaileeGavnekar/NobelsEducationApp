import { useAxios } from '../utils/Common';

export const Logout = async () => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/logout`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
