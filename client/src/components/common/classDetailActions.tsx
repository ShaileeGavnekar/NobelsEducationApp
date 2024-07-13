import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAuth } from "../../contexts/AuthContext";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

interface IClassDetailOptionsProps {
  handleJoinClass: () => void;
  handleUploadAttachment: () => void;
  handleRemoveAttachemnt: () => void;
  handleViewAttachment: () => void;
  attachments?: string;
}

const ClassDetailOptions: React.FC<IClassDetailOptionsProps> = ({
  handleJoinClass,
  handleUploadAttachment,
  handleRemoveAttachemnt,
  handleViewAttachment,
  attachments,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user } = useAuth();
  const showUploadOrRemoveAttachment =
    user?.user.role === "ADMIN" || user?.user.role === "TEACHER";
  console.log("here", attachments);
  const showViewAttachment = Boolean(attachments);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {showUploadOrRemoveAttachment || showViewAttachment ? (
        <>
          {" "}
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Options
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleJoinClass} disableRipple>
              <EditIcon />
              Join Class
            </MenuItem>
            {showUploadOrRemoveAttachment && (
              <MenuItem
                onClick={
                  Boolean(attachments)
                    ? handleRemoveAttachemnt
                    : handleUploadAttachment
                }
                disableRipple
              >
                <FileCopyIcon />
                {Boolean(attachments)
                  ? "Remove Attachment"
                  : "Upload Attachment"}
              </MenuItem>
            )}
            {showViewAttachment && (
              <MenuItem onClick={handleViewAttachment} disableRipple>
                <ArchiveIcon />
                View Attachment
              </MenuItem>
            )}
          </StyledMenu>
        </>
      ) : (
        <>
          <Button variant={"contained"} onClick={handleJoinClass}>
            Join Class
          </Button>
        </>
      )}
    </div>
  );
};

export default ClassDetailOptions;
