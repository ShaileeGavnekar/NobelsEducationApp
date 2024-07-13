import { useAxios } from "../../../utils/Common";

export interface CreateBatchInput {
  name: string;
  description?: string;
  course: string;
  courseName: string;
  age: Array<Number>;
  upperLimit: Number;
}

export const CreateBatchMutation = async (data: CreateBatchInput) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/admin/createBatch`,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
