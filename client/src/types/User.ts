export enum Status {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export enum Role {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
}

export enum Strategy {
  LOCAL = "LOCAL",
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
}

export type User = {
  _id: string;
  email: string;
  role: Role;
  strategy: Strategy;
  city: string;
  name: string;
  country: string;
  address: string;
  pinCode: string;
  parentsName: string;
  mobileNumber: string;
  state: string;
  age: number;
  class: string;
  avatar: string;
};

export interface IStudent {
  coursesEnrolled: Array<String>;
  status: Status;
  userId: string;
}

export type StudentUser = {
  user: User;
  student: IStudent;
};

export type AdminUser = {
  user: User;
};

export type TeacherUser = {
  user: User;
};
