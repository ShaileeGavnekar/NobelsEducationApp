import React from "react";
import FormWrapper from "./Forms";
import * as yup from "yup";
import { Field, FieldProps } from "formik";
import { styled, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../utils/Common";
import useCustomSnackbar from "../../hooks/useSnackbar";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));
type option = {
  label: string;
  id: string;
};

type InviteTacherFormFields = {
  name: string;
  email: string;
  age: string;
  joiningDate: string;
  phoneNumber: string;
};

const initialValues = {
  name: "",
  email: "",
  age: "",
  joiningDate: "",
  phoneNumber: "",
};

interface IInviteTeacherFrom {
  open: boolean;
  onClose: () => void;
}

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email(),
});

type InviteTeacherRequest = {
  name: string;
  email: string;
  age: string;
  phoneNumber: string;
};

const InviteTeacherForm: React.FC<IInviteTeacherFrom> = ({ open, onClose }) => {
  const axiosIns = useAxios();
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useCustomSnackbar();
  const handleInviteTeacher = async (data: InviteTeacherRequest) => {
    const s = axiosIns
      .post(`${process.env.NEXT_PUBLIC_BACKEND}/admin/invite`, data)
      .then((response) => response.data);

    return s;
  };

  const { mutate, isLoading } = useMutation(handleInviteTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-teachers").then(() => {
        showSuccess("Invite sent Successfully!");
        onClose();
      });
    },
    onError: (e) => {
      showError(e as string);
      console.log(e);
    },
  });
  return (
    <>
      <FormWrapper<InviteTacherFormFields>
        open={open}
        handleClose={onClose}
        title={"Invite Teacher"}
        initialValues={initialValues}
        confirmLabel={"SEND INVITATION"}
        dismissLabel={"CLOSE"}
        subHeader={
          "This will send a invitation mail to teacher with a link to setup their password. and login into the teacher's dashboard"
        }
        validationSchema={schema}
        handleSubmit={(v) => {
          mutate(v);
        }}
        render={(e) => {
          return (
            <>
              <div>
                <Field name="name">
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues["name"]>) => (
                    <StyledTextField
                      fullWidth
                      id="name"
                      label="Name"
                      required
                      {...field}
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched ? meta.error : ""}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                </Field>
                <Field name="email">
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues["email"]>) => (
                    <StyledTextField
                      fullWidth
                      id="email"
                      label="Email"
                      required
                      {...field}
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched ? meta.error : ""}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                </Field>
                <Field name="age">
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues["age"]>) => (
                    <StyledTextField
                      fullWidth
                      id="age"
                      label="Age"
                      required
                      {...field}
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched ? meta.error : ""}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                </Field>
                <Field name="phoneNumber">
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues["phoneNumber"]>) => (
                    <StyledTextField
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      required
                      {...field}
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched ? meta.error : ""}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                </Field>
              </div>
            </>
          );
        }}
      />
    </>
  );
};

export default InviteTeacherForm;
