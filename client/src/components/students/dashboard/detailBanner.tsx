import React from "react";
import Navbarcomp from "../../common/navBarCom";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import useRazorpay from "react-razorpay";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { useMutation } from "react-query";

import { Course } from "../../../types/Course";
import { useAxios } from "../../../utils/Common";
import useCustomSnackbar from "../../../hooks/useSnackbar";
import {
  PayOrderInput,
  PayOrderMutation,
} from "../../../lib/mutations/studentMutations/PayOrderMutation";
import { useAuth } from "../../../contexts/AuthContext";
import FaceIcon from "@mui/icons-material/Face";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AutoModeIcon from "@mui/icons-material/AutoGraph";
import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import { Router, useRouter } from "next/router";
import useGetAllBatches from "../../../lib/useGetAllBatches";
import BatchSelectionDialog from "../../common/batchSelection";

export interface CreateOrderMutationReq {
  courseId: string;
}

export interface CreateOrderResponse {
  id: string;
  currency: string;
  amount: number;
}
export interface PayOrderRequest {
  courseId: string;
}

export interface PayOrderResponse {
  id: string;
  currency: string;
  amount: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    BannerContainer: {
      height: "100vh",
      width: "100%",
      backgroundSize: "cover",
      // backgroundColor: "#EFFCFF",
      backgroundRepeat: "no-repeat",
      backgroundImage: "url('/1e.jpg')",
      backgroundPosition: "center",
      // [theme.breakpoints.down("md")]: {
      //   backgroundImage: "url('/resbackground.png')",
      // },
      [theme.breakpoints.down("sm")]: {
        height: "110vh",
      },
    },

    Bannerhero: {
      height: "90.5%",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },

    BannerLeft: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      [theme.breakpoints.down("md")]: {
        width: "100%",
        height: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },

    Bannercontent: {
      width: "80%",
      height: "100%",
      display: "flex",
      marginLeft: "5em",
      flexDirection: "column",
      justifyContent: "center",
      gap: "20px",
      marginTop: "100px",
      [theme.breakpoints.down("md")]: {
        textAlign: "center",
        alignItems: "center",
        marginLeft: "2em",
      },
    },

    bannerimg: {
      height: "80%",
      width: "80%",
      marginLeft: theme.spacing(6),
      [theme.breakpoints.down("md")]: {
        display: "none",
        height: "100%",
        width: "100%",
        objectFit: "contain",
      },
    },

    bannerimgs: {
      display: "none",
      [theme.breakpoints.down("md")]: {
        height: "100%",
        display: "block",
        margin: "0 auto",
        paddingTop: "1em",
      },
      [theme.breakpoints.down("sm")]: {
        height: "50%",
        display: "block",
        margin: "0 auto",
      },
    },

    heading: {
      fontWeight: "900",
      fontSize: "4rem",
      color: "#FFFFFF",
      letterSpacing: "0.2px",
    },

    child: {
      color: "#884cf8",
    },

    para: {
      // fontFamily: "Poppins",
      // fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "1rem",
      color: "rgba(14, 0, 122, 1)",
      width: "70%",
      letterSpacing: "0.1px",
      marginTop: "-0.3em",
      [theme.breakpoints.down("md")]: {
        width: "90%",
      },
    },

    bookbtn: {
      width: "150px",
      height: "40px",
      border: "none",
      backgroundColor: "#884CF8",
      color: "#ffffff",
      borderRadius: "20px",
      fontSize: "15px",
      lineHeight: "30px",

      "&:hover": {
        backgroundColor: "rgba(136, 76, 248, 1)",
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: "1em",
      },
    },

    free: {
      [theme.breakpoints.down("sm")]: {
        marginRight: "2em",
      },
    },

    rows: {
      display: "flex",
      flexDirection: "row",
      // fontFamily: "Poppins",
      // fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "15px",
      color: "#040038",
      gap: "10px",
      // marginTop: "-1em",
      marginLeft: "auto",
      marginRight: "auto",
      width: "fit-content",
      marginBottom: "48px",
    },

    p: {
      backgroundColor: "rgba(14, 0, 122, 0.1)",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      borderRadius: theme.spacing(2),
    },
  })
);

