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
  Theme,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { Box, styled, useTheme } from "@mui/system";
import { Paragraph } from "../../components/common/typography";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import * as yup from "yup";
import { LoginMutation } from "../../lib/user";
import { ComponentProps } from "../_app";
import useCustomSnackbar from "../../hooks/useSnackbar";
import { useAuth } from "../../contexts/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
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
  email: "",
  password: "",
};
const validationSchema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logotypeContainer: {
    backgroundColor: theme.palette.primary.main,
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  logotypeImage: {
    width: 165,
    marginBottom: theme.spacing(4),
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  formContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  form: {
    width: 320,
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  googleButton: {
    marginTop: theme.spacing(6),
    // boxShadow: theme.customShadows.widget,
    // boxShadow: theme.shadows[1],
    borderStyle: "solid",
    backgroundColor: "white",
    width: "100%",
    textTransform: "none",
  },
  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2),
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.secondary + "40",
  },
  errorMessage: {
    textAlign: "center",
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light,
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    borderBottomColor: theme.palette.background.default,
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400,
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },
  copyright: {
    marginTop: theme.spacing(4),
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing(2),
    },
  },
}));

const Login: NextPage<ComponentProps> = () => {
  const router = useRouter();
  const classes = useStyles();
  const [message, setMessage] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const { showSuccess } = useCustomSnackbar();
  const { refetchViewer } = useAuth();
  const { palette } = useTheme();
  const textError = palette.error.main;
  const textPrimary = palette.primary.main;
  const axiosIns = useAxios();

  const { mutate, isLoading } = useMutation(LoginMutation, {
    onSuccess: (data) => {
      showSuccess("Logged in");
      refetchViewer();
      router.push("/dashboard/student");
    },
    onError: (e: any) => {
      setMessage(e.message);
      console.log(e);
    },
  });

  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    //@ts-ignore
    const access_token = response.accessToken;
    axiosIns
      .post(`${process.env.NEXT_PUBLIC_BACKEND}/api/google-login`, {
        access_token,
      })
      .then((res) => {
        const { user, token } = res.data;
        //  Cookie.set("token", token);
        router.push("/");
      });
  };

  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate({ username: values.email, password: values.password });
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
                <TextField
                  sx={{ mb: "12px", width: "100%" }}
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
                {message && (
                  <Paragraph sx={{ color: textError }}>{message}</Paragraph>
                )}

                <FlexBox mb={2} flexWrap="wrap">
                  <Box position="relative">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isLoading}
                      type="submit"
                    >
                      Log in
                    </Button>
                    {isLoading && (
                      <StyledProgress size={24} className="buttonProgress" />
                    )}
                  </Box>
                  {/* <Span sx={{ mr: 1, ml: "20px" }}>or</Span>
                  <Button
                    sx={{ textTransform: "capitalize" }}
                    onClick={() => router.push("/auth/signup")}
                  >
                    Sign up
                  </Button> */}
                </FlexBox>
                <Button
                  sx={{ color: textPrimary }}
                  onClick={() => router.push("/auth/forgot-password")}
                >
                  Forgot password?
                </Button>
              </form>
              <Box mb={2}>
                {/* <Typography align={"center"}>OR</Typography> */}
                <Divider />
              </Box>
              {/* <GoogleLogin
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
                render={(renderProps) => (
                  <Button
                    size="large"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className={clsx(
                      classes.googleButton,
                      classes.googleButtonCreating
                    )}
                  >
                    <img
                      src={"/google.svg"}
                      alt="google"
                      className={classes.googleIcon}
                    />
                    &nbsp;Sign in with Google
                  </Button>
                )}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={(a) => {
                  console.log(a);
                }}
              /> */}
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </LoginRoot>
  );
};

export default Login;
