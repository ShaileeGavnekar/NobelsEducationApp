import {
  Card,
  Grid,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Box, styled, useTheme } from "@mui/system";
import { Paragraph, Span } from "../../components/common/typography";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import { LoginMutation } from "../../lib/user";
import { ComponentProps } from "../_app";
import useCustomSnackbar from "../../hooks/useSnackbar";
import { useAuth } from "../../contexts/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { useAxios } from "../../utils/Common";

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center",
}));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const IMG = styled("img")(() => ({
  width: "100%",
}));

const LoginRoot = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh",
  "& .card": {
    maxWidth: 800,
    borderRadius: 12,
    margin: "1rem",
  },
}));

const StyledProgress = styled(CircularProgress)(() => ({
  position: "absolute",
  top: "6px",
  left: "25px",
}));
const initialValues = {
  email: "johndoe@gmail.com",
  password: "123456",
};
const validationSchema = yup.object({
  email: yup.string().required("Email is required"),
});
const Login: NextPage<ComponentProps> = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const { showSuccess } = useCustomSnackbar();
  const { refetchViewer } = useAuth();
  const { palette } = useTheme();
  const textError = palette.error.main;
  const textPrimary = palette.primary.main;

  const axiosIns = useAxios();
  const queryClient = useQueryClient();
  const handleForgotPassword = async (data: { email: string }) => {
    const s = axiosIns
      .post(`${process.env.NEXT_PUBLIC_BACKEND}/student/sendPwMail`, data)
      .then((response) => {
        showSuccess(
          "Please check your mail and follow the instruction in it to reset your password."
        );
      });

    return s;
  };

  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleForgotPassword({
        email: values.email,
      });
    },
  });
  const handleShowPassword = () => {
    setVisible(!visible);
  };

  return (
    <LoginRoot>
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
            <JustifyBox p={4} height="100%">
              <IMG src="/login.svg" alt="login" />
            </JustifyBox>
          </Grid>
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <ContentBox>
              <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
                <TextField
                  sx={{ mb: 3, width: "100%" }}
                  variant="outlined"
                  size="small"
                  label="Email"
                  // type='email'
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Typography>
                  Enter your email to send the reset password link
                </Typography>
                <Button sx={{ color: textPrimary }} type="submit">
                  SEND MAIL
                </Button>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </LoginRoot>
  );
};

export default Login;
