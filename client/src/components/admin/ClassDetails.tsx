import { useTheme } from "@mui/material/styles";
import {
  Box,
  AvatarGroup,
  Avatar,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { red, blue, green, purple } from "@mui/material/colors";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import React from "react";
import { H2, H4, Span, H5, H6, H1 } from "../common/typography";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimelapseRoundedIcon from "@mui/icons-material/TimelapseRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import useGetClassDetails from "../../lib/useGetClassDetails";
import moment from "moment";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateClassForm from "./UpdateClassForm";
import DeleteDialogWrapper from "./DeleteWrapper";
import { useMutation, useQueryClient } from "react-query";
import useCustomSnackbar from "../../hooks/useSnackbar";
import { DeleteClassMutation } from "../../lib/mutations/adminMutations/DeleteClassMutation";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "@mui/material/Modal";
import Uploader from "../common/Uploader";
import PdfViewer from "../common/PdfViewer";
import ClassDetailOptions from "../common/classDetailActions";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import { getRegistrationTokenMutation } from "../../lib/mutations/studentMutations/GetRegistrantTokenMutation";
import { DeleteAttachementMutation } from "../../lib/mutations/adminMutations/RemoveAttachmentMutation";
import dynamic from "next/dynamic";

const MeetingComponent = dynamic(() => import("../zoom/Meeting"), {
  ssr: false,
});

interface ClassDetailsProps {
  classId: string;
  studentSide?: boolean;
  attachments?: string;
}

const ClassDetails: React.FC<ClassDetailsProps> = ({
  classId,
  studentSide,
  attachments,
}) => {
  const theme = useTheme();
  const { data, isLoading, refetch } = useGetClassDetails(classId);
  const { user }: { user: any } = useAuth();
  const [uploadFiles, setUploadFiles] = React.useState<boolean>(false);
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useCustomSnackbar();
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openPdfViewer, setOpenPdfViewer] = React.useState(false);
  const [openMeeting, setOpenMeeting] = React.useState(false);
  React.useEffect(() => {
    refetch();
  }, [classId]);

  const onUploadComplete = () => {
    queryClient.invalidateQueries("get-all-classs");
  };
  const { mutate } = useMutation(DeleteClassMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-classs").then(() => {
        showSuccess("Class was successfully deleted");
        setOpenDelete(false);
      });
    },
    onError: () => {
      showError("Something went wrong");
    },
  });
  const { mutate: registrationMutation, data: meetingData } = useMutation(
    getRegistrationTokenMutation,
    {
      onSuccess: () => {
        setOpenMeeting(true);
      },
      onError: () => {
        showError("Something went wrong");
      },
    }
  );

  const { mutate: removeAttachementMutation } = useMutation(
    DeleteAttachementMutation,
    {
      onSuccess: () => {
        showSuccess("Attachments were removed successfully");
      },
      onError: () => {
        showError("Something went wrong");
      },
    }
  );

  const handleDelete = () => {
    mutate({ classId: classId, meetingId: data?.meetingId! });
  };

  const handleJoinMeeting = () => {
    registrationMutation({
      meetingId: data?.meetingId!,
      apiKey: process.env.NEXT_PUBLIC_ZOOM_KEY as string,
      email: "validmail@gmail.com" as string,
      name: user?.user.name as string,
    });
  };

  const handleRemoveAttachment = () => {
    removeAttachementMutation({ classId: classId, fileKey: attachments! });
  };
  const handleViewAttachment = () => setOpenPdfViewer(true);
  const handleOpenUploadFiles = () => setUploadFiles(true);
  const handleCloseUploadFiles = () => setUploadFiles(false);
  const renderParticipants = (
    participants: Array<{ name: string; _id: string }>
  ) => {
    const colors = [red[500], blue[500], green[500], purple[500]];
    if (participants?.length === 0) {
      return <>No students are enrolled in this class and course</>;
    } else if (participants.length <= 5) {
      return (
        <>
          <AvatarGroup
            total={participants.length}
            style={{ justifyContent: "start" }}
          >
            {participants.map((p, i) => {
              return (
                <>
                  <Avatar
                    alt="Travis Howard"
                    sx={{ bgcolor: colors[i % participants?.length] }}
                  >
                    {p.name?.[0]}
                  </Avatar>
                </>
              );
            })}
          </AvatarGroup>
        </>
      );
    } else {
      return (
        <>
          <AvatarGroup
            total={participants.length}
            style={{ justifyContent: "start" }}
          >
            <Avatar alt={participants[0].name[0]} sx={{ bgcolor: red[500] }}>
              {participants?.[0]?.name?.[0]}
            </Avatar>
            <Avatar alt={participants[1].name[0]} sx={{ bgcolor: blue[500] }}>
              {participants?.[1]?.name?.[0]}
            </Avatar>
            <Avatar alt={participants[2].name[0]} sx={{ bgcolor: green[500] }}>
              {participants?.[2]?.name[0]}
            </Avatar>
            <Avatar alt={participants[3].name[0]} sx={{ bgcolor: purple[500] }}>
              {participants?.[3]?.name?.[0]}
            </Avatar>
          </AvatarGroup>
        </>
      );
    }
  };
  return (
    <>
      {openMeeting && (
        <MeetingComponent
          signature={meetingData?.signature}
          meetingNumber={data?.meetingId!}
          password={data?.password!}
        />
      )}
      {openPdfViewer && (
        <PdfViewer
          open={openPdfViewer}
          key={attachments!}
          onClose={() => setOpenPdfViewer(false)}
        />
      )}
      <Uploader
        entity="CLASS"
        endpoint={"/teacher/uploadAttachment"}
        allowedExtensions={[".pdf"]}
        onComplete={onUploadComplete}
        id={classId}
        open={uploadFiles}
        onClose={handleCloseUploadFiles}
        fieldName={"attachment"}
      />
      {isLoading ? (
        <div>
          <H1>Loading...</H1>
        </div>
      ) : (
        <>
          {openUpdate && (
            <>
              <UpdateClassForm
                open={openUpdate}
                onClose={() => {
                  setOpenUpdate(false);
                }}
                initialValues={{
                  _id: classId,
                  courseId: data?.courseId!,
                  topic: data?.topic!,
                  description: data?.description!,
                  startTime: data?.startTime!,
                }}
              />
            </>
          )}
          {openDelete && (
            <DeleteDialogWrapper
              open={openDelete}
              onClose={() => setOpenDelete(false)}
              header={"Delete Class"}
              subheader={
                "Are you sure , you want to delete this class? Once deleted, class and data associated with it wont be restored by any means"
              }
              confirmLabel={"Delete"}
              handleSubmit={() => handleDelete()}
            />
          )}

          <Box pl={4}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                {" "}
                <H2 pb={2}>{data?.topic}</H2>
              </Grid>
              {!Boolean(studentSide) && (
                <Grid item>
                  <Box pb={4}>
                    <Tooltip title="Update Class">
                      <IconButton
                        onClick={() => {
                          setOpenUpdate(true);
                        }}
                      >
                        <CreateIcon fontSize={"small"} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Class">
                      <IconButton
                        onClick={() => {
                          setOpenDelete(true);
                        }}
                      >
                        <DeleteIcon fontSize={"small"} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              )}
            </Grid>

            <H4 pb={2}>Lecture {data?.lectureNo}</H4>
            <Span color={theme.palette.text.secondary}>
              {data?.description}
            </Span>
            <Box pt={2} pb={2} mb={2}>
              <H4 pb={1}>Participants</H4>
              {renderParticipants(data?.participants!)}
            </Box>
            <Box display="flex" alignItems="center" pb={2}>
              <EventIcon fontSize="large" />
              <Box>
                <H5 pl={1}>{moment(data?.startTime).format("Do MMM, YYYY")}</H5>
                <H6 color={theme.palette.text.secondary} pl={1}>
                  Date
                </H6>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" pb={2}>
              <AssignmentOutlinedIcon fontSize="large" />
              <Box>
                <H5 pl={1}>{data?.courseName}</H5>
                <H6 color={theme.palette.text.secondary} pl={1}>
                  Course Name
                </H6>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" pb={2}>
              <AttractionsOutlinedIcon fontSize="large" />
              <Box>
                <H5 pl={1}>{data?.batchName}</H5>
                <H6 color={theme.palette.text.secondary} pl={1}>
                  Batch Name
                </H6>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" pb={2}>
              <AccessTimeIcon fontSize="large" />
              <Box>
                <H5 pl={1}>
                  {moment(data?.startTime).format("hh:mm a")} -{" "}
                  {moment(data?.startTime)
                    .add(data?.durations, "minute")
                    .format("hh:mm a")}
                </H5>
                <H6 color={theme.palette.text.secondary} pl={1}>
                  Time
                </H6>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" pb={2}>
              <TimelapseRoundedIcon fontSize="large" />
              <Box>
                <H5 pl={1}>{data?.durations} Minutes</H5>
                <H6 color={theme.palette.text.secondary} pl={1}>
                  Duration
                </H6>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" pb={2}>
              <AccountBoxIcon fontSize="large" />
              <Box>
                <H5 pl={1}>
                  {data?.teacher.name} ({data?.teacher.email})
                </H5>
                <H6 color={theme.palette.text.secondary} pl={1}>
                  Teacher
                </H6>
              </Box>
            </Box>
            <Box m={4} display="flex">
              <ClassDetailOptions
                handleJoinClass={handleJoinMeeting}
                handleRemoveAttachemnt={handleRemoveAttachment}
                handleUploadAttachment={handleOpenUploadFiles}
                handleViewAttachment={handleViewAttachment}
                attachments={attachments}
              />
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ClassDetails;
