import { useAxios } from "../../../utils/Common";

export interface UpdateCourseInput {
  name: string;
  description?: string;
  numberOfClasses: number;
  price: number;
}

export const UpdateCourseMutation = async (data: any) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.put(
      `${process.env.NEXT_PUBLIC_BACKEND}/admin/updateCourse`,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
