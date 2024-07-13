import { useAxios } from '../../../utils/Common';

export interface CreateClassInput {
  courseId: string;
  startTime: string;
  topic: string;
  passCode: string;
  description?: string;
}

export const CreateClassMutation = async (data: CreateClassInput) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/admin/createClass`,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
