import React from "react";
import FormWrapper from "./Forms";
import * as yup from "yup";
import { Field, FieldProps } from "formik";
import { Autocomplete, Skeleton, styled, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import useCustomSnackbar from "../../hooks/useSnackbar";
import { CreateClassMutation } from "../../lib/mutations/adminMutations/CreateClassMutation";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { isUndefined } from "lodash";
import useAllCourses from "../../lib/useAllCourses";
import useGetAllBatches from "../../lib/useGetAllBatches";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));
type option = {
  label: string;
  id: string;
};

type CreateClassFormFields = {
  batchId: string;
  startTime: string;
  passCode: string;
  meetingId: string;
  meetingLink: string;
  duration: number;
  topic: string;
  description: string;
  courseName: string;
  batchName: string;
  courseId: string;
};

const initialValues: CreateClassFormFields = {
  courseId: "",
  batchId: "",
  meetingId: "",
  meetingLink: "",
  duration: 0,
  courseName: "",
  topic: "",
  startTime: "",
  description: "",
  passCode: "",
  batchName: "",
};

interface ISchduleClassForm {
  open: boolean;
  onClose: () => void;
}

const schema = yup.object({
  // name: yup.string().required(),
  // email: yup.string().email(),
});

type SchduleClassRequest = {
  courseId: string;
  topic: string;
  startTime: string;
  description: string;
  passCode: string;
};

const CreateClassForm: React.FC<ISchduleClassForm> = ({ open, onClose }) => {
  const { data, isLoading: courseLoading } = useAllCourses();
  const { data: batchesData, isLoading: batchLoading } = useGetAllBatches();
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useCustomSnackbar();

  const { mutate, isLoading } = useMutation(CreateClassMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-classs").then(() => {
        showSuccess("class was created Successfully!");
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

  const batchOptions =
    batchLoading || isUndefined(batchesData)
      ? []
      : batchesData.map((b) => {
          //@ts-ignore
          return { label: b.name, id: b._id, courseId: b.course._id };
        });
  return (
    <>
      <FormWrapper<CreateClassFormFields>
        open={open}
        handleClose={onClose}
        title={"Schdule Class"}
        initialValues={initialValues}
        confirmLabel={"CREATE"}
        dismissLabel={"CLOSE"}
        subHeader={
          "Select the course , time and class details to schdule the classes"
        }
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
                      <StyledTextField {...params} label="Course" />
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
                {batchLoading || !Boolean(batchesData) ? (
                  <Skeleton />
                ) : (
                  <Autocomplete
                    disablePortal
                    id="batches"
                    disabled={
                      isUndefined(e.values.courseId) ||
                      !Boolean(e.values.courseId)
                    }
                    options={batchOptions.filter(
                      (b) => b.courseId === e.values.courseId
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <StyledTextField {...params} label="Batch" />
                    )}
                    value={{
                      label:
                        batchOptions.find((o) => o.id === e.values.batchId)
                          ?.label ?? "",
                      id: e.values.batchId,
                      courseId: e.values.courseId,
                    }}
                    getOptionLabel={(o) => o.label}
                    onChange={(m, o) => {
                      e.setValues({
                        ...e.values,
                        batchId: o?.id!,
                        batchName: o?.label!,
                      });
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

                {/* <Field name="passCode">
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues["passCode"]>) => (
                    <StyledTextField
                      fullWidth
                      id="passCoder"
                      label="Pass Code"
                      // required
                      {...field}
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched ? meta.error : ""}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                </Field> */}
              </div>
            </>
          );
        }}
      />
    </>
  );
};

export default CreateClassForm;
