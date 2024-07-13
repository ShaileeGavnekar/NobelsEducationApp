import { useAxios } from "../../../utils/Common";

export interface ChangeBatchInput {
  userId: string;
  newBatchId: string;
  oldBatchId: string;
}

export const ChangeBatchMutation = async (data: ChangeBatchInput) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/admin/changeBatch`,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
