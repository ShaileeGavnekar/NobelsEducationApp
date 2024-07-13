import React from "react";
import { ZoomMtg } from "@zoomus/websdk";
import { useMutation } from "react-query";
import { getRegistrationTokenMutation } from "../../lib/mutations/studentMutations/GetRegistrantTokenMutation";
import { Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

interface IMeetingComponentProps {
  signature: string;
  meetingNumber: string;
  password: string;
}

const MeetingComponent: React.FC<IMeetingComponentProps> = ({
  signature,
  meetingNumber,
  password,
}) => {
  const { user } = useAuth();
  //   console.log(signature);
  const { mutate, data } = useMutation(getRegistrationTokenMutation, {
    onSuccess: (mainData) => {
      //   startMeeting(mainData.signature);
    },
  });

  React.useEffect(() => {
    ZoomMtg.setZoomJSLib("https://source.zoom.us/2.2.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    ZoomMtg.i18n.load("en-US");
    ZoomMtg.i18n.reload("en-US");
    startMeeting();
  }, []);

  function startMeeting() {
    // document.getElementById('zmmtg-root').style.display = 'block'
    console.log("here");
    ZoomMtg.init({
      leaveUrl: "http://localhost:3000",
      success: (success: any) => {
        console.log("s1", success);

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: user?.user.name!,
          apiKey: process.env.NEXT_PUBLIC_ZOOM_KEY!,
          userEmail: "validmail@gmail.com",
          passWord: password,
          tk: "",
          success: (success: any) => {
            console.log("s2", success);
          },
          error: (error: any) => {
            console.log("e2", error);
          },
        });
      },
      error: (error: any) => {
        console.log("e2", error);
      },
    });
  }

  return (
    <>
      <div></div>
      {/* <Button
        onClick={() => {
          mutate({});
        }}
      >
        JOIN
      </Button> */}
    </>
  );
};

export default MeetingComponent;
