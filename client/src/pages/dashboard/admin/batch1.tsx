import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { H1, H4 } from "../../../components/common/typography";
import { makeStyles, createStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import { Theme } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import EnhancedTable, { HeadCell } from "../../../components/admin/table";
import { FilterItemValue } from "../../../components/common/Filters";
import { isEqual, isUndefined, orderBy } from "lodash";
import AddIcon from "@mui/icons-material/Add";
import { Course } from "../../../lib/useGetAllCourses";
import useGetAllTeachers, { Teacher } from "../../../lib/useGetAllTeachers";
import CourseProgressCard from "../../../components/students/dashboard/Timeline";
import DeleteDialogWrapper from "../../../components/admin/DeleteWrapper";
import UpdateCourseForm from "../../../components/admin/UpdateCourseForm";
import { useMutation, useQueryClient } from "react-query";
import { DeleteCourseMutation } from "../../../lib/mutations/adminMutations/DeleteCourseMutation";
import useCustomSnackbar from "../../../hooks/useSnackbar";
import Uploader from "../../../components/common/Uploader";
import { Collapse } from "@mui/material";
import { UpdateCourseMutation } from "../../../lib/mutations/adminMutations/UpdateCourseMutation";
import useGetAllBatches, { Batch } from "../../../lib/useGetAllBatches";
import CreateBatchForm from "../../../components/admin/CreateBatchForm";
import UpdateBatchForm from "../../../components/admin/UpdateBatchForm";
import { DeleteBatchMutation } from "../../../lib/mutations/adminMutations/DeleteBatchMutation";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(2),
    },
    box: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      padding: theme.spacing(2),
    },
  })
);

const headCells: HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "courseName",
    numeric: true,
    disablePadding: false,
    label: "Course Name",
  },
  {
    id: "capacity",
    numeric: true,
    disablePadding: false,
    label: "Capacity",
  },
  {
    id: "currentStrength",
    numeric: true,
    disablePadding: false,
    label: "Current Strength",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

type BatchTable = {
  name: string;
  courseName: string;
  _id: string;
  capacity: Number;
  currentStrength: Number;
  actions: React.ReactNode;
};

const BatchManagement: React.FC = () => {
  const classes = useStyles();
  const { data, error, isLoading } = useGetAllBatches();

  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("");
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const { showError, showSuccess } = useCustomSnackbar();
  const queryClient = useQueryClient();

  const { mutate, isLoading: batchLoading } = useMutation(DeleteBatchMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-batches").then(() => {
        showSuccess("Batch was successfully deleted");
        setOpenDelete(false);
      });
    },
    onError: (e) => {
      showError("Something went wrong");
    },
  });

  if (isLoading) {
    return <>Loading...</>;
  }
  const rows: Batch[] = data ?? [];

  return (
    <>
      {openAdd && (
        <CreateBatchForm
          open={openAdd}
          onClose={() => {
            setOpenAdd(false);
          }}
        />
      )}
      {openDelete && (
        <DeleteDialogWrapper
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          header={"Delete Batch"}
          subheader={
            "Deleting this batch will delete all the classes associated with this Batch.Are you sure , you want to delete the Batch?"
          }
          confirmLabel={"Delete"}
          handleSubmit={() => {
            mutate({ batchId: selectedId! });
          }}
        />
      )}
      {openUpdate && (
        <UpdateBatchForm
          open={openUpdate}
          onClose={() => {
            setOpenUpdate(false);
          }}
          initialValues={data?.find((v) => v._id === selectedId)!}
        />
      )}
      <Box className={classes.box}>
        <div className={classes.heading}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <H1>Batches</H1>
              <H4>Manage all your batches from here</H4>
            </Grid>
            <Grid item>
              <Tooltip title="Create Batch">
                <Box
                  style={{
                    borderStyle: "solid",
                    borderRadius: "50%",
                    borderWidth: "thin",
                  }}
                >
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => setOpenAdd(true)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
        {/* <Box>{filters}</Box> */}
        <Box m={1}>
          {Boolean(data?.length) ? (
            <EnhancedTable<BatchTable>
              headCells={headCells}
              extendedProps={data}
              //@ts-ignore
              rows={rows.map((r: any) => {
                return {
                  name: r.name,
                  courseName: r.course.name,
                  capacity: `₹ ${r.upperLimit}`,
                  currentStrength: `${r.currentStrength} %`,
                  _id: r._id,
                  actions: (
                    <>
                      <Box display={"flex"}>
                        <Box pl={12}>
                          <Tooltip title={"Update"}>
                            <IconButton
                              onClick={() => {
                                setSelectedId(r._id);
                                setOpenUpdate(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Box>
                          <Tooltip title={"Delete"}>
                            <IconButton
                              onClick={() => {
                                setSelectedId(r._id);
                                setOpenDelete(true);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </>
                  ),
                };
              })}
              // SideDrawerComp={SideDrawerComponent}
            />
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
    </>
  );
};

export default BatchManagement;
