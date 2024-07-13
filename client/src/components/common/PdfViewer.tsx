import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import { Document, Page } from "react-pdf";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import { H1 } from "./typography";

export interface IPdfViewerProps {
  open: boolean;
  onClose: () => void;
  key: string;
}

const Loader = () => {
  return (
    <>
      <Box width="600px" height={"800px"}>
        <Box sx={{ marginX: "auto", width: "fit-content", marginTop: "160px" }}>
          <CircularProgress size={60} />
        </Box>
        <Box sx={{ marginX: "auto", width: "fit-content", marginTop: "24px" }}>
          <H1>Loading .....</H1>
        </Box>
      </Box>
    </>
  );
};

const PdfViewer: React.FC<IPdfViewerProps> = ({ open, onClose, key }) => {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  const handleClose = () => {
    onClose();
  };
  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
  }

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        style={{ width: "fit-content", margin: "auto" }}
        maxWidth={"lg"}
      >
        <DialogTitle id="scroll-dialog-title">
          <>Attachments</>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {Boolean(key) ? (
              <Box>
                <Document
                  file={{
                    url: `${process.env.NEXT_PUBLIC_BACKEND}/teacher/attachment?key=${key}`,
                    withCredentials: true,
                  }}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<Loader />}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
              </Box>
            ) : (
              "Invalid attachment! Contact admin"
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box display={"flex"} sx={{ margin: "auto" }}>
            <Tooltip title={"Previous"}>
              <IconButton
                disabled={numPages === 1}
                onClick={() => {
                  setPageNumber(pageNumber - 1);
                }}
              >
                <ArrowLeftIcon />
              </IconButton>
            </Tooltip>
            <Box mt={0.8}>
              {pageNumber}/{numPages} Pages
            </Box>
            <Tooltip title={"Next"}>
              <IconButton
                disabled={numPages === pageNumber}
                onClick={() => {
                  setPageNumber(pageNumber + 1);
                }}
              >
                <ArrowRightIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PdfViewer;
