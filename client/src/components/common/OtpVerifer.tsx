import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Grid,
  Link,
  TextField,
  Theme,
} from "@mui/material";

import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { Send } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import OtpInput from "react-otp-input-rc-17";
import Timer from "./timer";

const useStyles = makeStyles(
  ({ spacing, palette: { action, divider } }: Theme) =>
    createStyles({
      content: {
        "& .MuiFilledInput-root": {
          backgroundColor: action.hover,
        },
      },
      icon: {
        color: divider,
        fontSize: "3rem",
      },
      button: {
        width: spacing(25),
      },
      action: {
        padding: spacing(2),
      },
      otp: {
        marginTop: spacing(2),
      },
    })
);

export type VerifyPhoneProps = Omit<DialogProps, "title" | "onClose"> & {
  title?: React.ReactNode;
  email?: string;
  onClose: () => void;
  mobileNumber: string;
  onVerify: (data: any) => void;
  data: any;
};

const VerifyPhone: React.FC<VerifyPhoneProps> = ({
  title,
  email,
  onClose,
  onVerify,
  data,
  ...props
}) => {
  const [otp, setOtp] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [otpSent, setOtpSent] = React.useState(true);
  const [timer, setTimer] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const classes = useStyles();

  // React.useEffect(() => {
  //   if (otp.length === 4) {
  //     verifyOTP();
  //   }
  // }, [otp]);

  const sendOtp = () => {
    // setLoading(true);
    // const input: SendPhoneOTPInput = {
    //   phone: [mobile],
    //   userId: viewer?.id,
    // };
    // SendPhoneOTPMutation.commit(environment, input, {
    //   onSuccess: () => {
    //     showAlert(<Trans>OTP Was successfully sent</Trans>, {
    //       variant: "info",
    //     });
    //     setLoading(false);
    //     setOtpSent(true);
    //     setTimer(true);
    //   },
    //   onError: (e) => {
    //     showAlert(e, { variant: "error" });
    //     setLoading(false);
    //   },
    // });
  };
  const verifyOTP = () => {
    // setLoading(true);
    // setDisabled(true);
    // const input: VerifyPhoneOTPInput = {
    //   phone: mobile,
    //   otpCode: otp,
    // };
    // VerifyPhoneOTPMutation.commit(environment, input, {
    //   onSuccess: () => {
    //     showAlert(<Trans>Phone number was successfully verified</Trans>, {
    //       variant: "info",
    //     });
    //     setLoading(false);
    //     setOtpSent(true);
    //   },
    //   onError: (e) => {
    //     showAlert(e, { variant: "error" });
    //     setLoading(false);
    //     setError(true);
    //     setDisabled(false);
    //   },
    // });
  };
  return (
    <>
      <Dialog maxWidth="md" fullWidth {...props}>
        <DialogTitle>Verify Your Mobile Number</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box my={2}>Please enter 6 digit OTP sent on {mobile}</Box>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="OTP"
            type="number"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            fullWidth
            variant="outlined"
          />
          <Box my={1}>
            {timer ? (
              <>
                {" "}
                Resent OTP after
                <Timer initialSeconds={30} onTimeUp={() => setTimer(false)} />
              </>
            ) : (
              <Link onClick={sendOtp}>Resend OTP</Link>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>CANCEL</Button>
          <Button
            onClick={() => {
              onVerify({ ...data, otp: otp });
            }}
            variant="contained"
          >
            VERIFY
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Dialog maxWidth="md" fullWidth disableEnforceFocus {...props}>
        <DialogTitle>
          <Box display="flex">
            <>{title}</>
          </Box>
        </DialogTitle>
        <DialogContent className={classes.content}>
          {otpSent ? (
            <>
              {" "}
              <Box>Please enter OTP sent on {mobile}</Box>
              <Grid container>
                <Grid item xs={12}>
                  <OtpInput
                    value={otp}
                    onChange={(o: any) => {
                      setError(false);
                      setOtp(o);
                    }}
                    numInputs={6}
                    className={classes.otp}
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      margin: "0 1rem",
                      fontSize: "2 rem",
                      borderRadius: "4px",
                      border: error
                        ? `1px solid red !important`
                        : "1px solid rgba(0, 0, 0, 0.3)",
                    }}
                    hasErrored={error}
                    isDisabled={disabled}
                    errorStyle={{
                      border: `1px solid red !important`,
                    }}
                    separator={<span>&nbsp;</span>}
                  />
                </Grid>
                {loading && (
                  <Grid item xs={2}>
                    <Box m={2}>
                      <CircularProgress />
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Box my={2}>
                {timer ? (
                  <>
                    {" "}
                    Resent OTP after
                    <Timer
                      initialSeconds={30}
                      onTimeUp={() => setTimer(false)}
                    />
                  </>
                ) : (
                  <Link onClick={sendOtp}>Resend OTP</Link>
                )}
              </Box>
            </>
          ) : (
            <>
              <Box>An OTP will be sent on this number</Box>
              <Box py={1}>
                <TextField
                  name="phone"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <>
            <Button type="button" onClick={onClose} color="primary">
              CANCEL
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              endIcon={loading ? null : <Send />}
              loading={loading}
              onClick={sendOtp}
            >
              VERIFY
            </LoadingButton>
          </>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

VerifyPhone.defaultProps = {
  title: <>Verify Your Phone Number</>,
};

export default VerifyPhone;
