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

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  handleSelect: (id: string) => void;
}

const BatchSelectionDialog: React.FC<SimpleDialogProps> = ({
  open,
  onClose,
  handleSelect,
}) => {
  const { data } = useGetAllBatches();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={"md"}>
      <DialogTitle>Select the batch</DialogTitle>
      <List sx={{ pt: 0 }}>
        {data?.map((batch) => (
          <ListItem
            button
            onClick={() => handleSelect(batch._id)}
            key={batch._id}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <SchoolIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={batch.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default BatchSelectionDialog;
