import { useAxios } from "../../../utils/Common";

export interface PayOrderInput {
  courseId: string;
  paymentId: string;
  studentId: string;
  batchId: string;
}

export const PayOrderMutation = async (data: PayOrderInput) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/student/payOrder`,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