const icons = [
  <FaceIcon style={{ color: "#FFFFFF" }} />,
  <ThumbUpAltIcon style={{ color: "#FFFFFF" }} />,
  <AutoModeIcon style={{ color: "#FFFFFF" }} />,
];
function Banner(course: { course: Course }) {
  const classes = useStyles();
  const theme = useTheme();
  const [batchId, setBatchId] = React.useState("");
  const [courseId, setCourseId] = React.useState("");
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openBatchSelection, setOpenBatchSelection] = React.useState(false);
  const axiosInstance = useAxios();
  const { showError, showInfo } = useCustomSnackbar();
  const { user } = useAuth();
  console.log(user);
  const router = useRouter();
  const Razorpay = useRazorpay();
  const PayOrder = useMutation(PayOrderMutation, {
    onSuccess: (data) => {
      showInfo("payment done");
      console.log(data);
    },
    onError: (e: Error) => {
      showError(e.message);
      console.log(e);
    },
  });
  const { data, mutate } = useMutation<
    CreateOrderResponse,
    Error,
    CreateOrderMutationReq
  >(
    (vars: CreateOrderMutationReq) => {
      return axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/student/createOrder`,
        vars,
        { withCredentials: true }
      );
    },
    {
      onSuccess: () => {
        handlePayment();
      },
      onError: () => {
        showError("Something went wrong");
      },
    }
  );

  const handlePayment = async () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      amount: (course.course.price * 100).toString(),
      currency: "INR",
      name: course.course.name,
      description: course.course.description,
      image: "https://example.com/your_logo",
      order_id: data?.id as string,
      handler: async (response: any) => {
        const payOrderInput: PayOrderInput = {
          paymentId: response.razorpay_payment_id,
          courseId: course.course._id,
          // batchId:
          // @ts-ignore
          studentId: user?.student._id,
          batchId: batchId,
        };
        PayOrder.mutate(payOrderInput);
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "Nobels",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response: any) {
      showError("Payment Failed");
    });

    rzp1.open();
  };

  if (!Boolean(course)) {
    return <>Loading</>;
  }

  return (
    <>
      {openBatchSelection && (
        <BatchSelectionDialog
          open={openBatchSelection}
          onClose={() => setOpenBatchSelection(false)}
          handleSelect={(id: string) => {
            setBatchId(id);
            mutate({ courseId: courseId });
          }}
        />
      )}
      <div className={classes.BannerContainer}>
        {!user && <Navbarcomp />}
        <div className={classes.Bannerhero}>
          <div className={classes.BannerLeft}>
            <div className={classes.Bannercontent}>
              <Box>
                <Typography
                  variant={"h1"}
                  className={classes.heading}
                  align={"center"}
                >
                  {course.course.name}
                </Typography>
              </Box>
              <Typography
                style={{
                  color: "#F2D600",
                  // marginTop: "-2em",
                  fontWeight: "1000",
                  fontSize: "20px",
                }}
                align={"center"}
              >
                {course.course.subHeader}
              </Typography>
              {/* <Box
                display={"flex"}
                style={{
                  color: "white",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Box>
                  <MilitaryTechIcon fontSize="large" />
                </Box>
                <Typography fontSize={"large"}>
                  Certification awarded at completion of the course
                </Typography>
              </Box> */}

              <div className={classes.rows} style={{ display: "block" }}>
                {course?.course.tags?.map((tag, index) => {
                  return (
                    <Chip
                      label={tag}
                      color={index % 2 === 0 ? "secondary" : "primary"}
                      sx={{
                        fontSize: "16px",
                        backgroundColor: index % 2 === 0 ? "" : "#23A8F7",
                        color: "#FFFFFF",
                        margin: "8px",
                      }}
                      icon={icons[index % 3] as any}
                    />
                  );
                })}
              </div>
              <div
                style={{
                  width: "fit-content",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "24px",
                  display: matches ? "" : "flex",
                }}
              >
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (Boolean(user)) {
                        setCourseId(course.course._id);
                        setOpenBatchSelection(true);
                      } else {
                        showInfo("Please login or sign in to buy the course");
                        router.push("/auth/login");
                      }
                    }}
                    sx={{ width: "300px" }}
                  >
                    BUY COURSE
                  </Button>
                </Box>
                <Box mt={matches ? 4 : 0}>
                  <Button
                    variant="outlined"
                    sx={{
                      marginLeft: matches ? "" : "2em",
                      width: "300px",
                      color: "white",
                      borderColor: "white",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#3c52b2",
                      },
                    }}
                  >
                    BOOK A FREE TRIAL
                  </Button>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
