import { useAxios } from "../../../utils/Common";

export interface UpdateClassInput {
  courseId: string;
  startTime: string;
  topic: string;
  duration: number;
  description: string;
  meetingId: string;
  _id: string;
}

export const UpdateClassMutation = async (data: UpdateClassInput) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.put(
      `${process.env.NEXT_PUBLIC_BACKEND}/admin/updateClass`,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
