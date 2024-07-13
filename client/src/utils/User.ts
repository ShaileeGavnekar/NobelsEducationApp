import { useQuery } from 'react-query';
import { useAxios } from './Common';

export const useUser = () => {
  const axiosIns = useAxios();
  return useQuery('user', async () => {
    const { data } = await axiosIns.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/getUser`,
      { withCredentials: true }
    );
    return data;
  });
};
