import { NextPage } from "next";
import React from "react";
import AdminLayout from "../../../../components/admin/AdminLayout/AdminLayout";
import * as yup from "yup";
import {
  Autocomplete,
  Button,
  Grid,
  Icon,
  Skeleton,
  styled,
  TextField,
} from "@mui/material";
import { Span } from "../../../../components/common/typography";
import {
  CreateClassInput,
  CreateClassMutation,
} from "../../../../lib/mutations/adminMutations/CreateClassMutation";
import { useMutation } from "react-query";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Formik, Form, Field, FieldProps, useFormik } from "formik";
import useAllCourses from "../../../../lib/useAllCourses";
import { isUndefined } from "lodash";
import useCustomSnackbar from "../../../../hooks/useSnackbar";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));
type option = {
  label: string;
  id: string;
};

const initialValues = {
  course: { id: "", label: "" } as option,
  startTime: new Date().toISOString(),
  // time: '',
  topic: "",
  passCode: "",
  description: "",
};

const validationSchema = yup.object({
  // courseId: yup.string().required("Course Id is required"),
  // date: yup.date().required("Date is required"),
  // time: yup.date().required('Time is required'),
  topic: yup.string(),
  // passCode: yup
  //   .string()
  //   .length(8, "Passcode must be of 8 digits")
  //   .required("Passcode is required"),
  // description: yup.string(),
});

const CreateClass: NextPage = () => {
  const { showInfo, showError } = useCustomSnackbar();
  const { data, isLoading: courseLoading } = useAllCourses();
  const { mutate, isLoading } = useMutation(CreateClassMutation, {
    onSuccess: () => {
      showInfo("Class was successfully created");
    },
    onError: (e) => {
      showError("Something went wrong");
    },
  });

  const options =
    courseLoading || isUndefined(data)
      ? []
      : data.map((d) => {
          return { label: d.name, id: d._id };
        });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutate({
          courseId: values.course.id,
          topic: values.topic,
          startTime: values.startTime,
          description: values.description,
          passCode: values.passCode,
        });
      }}
      render={({ values, setValues, errors, touched }) => {
        return (
          <>
            {" "}
            <Form
              aria-label="create class form"
              id="create-class-form"
              style={{ margin: "20px" }}
            >
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  {isLoading || !Boolean(data) ? (
                    <Skeleton />
                  ) : (
                    <Autocomplete
                      disablePortal
                      id="courses"
                      options={options}
                      renderInput={(params) => (
                        <StyledTextField {...params} label="Courses" />
                      )}
                      value={values.course}
                      getOptionLabel={(o) => o.label}
                      onChange={(e, o) => {
                        setValues({ ...values, course: o! });
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
                        label="Class Topic"
                        required
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="standard"
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
                        label="Description of Class"
                        required
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="standard"
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
                          error={!!(touched.startTime && errors.startTime)}
                          helperText={touched.startTime ? errors.startTime : ""}
                          variant="standard"
                          margin="normal"
                        />
                      )}
                      label="Date & Time of Class"
                      value={values.startTime}
                      onChange={(newValue: any) => {
                        setValues({
                          ...values,
                          startTime: new Date(newValue).toISOString(),
                        });
                      }}
                    />
                  </LocalizationProvider>
                  <Field name="passCode">
                    {({
                      field,
                      meta,
                    }: FieldProps<typeof initialValues["passCode"]>) => (
                      <StyledTextField
                        fullWidth
                        id="passCode"
                        label="Class Passcode"
                        required
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="standard"
                        margin="normal"
                      />
                    )}
                  </Field>
                  <Button color="primary" variant="contained" type="submit">
                    <Span sx={{ textTransform: "capitalize" }}>Submit</Span>
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </>
        );
      }}
    />
  );
};

export default CreateClass;
