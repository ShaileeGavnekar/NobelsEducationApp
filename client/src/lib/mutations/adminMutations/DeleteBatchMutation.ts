import { useAxios } from "../../../utils/Common";

type DeleteBatchMutationInput = {
  batchId: string;
};
export const DeleteBatchMutation: (
  input: DeleteBatchMutationInput
) => Promise<any> = async ({ batchId }) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.delete(
      `${process.env.NEXT_PUBLIC_BACKEND}/admin/deleteBatch`,

      {
        withCredentials: true,
        params: { batchId: batchId },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
