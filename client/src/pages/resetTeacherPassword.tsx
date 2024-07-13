import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { H4 } from "../components/common/typography";
import useCustomSnackbar from "../hooks/useSnackbar";
import { SaveTeacherPasswordMutation } from "../lib/mutations/SaveTeacherPasswordMutation";
import useDataCodes from "../lib/useDataCode";

const ResetTeacherPasswordPage: React.FC = () => {
  const [pass, setPass] = React.useState("");
  const router = useRouter();
  const token: string = router.query.token as string;
  const [confirmPass, setConfirmPass] = React.useState("");
  const { data, error: dataCodeError } = useDataCodes(token);
  const [showError, setShowError] = React.useState(false);
  const [error, setError] = React.useState("");
  const { showError: showErrorMsg, showSuccess } = useCustomSnackbar();
  const { mutate } = useMutation(SaveTeacherPasswordMutation, {
    onSuccess: () => {
      showSuccess("Password was saved successfully!");
    },
    onError: (e: { message: string }) => {
      showErrorMsg(e.message);
    },
  });

  React.useEffect(() => {
    if (Boolean(dataCodeError)) {
      showErrorMsg(
        "Link might have been expired or might already have been used."
      );
    }
  }, [dataCodeError]);

  React.useEffect(() => {
    setShowError(false);
    setError("");
  }, [pass, confirmPass]);

  const handleSavePassword = () => {
    if (pass != confirmPass) {
      setShowError(true);
      setError("Password in both the feilds should match");
    } else if (pass.length === 0) {
      setShowError(true);
      setError("Password cant be empty");
    } else {
      mutate({ token: token, password: pass });
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ width: "400px", marginX: "auto", marginTop: "40px" }}>
          <Box>
            <H4>
              Hey {data?.name}, You are being invited as Teacher, Please set up
              your password , so that you can login into your dashboard{" "}
            </H4>
          </Box>
          <Box sx={{ width: "80%", marginY: "16px", marginX: "auto" }}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={"password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                label="Password"
              />
            </FormControl>
          </Box>
          <Box sx={{ width: "80%", marginY: "16px", marginX: "auto" }}>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password2"
                type={"password"}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                label="Confirm Password"
              />
            </FormControl>
          </Box>
          {showError && (
            <Box m={2}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}
          <Box sx={{ width: "80%", marginY: "16px", marginX: "auto" }}>
            <Button
              variant="contained"
              onClick={handleSavePassword}
              sx={{ width: "100%" }}
            >
              SAVE PASSWORD
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResetTeacherPasswordPage;
