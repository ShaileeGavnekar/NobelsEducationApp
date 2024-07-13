import React from "react";
import FormWrapper from "./Forms";
import * as yup from "yup";
import { Field, FieldProps } from "formik";
import { Autocomplete, Skeleton, styled, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import useCustomSnackbar from "../../hooks/useSnackbar";
import { isUndefined } from "lodash";
import useAllCourses from "../../lib/useAllCourses";
import { CreateBatchMutation } from "../../lib/mutations/adminMutations/CreateBatchMutation";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

type CreateBatchFormFields = {
  name: string;
  description: string;
  courseId: string;
  age: number;
  upperLimit: number;
  currentStrength: number;
  courseName: string;
};

const initialValues: CreateBatchFormFields = {
  name: "",
  description: "",
  courseId: "",
  age: 0,
  upperLimit: 0,
  currentStrength: 0,
  courseName: "",
};

interface ICreateBatchForm {
  open: boolean;
  onClose: () => void;
}

const schema = yup.object({
  // name: yup.string().required(),
  // email: yup.string().email(),
});

const CreateBatchForm: React.FC<ICreateBatchForm> = ({ open, onClose }) => {
  const { data, isLoading: courseLoading } = useAllCourses();
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useCustomSnackbar();

  const { mutate, isLoading } = useMutation(CreateBatchMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-batches").then(() => {
        showSuccess("Batch was created Successfully!");
        onClose();
      });
    },
    onError: (e) => {
      showError(e as string);
      console.log(e);
    },
  });
  const options =
    courseLoading || isUndefined(data)
      ? []
      : data.map((d) => {
          return { label: d.name, id: d._id };
        });
  return (
    <>
      <FormWrapper<CreateBatchFormFields>
        open={open}
        handleClose={onClose}
        title={"Create Batch"}
        initialValues={initialValues}
        confirmLabel={"CREATE"}
        dismissLabel={"CLOSE"}
        subHeader={
          "Create batches of courses, and then schdule classes of various batch"
        }
        validationSchema={schema}
        handleSubmit={(v) => {
          mutate({ ...v, duration: 40, course: v.courseId } as any);
        }}
        render={(e) => {
          return (
            <>
              <div>
                {isLoading || !Boolean(data) ? (
                  <Skeleton />
                ) : (
                  <Autocomplete
                    disablePortal
                    id="courses"
                    options={options}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <StyledTextField {...params} label="Courses" />
                    )}
                    value={{
                      label:
                        options.find((o) => o.id === e.values.courseId)
                          ?.label ?? "",
                      id: e.values.courseId,
                    }}
                    getOptionLabel={(o) => o.label}
                    onChange={(m, o) => {
                      e.setValues({
                        ...e.values,
                        courseId: o?.id!,
                        courseName: o?.label!,
                      });
                    }}
                  />
                )}
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
                <Field name="description">
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues["description"]>) => (
                    <StyledTextField
                      fullWidth
                      id="description"
                      label="Description"
                      required
                      multiline
                      rows={2}
                      maxRows={4}
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
                <Field name="upperLimit">
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues["upperLimit"]>) => (
                    <StyledTextField
                      fullWidth
                      id="upperLimit"
                      label="Capacity"
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

export default CreateBatchForm;
