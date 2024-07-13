import React, { useState } from "react";
import { Box, styled, useTheme } from "@mui/system";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { SignupMutation } from "../../lib/user";
import * as yup from "yup";
import { Paragraph, Span } from "../../components/common/typography";
import { useFormik } from "formik";
import useCustomSnackbar from "../../hooks/useSnackbar";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import OtpVerifer from "./../../components/common/OtpVerifer";
import { SendOTPMutation } from "../../lib/mutations/SendOTPMutation";

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center",
}));

const ContentBox = styled(JustifyBox)(() => ({
  height: "100%",
  padding: "32px",
  background: "rgba(0, 0, 0, 0.01)",
}));

const IMG = styled("img")(() => ({
  width: "100%",
}));

const SignupRoot = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    borderRadius: 12,
    margin: "1rem",
  },
}));
const initialValues = {
  name: "",
  email: "",
  password: "",
  address: "",
  phoneNumber: "",
};
const validationSchema = yup.object({
  name: yup.string().required("name is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
  address: yup.string(),
  phoneNumber: yup.string(),
});
const Signup: NextPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [details, setDetails] = React.useState<any>();
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const { showSuccess } = useCustomSnackbar();
  const { palette } = useTheme();
  const textError = palette.error.main;

  const { mutate, isLoading } = useMutation(SignupMutation, {
    onSuccess: (data) => {
      showSuccess("Account successfully created. Please login to continue");
      router.push("/auth/login");
    },
    onError: (e: any) => {
      setMessage(e.message);
      console.log(e);
    },
  });
  const { mutate: sendOtpMutatate, isLoading: sendOtpLoading } = useMutation(
    SendOTPMutation,
    {
      onSuccess: (data) => {
        setDetails({ ...data.smsSessionId });
      },
      onError: (e: any) => {
        setMessage(e.message);
        console.log(e);
      },
    }
  );

  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      sendOtpMutatate({ phoneNumber: values.phoneNumber });
      setOpen(true);

      // mutate(values);
    },
  });
  const onVerify = (d: any) => {
    mutate(d);
  };
  const handleShowPassword = () => {
    setVisible(!visible);
  };
  const m = { ...values, ...details };
  return (
    <>
      <OtpVerifer
        open={open}
        onClose={() => setOpen(false)}
        mobileNumber={details?.phoneNumber}
        onVerify={onVerify}
        data={m}
      />
      <SignupRoot>
        <Card className="card">
          <Box
            display={"flex"}
            ml={1}
            mt={1}
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            <IconButton>
              <HomeIcon />
            </IconButton>
            <Box mt={1}>
              <Typography>Home</Typography>
            </Box>
          </Box>
          <Grid container>
            <Grid item lg={5} md={5} sm={5} xs={12}>
              <ContentBox>
                <IMG src="/vc.jpg" alt="" />
              </ContentBox>
            </Grid>
            <Grid item lg={7} md={7} sm={7} xs={12}>
              <Box p={4} height="100%">
                <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
                  <TextField
                    sx={{ mb: 3, width: "100%" }}
                    variant="outlined"
                    size="small"
                    label="Name"
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    sx={{ mb: 3, width: "100%" }}
                    variant="outlined"
                    size="small"
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    sx={{ mb: 3, width: "100%" }}
                    label="Password"
                    variant="outlined"
                    size="small"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    type={visible ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            edge="end"
                          >
                            {visible ? (
                              <Visibility fontSize="small" />
                            ) : (
                              <VisibilityOff fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* <TextField
                  sx={{ mb: 3, width: "100%" }}
                  label="Address"
                  variant="outlined"
                  size="small"
                  id="address"
                  name="address"
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                /> */}
                  <TextField
                    sx={{ mb: "16px", width: "100%" }}
                    label="Phone Number"
                    variant="outlined"
                    size="small"
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                  {message && (
                    <Paragraph sx={{ color: textError }}>{message}</Paragraph>
                  )}
                  <FormControlLabel
                    sx={{ mb: "16px" }}
                    name="check-box"
                    control={
                      <Checkbox
                        size="small"
                        onChange={() => setChecked(!checked)}
                        checked={checked}
                      />
                    }
                    color="secondary"
                    label="I have read and agree to the terms of service."
                  />
                  <FlexBox>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      sx={{ textTransform: "capitalize" }}
                      disabled={isLoading || !checked}
                    >
                      Sign up
                    </Button>
                    <Span sx={{ mr: 1, ml: "20px" }}>or</Span>
                    <Button
                      sx={{ textTransform: "capitalize" }}
                      onClick={() => router.push("/auth/login")}
                    >
                      Log in
                    </Button>
                  </FlexBox>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </SignupRoot>
    </>
  );
};

export default Signup;
