import React from "react";
import FormWrapper from "./Forms";
import * as yup from "yup";
import { Field, FieldProps } from "formik";
import { Autocomplete, Skeleton, styled, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import useCustomSnackbar from "../../hooks/useSnackbar";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { isUndefined } from "lodash";
import useAllCourses from "../../lib/useAllCourses";
import { UpdateClassMutation } from "../../lib/mutations/adminMutations/UpdateClassMutation";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));
type option = {
  label: string;
  id: string;
};

type UpdateClassFormFields = {
  courseId: string;
  topic: string;
  startTime: string;
  description: string;
  _id: string;
};

interface IUpdateClassForm {
  open: boolean;
  onClose: () => void;
  initialValues: UpdateClassFormFields;
}

const schema = yup.object({
  // name: yup.string().required(),
  // email: yup.string().email(),
});

const UpdateClassForm: React.FC<IUpdateClassForm> = ({
  open,
  onClose,
  initialValues,
}) => {
  const { data, isLoading: courseLoading } = useAllCourses();
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useCustomSnackbar();

  const { mutate, isLoading } = useMutation(UpdateClassMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-classs").then(() => {
        showSuccess("class was updated Successfully!");
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
      <FormWrapper<UpdateClassFormFields>
        open={open}
        handleClose={onClose}
        title={"Update Class Schdule"}
        initialValues={initialValues}
        confirmLabel={"Update"}
        dismissLabel={"CLOSE"}
        subHeader={"Update the course , time of class according to you"}
        validationSchema={schema}
        handleSubmit={(v) => {
          mutate({ ...v, duration: 40 } as any);
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
                      e.setValues({ ...e.values, courseId: o?.id! });
                    }}
                  />
                )}
                <Field name="topic">
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues["topic"]>) => (
                    <StyledTextField
                      fullWidth
                      id="topic"
                      label="Topic"
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <StyledTextField
                        fullWidth
                        id="d&TOFCLASS"
                        label="Date & Time of Class"
                        required
                        {...props}
                        error={!!(e.touched.startTime && e.errors.startTime)}
                        helperText={
                          e.touched.startTime ? e.errors.startTime : ""
                        }
                        variant="outlined"
                        margin="normal"
                      />
                    )}
                    label="Date & Time of Class"
                    value={e.values.startTime}
                    onChange={(newValue: any) => {
                      e.setValues({
                        ...e.values,
                        startTime: new Date(newValue).toISOString(),
                      });
                    }}
                  />
                </LocalizationProvider>
              </div>
            </>
          );
        }}
      />
    </>
  );
};

export default UpdateClassForm;
