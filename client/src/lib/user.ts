import { useAxios } from "../utils/Common";

export interface LoginInput {
  username: string;
  password: string;
}

export const LoginMutation = async (loginData: LoginInput) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/local-login`,
      loginData
    );
    return response.data;
  } catch (error) {
    throw new Error("Invalid Password or Email");
  }
};

export interface SignupInput {
  name: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
}

export const SignupMutation = async (signupData: SignupInput) => {
  const axiosIns = useAxios();
  try {
    const response = await axiosIns.post(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/register-local`,
      signupData
    );
    return response.data;
  } catch (error) {
    throw new Error("Email is existing, Please try with other.");
  }
};
