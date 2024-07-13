import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  TextField,
  Theme,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Field, FieldProps, Form, Formik, useFormikContext } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { User } from "../../../types/User";
import { axiosInstance } from "../../../utils/Common";
import { Edit, Save } from "@mui/icons-material";
import useCustomSnackbar from "../../../hooks/useSnackbar";
import { useAuth } from "../../../contexts/AuthContext";

interface UpdateUserInfo {
  name: String;
  country: String;
  address: String;
  city: String;
  pinCode: String;
  parentsName: String;
  state: String;
  mobileNumber: String;
  age: number;
  class: String;
}

type UpdateUserInput = UpdateUserInfo;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    upperContainer: {
      padding: theme.spacing(6),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(3),
      },
    },
    button: {
      backgroundColor: theme.palette.primary.dark,
      marginLeft: "auto",
      marginRight: "48px",
      marginBottom: "16px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-start",
    },
  })
);

const UpdateStudentCard: React.FC = () => {
  const { showInfo, showError } = useCustomSnackbar();
  const classes = useStyles();
  const { userInfo } = useAuth();
  const mutation = useMutation(
    (updateUserInput: UpdateUserInput) => {
      return axiosInstance.put(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/updateUser`,
        updateUserInput,
        { withCredentials: true }
      );
    },
    {
      onSuccess: () => {
        showInfo("Updated Successfully !");
        setNonEditMode(!nonEditMode);
      },
      onError: () => {
        showError("Something went wrong");
      },
    }
  );

  const [nonEditMode, setNonEditMode] = React.useState(true);
  const initialValues = { ...userInfo };

  const handleClick = (v: any) => {
    if (!nonEditMode) {
      const updateInfo: UpdateUserInput = {
        name: v.name,
        address: v.address,
        country: v.country,
        state: v.state,
        mobileNumber: v.mobileNumber,
        city: v.city,
        age: v.age,
        parentsName: v.parentsName,
        pinCode: v.pinCode,
        class: v.class,
      };

      mutation.mutate(updateInfo);
    }
    setNonEditMode(!nonEditMode);
  };

  return (
    <>
      <Card sx={{ boxShadow: "0px 4px 30px rgba(65, 75, 99, 0.1) !important" }}>
        <Formik<typeof initialValues>
          initialValues={initialValues}
          // validationSchema={() => { }}
          onSubmit={(values) => {
            handleClick(values);
          }}
        >
          <Form>
            <Grid container className={classes.upperContainer}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field name="name">
                    {({
                      field,
                      meta,
                    }: FieldProps<typeof initialValues["name"]>) => (
                      <TextField
                        fullWidth
                        id="name-input"
                        label="Full Name"
                        required
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="outlined"
                        margin="normal"
                        disabled={nonEditMode}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="email">
                    {({
                      field,
                      meta,
                    }: FieldProps<typeof initialValues["email"]>) => (
                      <TextField
                        fullWidth
                        id="name-input"
                        label="Email"
                        required
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="outlined"
                        margin="normal"
                        disabled={true}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field name="parentsName">
                    {({
                      field,
                      meta,
                    }: FieldProps<typeof initialValues["parentsName"]>) => (
                      <TextField
                        fullWidth
                        id="name-input"
                        label="Parent's Name"
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="outlined"
                        margin="normal"
                        disabled={nonEditMode}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="age">
                    {({
                      field,
                      meta,
                    }: FieldProps<typeof initialValues["age"]>) => (
                      <TextField
                        fullWidth
                        id="name-input"
                        label="Age (in years)"
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="outlined"
                        margin="normal"
                        disabled={true}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field name="mobile">
                    {({
                      field,
                      meta,
                    }: FieldProps<typeof initialValues["mobileNumber"]>) => (
                      <TextField
                        fullWidth
                        id="name-input"
                        label="Phone Number"
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="outlined"
                        margin="normal"
                        disabled={nonEditMode}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="country">
                    {({
                      field,
                      meta,
                    }: FieldProps<typeof initialValues["country"]>) => (
                      <TextField
                        fullWidth
                        id="name-input"
                        label="Country"
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="outlined"
                        margin="normal"
                        disabled={nonEditMode}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field name="state">
                    {({
                      field,
                      meta,
                    }: FieldProps<typeof initialValues["state"]>) => (
                      <TextField
                        fullWidth
                        id="name-input"
                        label="State"
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="outlined"
                        margin="normal"
                        disabled={nonEditMode}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="address">
                    {({
                      field,
                      meta,
                    }: FieldProps<typeof initialValues["address"]>) => (
                      <TextField
                        fullWidth
                        id="address-input"
                        label="Address"
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="outlined"
                        margin="normal"
                        disabled={nonEditMode}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field name="class">
                    {({
                      field,
                      meta,
                    }: FieldProps<typeof initialValues["class"]>) => (
                      <TextField
                        fullWidth
                        id="class-input"
                        label="Class/Grade"
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="outlined"
                        margin="normal"
                        disabled={nonEditMode}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="pinCode">
                    {({
                      field,
                      meta,
                    }: FieldProps<typeof initialValues["pinCode"]>) => (
                      <TextField
                        fullWidth
                        id="pin-code-input"
                        label="Pin-Code"
                        {...field}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched ? meta.error : ""}
                        variant="outlined"
                        margin="normal"
                        disabled={nonEditMode}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
            </Grid>
            <Box className={classes.buttonContainer}>
              <Box ml={6}>
                {!nonEditMode && (
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => setNonEditMode(!nonEditMode)}
                  >
                    CANCEL
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.button}
                  startIcon={nonEditMode ? <Edit /> : <Save />}
                >
                  {nonEditMode ? "EDIT" : "SAVE"}
                </Button>
              </Box>
            </Box>
          </Form>
        </Formik>
      </Card>
    </>
  );
};

export default UpdateStudentCard;
