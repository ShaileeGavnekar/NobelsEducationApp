import { useAxios } from "../../../utils/Common";

export const DeleteAttachementMutation = async ({
  classId,
  fileKey,
}: {
  classId: string;
  fileKey: string;
}) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.delete(
      `${process.env.NEXT_PUBLIC_BACKEND}/teacher/removeAttachments`,

      { withCredentials: true, params: { classId: classId, fileKey: fileKey } }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
