import { useAxios } from "../../../utils/Common";

type DeleteClassMutationInput = {
  classId: string;
  meetingId: string;
};
export const DeleteClassMutation: (
  input: DeleteClassMutationInput
) => Promise<any> = async ({ classId, meetingId }) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.delete(
      `${process.env.NEXT_PUBLIC_BACKEND}/admin/deleteClass`,

      {
        withCredentials: true,
        params: { classId: classId, meetingId: meetingId },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
