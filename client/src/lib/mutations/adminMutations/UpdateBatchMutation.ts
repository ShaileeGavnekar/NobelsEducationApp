import { useAxios } from "../../../utils/Common";

export interface UpdateBatchInput {
  name: string;
  description?: string;
  courseId: string;
  courseName: string;
  age: Array<Number>;
  upperLimit: Number;
  _id: string;
}

export const UpdateBatchMutation = async (data: UpdateBatchInput) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.put(
      `${process.env.NEXT_PUBLIC_BACKEND}/admin/updateBatch`,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
