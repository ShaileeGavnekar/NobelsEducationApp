import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import { AdminUser, StudentUser, TeacherUser, User } from "../types/User";
import { AppProps } from "next/dist/shared/lib/router/router";
import { isUndefined } from "lodash";
import AdminLayout from "../components/admin/AdminLayout/AdminLayout";
import TeacherLayout from "../components/teacher/TeacherLayout";

export const axiosInstance = axios.create({
  // baseURL: 'https://safari-smart.herokuapp.com',
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
axios.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

export const isStudent = () => {};
export const isAdmin = () => {};
export const isTeacher = () => {};

export const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  });
  axios.defaults.withCredentials = true;

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error.response)
  );

  return axiosInstance;
};

export const useAppComponent = (
  isError: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  Component: any,
  pageProps: Omit<AppProps, "Component">,
  user?: AdminUser | StudentUser | TeacherUser,
  refetchViewer?: () => void
): JSX.Element => {
  const router = useRouter();
  const paths = router.route.split("/");
  const first = paths[1] || "";

  const isProtectedRoute = React.useMemo(() => {
    return first === "dashboard";
  }, [first]);

  if (Boolean(user))
    if (isProtectedRoute && isSuccess && Boolean(user) && !isUndefined(user)) {
      const l: any = user;
      const userInfo: User = user.user;

      if (l.user.role === "ADMIN") {
        return (
          <>
            <AdminLayout>
              <Component
                {...pageProps}
                user={userInfo}
                refetchViewer={refetchViewer}
              />
            </AdminLayout>
          </>
        );
      } else if (l.user.role === "STUDENT") {
        return (
          <>
            <Component
              {...pageProps}
              user={userInfo}
              refetchViewer={refetchViewer}
            />
          </>
        );
      } else
        return (
          <>
            <TeacherLayout>
              <Component
                {...pageProps}
                user={userInfo}
                refetchViewer={refetchViewer}
              />
            </TeacherLayout>
          </>
        );
    }

  return <Component {...pageProps} refetchViewer={refetchViewer} />;
};

export const getDashboardRoute = (role: string) => {
  switch (role) {
    case "ADMIN":
      return AppRoutes.ADMIN_DASHBOARD;
    case "TEACHER":
      return AppRoutes.TEACHER_DASHBOARD;
    case "STUDENT":
      return AppRoutes.STUDENT_DASHBOARD;
    default:
      return "/";
  }
};

export enum AppRoutes {
  SIGN_IN_PORTAL = "/signIn",
  STUDENT_LOGIN_PORTAL = "/login/student",
  STUDENT_DASHBOARD = "/dashboard/student",
  TEACHER_DASHBOARD = "/dashboard/teacher",
  ADMIN_DASHBOARD = "/dashboard/admin",
  TEACHER_LOGIN_PORTAL = "/login/teacher",
  ADMIN_LOGIN_PORTAL = "/login/admin",
}
