import { useAxios } from '../../../utils/Common';

export interface CreateCourseInput {
  name: string;
  description?: string;
  numberOfClasses: number;
  price: number;
}

export const CreateCourseMutation = async (data: CreateCourseInput) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/admin/createCourse`,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
