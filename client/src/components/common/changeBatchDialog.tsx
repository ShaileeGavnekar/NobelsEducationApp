import * as React from "react";

import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import SchoolIcon from "@mui/icons-material/School";
import { blue } from "@mui/material/colors";
import useGetAllBatches from "../../lib/useGetAllBatches";
import {
  Box,
  Button,
  DialogActions,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { ChangeBatchMutation } from "../../lib/mutations/adminMutations/ChangeBatchMutation";
import useCustomSnackbar from "../../hooks/useSnackbar";
import { useAuth } from "../../contexts/AuthContext";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  courseName: string;
  oldBatchId: string;
  studentId: string;
}

const ChangeBatchDialog: React.FC<SimpleDialogProps> = ({
  open,
  onClose,
  courseId,
  courseName,
  oldBatchId,
  studentId,
}) => {
  const { data, isLoading } = useGetAllBatches();
  const [selectedBatch, setSelectedBatch] = React.useState(oldBatchId);
  const { showError, showSuccess } = useCustomSnackbar();
  const { user, userInfo } = useAuth();
  const queryClient = useQueryClient();
  const [menuItems, setMenuItems] = React.useState<
    {
      id: string;
      batchName: string;
    }[]
  >([]);
  React.useEffect(() => {
    if (data?.length! > 0) {
      const mItems = data
        ?.filter((d) => d.courseId === courseId)
        ?.map((d) => {
          return { id: d._id, batchName: d.name };
        });
      setMenuItems(mItems!);
    }
  }, [data]);

  const { mutate, isLoading: batchLoading } = useMutation(ChangeBatchMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(`class-details-${studentId}`).then(() => {
        showSuccess("Batch was successfully updated");
        onClose();
      });
    },
    onError: (e) => {
      showError("Something went wrong");
    },
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={"md"}>
      <DialogTitle>Select the batch</DialogTitle>

      <Box width={"50%"} pl={4}>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={5}>
            <Typography variant="body2">
              <b>Course </b>
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="body2">
              <b> :</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {courseName}
          </Grid>
          <Grid item xs={5}>
            <div style={{ marginTop: "8px" }}>
              <Typography variant="body2">
                <b>Batch</b>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={1}>
            <div style={{ marginTop: "8px" }}>
              <Typography variant="body2">
                <b> :</b>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              {" "}
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Batch</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={selectedBatch}
                  label="Batch"
                  onChange={(i) => {
                    setSelectedBatch(i.target.value);
                  }}
                >
                  {menuItems.map((mItem) => {
                    return (
                      <MenuItem value={mItem.id}>{mItem.batchName}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </Box>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            mutate({
              oldBatchId: oldBatchId,
              newBatchId: selectedBatch,
              userId: studentId,
            });
          }}
          variant={"contained"}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeBatchDialog;
