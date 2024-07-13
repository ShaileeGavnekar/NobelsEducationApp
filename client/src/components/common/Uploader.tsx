import React from "react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Modal } from "@mui/material";

const entityEndPointRecord: Record<string, string> = {
  CLASS: "classId",
  COURSE: "courseId",
  USER_AVATAR: "_id",
};

const StyledModal = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: theme.palette.background.default,
  boxShadow: "24",
  borderRadius: 4,
  padding: 8,
}));

interface UploaderProps {
  endpoint: string;
  entity: "CLASS" | "COURSE" | "USER_AVATAR";
  allowedExtensions: string[];
  onComplete?: () => void;
  id: string;
  open: boolean;
  onClose: () => void;
  fieldName: string;
}

const Uploader: React.FC<UploaderProps> = ({
  entity,
  endpoint,
  allowedExtensions,
  onComplete,
  id,
  open,
  onClose,
  fieldName,
}) => {
  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 1, allowedFileTypes: allowedExtensions },
    autoProceed: true,
  });

  uppy.use(XHRUpload, {
    endpoint: `${process.env.NEXT_PUBLIC_BACKEND}${endpoint}`,
    fieldName: fieldName,
    formData: true,
    method: "PUT",
    metaFields: ["name", entityEndPointRecord[entity]],
    withCredentials: true,
  });

  uppy.on("file-added", (file) => {
    uppy.setFileMeta(file.id, {
      size: file.size,
      [entityEndPointRecord[entity]]: id,
    });
  });

  uppy.on("complete", () => {
    onComplete?.();
  });
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="files-uploader"
      aria-describedby="files-uploader"
    >
      <StyledModal>
        <Box>
          <Dashboard
            uppy={uppy}
            locale={{
              strings: {
                dropHereOr: "Drop here or %{browse} ",
                browse: "browse",
              },
            }}
          />
        </Box>
      </StyledModal>
    </Modal>
  );
};

export default Uploader;
