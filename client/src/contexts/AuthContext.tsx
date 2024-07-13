import { useRouter } from "next/router";
import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";
import LoadingScreen from "../components/common/LoadingScreen";
import { AdminUser, StudentUser, TeacherUser, User } from "../types/User";
import { useAxios } from "../utils/Common";
import { isUndefined } from "lodash";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";
import TeacherLayout from "../components/teacher/TeacherLayout";
import StudentLayout from "../components/students/StudentLayout/StudentLayout";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  user: StudentUser | AdminUser | TeacherUser | undefined;
  userInfo: User | undefined;
  isLoading: boolean;
  refetchViewer: any;
  // avatar: string | "";
  // setAvatar: React.Dispatch<React.SetStateAction<string>> | null;
}>({
  isAuthenticated: false,
  user: undefined,
  userInfo: undefined,
  isLoading: true,
  refetchViewer: () => {},
});

const AuthProvider: React.FC = ({ children }) => {
  const axiosIns = useAxios();

  const { data, isLoading, refetch } = useQuery<
    StudentUser | AdminUser | TeacherUser
  >(
    "user",
    async () => {
      const { data } = await axiosIns.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/getUser`,
        { withCredentials: true }
      );
      return data;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!data?.user,
        user: data,
        userInfo: data?.user,
        isLoading,
        refetchViewer: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

interface Props {
  children: any;
}
export const ProtectRoute: React.FC<Props> = ({ children }) => {
  const { isLoading, user } = useAuth();
  const router = useRouter();
  const paths = router.route.split("/");
  const first = paths[1] || "";

  const isProtectedRoute = React.useMemo(() => {
    return first === "dashboard";
  }, [first]);

  const isCorrectRolePath = (path: string, role: string) => {
    if (path === role.toLowerCase()) {
      return true;
    } else return false;
  };

  React.useEffect(() => {
    if (!isLoading) {
      if (isProtectedRoute && Boolean(user)) {
        if (isCorrectRolePath(paths[2], user?.user.role!)) {
        } else {
          router.push(`/dashboard/${user?.user.role.toLowerCase()}`);
        }
      } else if (!isProtectedRoute && !Boolean(user)) {
      } else if (isProtectedRoute && !Boolean(user)) {
        router.push("/");
      } else if (!isProtectedRoute && Boolean(user) && !isUndefined(user)) {
        router.push(`/dashboard/${user?.user.role.toLowerCase()}`);
      }
    }
  }, [isProtectedRoute, user, isLoading, paths]);

  if (isLoading) {
    return <LoadingScreen loading={isLoading} />;
  }

  if (Boolean(user)) {
    if (isProtectedRoute && Boolean(user) && !isUndefined(user)) {
      const userData: StudentUser | AdminUser | TeacherUser = user;

      if (userData.user.role === "ADMIN") {
        return <AdminLayout>{children}</AdminLayout>;
      } else if (userData.user.role === "TEACHER") {
        return <TeacherLayout>{children}</TeacherLayout>;
      } else return <StudentLayout>{children}</StudentLayout>;
    }
  }
  return children;
};
