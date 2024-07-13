import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DeleteDialogWrapper {
  confirmLabel: string;
  header: string;
  subheader: string;
  handleSubmit: () => void;
  open: boolean;
  onClose: () => void;
}
const DeleteDialogWrapper: React.FC<DeleteDialogWrapper> = ({
  confirmLabel,
  header,
  subheader,
  handleSubmit,
  open,
  onClose,
}) => {
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
        onClose={onClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">{header}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {subheader}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{confirmLabel}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialogWrapper;
