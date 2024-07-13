import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface TrialFormWrapper {
  open: boolean;
  setOpenTrial: React.Dispatch<React.SetStateAction<boolean>>;
}
const TrialFormWrapper: React.FC<TrialFormWrapper> = ({
  open,
  setOpenTrial,
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

  const handleClickOpen = () => {
    setOpenTrial(true);
  };

  const handleClose = () => {
    setOpenTrial(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullScreen
        TransitionComponent={Transition}
      >
        {/* <DialogTitle id="scroll-dialog-title">{header}</DialogTitle> */}
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Book a Free Trial
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {/* <iframe
              src=""
              width="640"
              height="840"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
            >
              Loading…
            </iframe> */}
            <iframe
              src="https://docs.google.com/forms/d/1CDzfBlhG1qaA_AJ42rVz9p_o784xOqj3QDBiEoN51E4/edit"
              style={{ width: "100%", height: "100vh", border: "none" }}
            >
              Loading…
            </iframe>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrialFormWrapper;
