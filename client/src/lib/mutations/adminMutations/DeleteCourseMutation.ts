import { useAxios } from "../../../utils/Common";

export const DeleteCourseMutation = async (courseId: string) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.delete(
      `${process.env.NEXT_PUBLIC_BACKEND}/admin/deleteCourse`,

      { withCredentials: true, params: { courseId: courseId } }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
