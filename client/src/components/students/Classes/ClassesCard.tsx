import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, CardActionArea, useMediaQuery } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { H5 } from "../../common/typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { themeShadows } from "../../../theme/themeColors";
import moment from "moment";
import ClassDetailOptions from "../../common/classDetailActions";
import { DeleteAttachementMutation } from "../../../lib/mutations/adminMutations/RemoveAttachmentMutation";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../../../contexts/AuthContext";
import useCustomSnackbar from "../../../hooks/useSnackbar";
import { DeleteClassMutation } from "../../../lib/mutations/adminMutations/DeleteClassMutation";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import { getRegistrationTokenMutation } from "../../../lib/mutations/LoginMutation";
import PdfViewer from "../../common/PdfViewer";
import Uploader from "../../common/Uploader";
import dynamic from "next/dynamic";

const MeetingComponent = dynamic(() => import("../../zoom/Meeting"), {
  ssr: false,
});

interface ClassCardProps {
  topic: string;
  description: string;
  startTime: string;
  batchName: string;
  index: number;
  selectedIndex: number | null;
  onCardClick: (index: number) => void;
  attachments?: string;
  classId: string;
  meetingId: string;
  password: string;
}
const ClassesCard: React.FC<ClassCardProps> = ({
  topic,
  description,
  startTime,
  index,
  selectedIndex,
  onCardClick,
  attachments,
  batchName,
  classId,
  meetingId,
  password,
}) => {
  const theme = useTheme();
  const { user }: { user: any } = useAuth();
  const [uploadFiles, setUploadFiles] = React.useState<boolean>(false);
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useCustomSnackbar();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openPdfViewer, setOpenPdfViewer] = React.useState(false);
  const [openMeeting, setOpenMeeting] = React.useState(false);

  const onUploadComplete = () => {
    queryClient.invalidateQueries("get-all-classs");
  };

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
  const handleViewAttachment = () => setOpenPdfViewer(true);
  const handleOpenUploadFiles = () => setUploadFiles(true);
  const handleCloseUploadFiles = () => setUploadFiles(false);
  const handleRemoveAttachment = () => {
    removeAttachementMutation({ classId: classId, fileKey: attachments! });
  };

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

  const handleJoinMeeting = () => {
    registrationMutation({
      meetingId: meetingId!,
      apiKey: process.env.NEXT_PUBLIC_ZOOM_KEY as string,
      email: "validmail@gmail.com" as string,
      name: user?.user.name as string,
    });
  };

  return (
    <>
      {openMeeting && (
        <MeetingComponent
          signature={meetingData?.signature}
          meetingNumber={meetingId!}
          password={password!}
        />
      )}
      {openPdfViewer && (
        <PdfViewer
          open={openPdfViewer}
          onClose={() => setOpenPdfViewer(false)}
          key={attachments!}
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
      <Card
        raised
        {...(index === selectedIndex
          ? { style: { backgroundColor: "#F0F0F0" } }
          : {})}
      >
        <CardActionArea
          onClick={() =>
            onCardClick(index === selectedIndex ? (undefined as any) : index)
          }
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {topic[0]}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <ArrowForwardIosIcon />
              </IconButton>
            }
            title={topic}
            // subheader="Lecture 1"
            titleTypographyProps={{
              color: theme.palette.text.primary,
              fontWeight: "bold",
            }}
            subheaderTypographyProps={{
              color: theme.palette.text.secondary,
            }}
          />
          <CardContent>
            <Box pb={2}>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Box display="flex">
                <Box display="flex">
                  <AccessTimeIcon />
                  {/* 14th Feb 2022, 9:00 p.m - 10:00 p.m */}
                  <H5 pl={1}>
                    {moment(startTime).format("MMMM Do YYYY, h:mm a")}
                  </H5>
                </Box>
                <Box pl={2} display="flex">
                  <AttractionsOutlinedIcon />
                  <H5 pl={1}>{batchName}</H5>
                </Box>
              </Box>
              {matches && (
                <Box>
                  <ClassDetailOptions
                    handleJoinClass={handleJoinMeeting}
                    handleRemoveAttachemnt={handleRemoveAttachment}
                    handleUploadAttachment={handleOpenUploadFiles}
                    handleViewAttachment={handleViewAttachment}
                    attachments={attachments}
                  />
                </Box>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ClassesCard;
