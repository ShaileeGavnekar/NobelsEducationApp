import { AdminUser, StudentUser, TeacherUser } from "../types/User";

export const convertHexToRGB = (hex: string): string => {
  // check if it's a rgba
  if (hex.match("rgba")) {
    let triplet = hex.slice(5).split(",").slice(0, -1).join(",");
    return triplet;
  }

  let c: string[];
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    let d: any = "0x" + c.join("");

    return [(d >> 16) & 255, (d >> 8) & 255, d & 255].join(",");
  }
  return "##222A45";
};

export const formatError = (error: any): string => {
  return error?.data?.errors?.[0] ?? "Something went wrong ! Please try again";
};

export function isError<Type>(
  inputType:
    | Type
    | {
        errors: string[];
      }
): inputType is {
  errors: string[] | any[];
} {
  return (<
      {
        errors: string[] | any[];
      }
    >inputType).errors !== undefined;
}

export function isStudent(
  input: AdminUser | StudentUser | TeacherUser
): input is StudentUser {
  return (input as StudentUser).student !== undefined;
}
