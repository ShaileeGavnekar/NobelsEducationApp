import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppRoutes, axiosInstance, useAxios } from "../../utils/Common";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";

import { styled } from "@mui/material/styles";
import FilledInput from "@mui/material/FilledInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "react-query";
import { LoginMutation } from "../../lib/user";
import useCustomSnackbar from "../../hooks/useSnackbar";

interface SignUpData {
  username: string;
  password: string;
  address: string;
  phoneNumber: string;
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface State {
  password: string;
  showPassword: boolean;
}

export default function Login() {
  const router = useRouter();
  const axiosInst = useAxios();
  const { isLoading, refetchViewer } = useAuth();
  const check = () => {
    axiosInst
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/api/getUser`)
      .then((response) => {
        console.log(response.data);
      });
  };
  const { showSuccess, showError } = useCustomSnackbar();
  const { mutate } = useMutation(LoginMutation, {
    onSuccess: (data) => {
      showSuccess("Logged in");
      refetchViewer();
      router.push("/dashboard/student");
    },
    onError: (e: Error) => {
      showError(e.message);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const signUpData: any = {
      username: data.get("email")!,
      password: data.get("password")!,
    } as SignUpData;
    mutate(signUpData);
    // const signUpData: any = {
    //   username: data.get('email')!,
    //   password: data.get('password')!,
    //   address: data.get('address'),
    //   phoneNumber: data.get('phoneNumber'),
    // } as SignUpData;

    axiosInst
      .post(`${process.env.NEXT_PUBLIC_BACKEND}/api/local-login`, signUpData)
      .then((response) => {
        response.data;
        refetchViewer();
        router.push("/dashboard/student");
        // check()
      });
  };

  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#A020F0"),
    backgroundColor: "#A020F0",
    "&:hover": {
      backgroundColor: "#A020F0",
    },
  }));

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Container component="main">
      <Typography
        sx={{
          marginLeft: "auto",
          fontSize: "18px",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "0.5em",
        }}
      >
        Don’t have an account? &nbsp;{" "}
        <a href="#">
          <span style={{ color: "#A020F0" }}>Get started</span>
        </a>
      </Typography>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontFamiliy: "'Ubuntu', sans-serif" }}
        >
          Log In
        </Typography>
        <Typography
          sx={{
            fontFamiliy: "'Ubuntu', sans-serif ",
            fontSize: "1.3em",
            color: "#737680",
          }}
        >
          Enter your details below.
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              {/* <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              /> */}

              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  required
                  name="password"
                  id="password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
          </Grid>
          <div>
            <Checkbox {...label} defaultChecked />
            Remember me
            <a
              href="#"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                fontWeight: "bold",
                color: "#A020F0",
                marginTop: "-2em",
              }}
            >
              Forgot Password?
            </a>
          </div>
          <br />
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button> */}
          <ColorButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ borderRadius: "1em" }}
          >
            Log In
          </ColorButton>

          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
}
