import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { H1, H4, H5, H6, Small } from "../../../components/common/typography";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme, useTheme } from "@mui/material/styles";
import EnhancedTable, { HeadCell } from "../../../components/admin/table";
import Filters, {
  FilterItem,
  FilterItemValue,
} from "../../../components/common/Filters";
import { initial, keys } from "lodash";
import AddIcon from "@mui/icons-material/Add";
import InviteTeacherForm from "../../../components/admin/InviteTeacherForm";
import useGetAllTeachers, { Teacher } from "../../../lib/useGetAllTeachers";
import { useAxios } from "../../../utils/Common";
import { useQuery } from "react-query";
import { TeacherUser } from "../../../types/User";
import useGetAllStudents from "../../../lib/useGetAllStudents";
import moment from "moment";
import { blue, green, purple, red } from "@mui/material/colors";
import useGetStudentDetails from "../../../lib/useGetStudentDetails";
import ChangeBatchDialog from "../../../components/common/changeBatchDialog";

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
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "dob",
    numeric: true,
    disablePadding: false,
    label: "Date of Birth",
  },
  {
    id: "contactNo",
    numeric: true,
    disablePadding: false,
    label: "Contact Number",
  },
];

const defaultOptions: FilterItem[] = [
  {
    key: "name",
    label: <> Name</>,
    type: "input",
  },
  {
    key: "dob",
    label: <>Birth Date</>,
    type: "input",
  },
  {
    key: "contactNumber",
    label: <>Contact Number</>,
    type: "input",
  },
  {
    key: "email",
    label: <>Email</>,
    type: "input",
  },
];

type StudentTable = {
  _id: string;
  name: string;
  dob: string;
  email: string;
  phoneNumber: string;
};

const sortLabelMap: Record<string, React.ReactNode> = {
  ascName: <div>Ascending by Name</div>,
  descName: <div>Descending by Name</div>,
  ascEmail: <div>Ascending by Email</div>,
  descEmail: <div>Descending by Email</div>,
  ascCreatedOn: <div>Ascending by Created on</div>,
  descCreatedOn: <div>Descending by Created on</div>,
};

const SideDrawerComponent: React.FC<{
  initialized: boolean;
  name: string;
  email: string;
  _id: string;
}> = ({ initialized, name, email, _id }) => {
  const colors = [red[500], blue[500], green[500], purple[500]];
  const [openBatchChange, setOpenBatchChange] = React.useState(false);
  const [courseData, setCourseData] = React.useState<{
    name: string;
    id: string;
    oldBatchId: string;
    studentId: string;
  }>();
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const { data } = useGetStudentDetails(_id);
  return (
    <>
      {openBatchChange && (
        <ChangeBatchDialog
          open={openBatchChange}
          onClose={() => setOpenBatchChange(false)}
          courseId={courseData?.id!}
          courseName={courseData?.name!}
          oldBatchId={courseData?.oldBatchId!}
          studentId={courseData?.studentId!}
        />
      )}
      <Box>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: colors[getRandomInt(4)] }}>N</Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={email} />
        </ListItem>
      </Box>
      <Divider />
      <Box ml={4} mt={4}>
        <Paper>
          <Box p={2}>
            <Grid container>
              <Grid item xs={10.75}>
                <Typography>Current Status of student</Typography>
                <Typography color={"textSecondary"}>
                  If status of student is Blocked, then he/she will not be able
                  to join classes of courses he have enrolled and not be able to
                  purchase new courses
                </Typography>
              </Grid>
              <Grid item xs={1.25}>
                <Chip
                  label={Boolean(data?.initialized) ? "Blocked" : "Active"}
                  color={Boolean(data?.initialized) ? "error" : "success"}
                  size="medium"
                />
              </Grid>
            </Grid>
            <div
              style={{
                marginLeft: "auto",
                width: "fit-content",
                marginTop: "32px",
              }}
            >
              <Button variant="text" size="small">
                {!Boolean(data?.initialized) ? "Block" : "Activate"}
              </Button>
            </div>
          </Box>
        </Paper>
      </Box>
      {initialized ? (
        <Box ml={4} mt={4}>
          <Paper>
            <Box p={2}>
              <Typography>Student Info</Typography>
              <Typography color={"textSecondary"}>
                Basic Information about the students which he have saved in the
                application.
              </Typography>
              <Box mt={2} ml={2}>
                <Grid container direction="row" spacing={1}>
                  <Grid item xs={5}>
                    {" "}
                    <Typography variant="body2">
                      <b>Name </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="body2">
                      <b> :</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {" "}
                    <Typography variant="body2">{data?.name}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="body2">
                      <b>Email </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="body2">
                      <b> :</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {data?.email}
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="body2">
                      <b>Date of Birth </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="body2">
                      <b> :</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {data?.dob}
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="body2">
                      <b>Contact Number </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="body2">
                      <b> :</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {data?.contactNumber}
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="body2">
                      <b>Address </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="body2">
                      <b> :</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {data?.address}
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="body2">
                      <b>Joined on </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="body2">
                      <b> :</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {data?.joinedOn}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
          <Paper style={{ marginTop: "32px" }}>
            <Box p={2}>
              <Typography>Courses Puchased</Typography>
              <Typography color={"textSecondary"}>
                Courses which are purchased by this student are listed here
              </Typography>
              <Box mt={2} ml={2}>
                <Grid container direction="row" spacing={1}>
                  {data?.coursesPurchased.map((cp, index) => {
                    return (
                      <>
                        <Grid item xs={5}>
                          {" "}
                          <Typography variant="body2">
                            {index + 1}. {cp.courseName} ({cp.batchName})
                          </Typography>
                        </Grid>

                        <Grid item xs={5}>
                          {" "}
                          <Typography variant="body2">₹ {cp.price}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Tooltip title={"Change Batch"}>
                            <IconButton
                              onClick={() => {
                                setCourseData({
                                  name: cp.courseName,
                                  id: cp.courseId,
                                  oldBatchId: cp.batchId,
                                  studentId: _id,
                                });
                                setOpenBatchChange(true);
                              }}
                            >
                              <EditOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box ml={9} mt={4}>
          <Typography>
            Student is blocked. Click on below button to unblock the student.
          </Typography>
          <Box mt={2}>
            <Button variant="contained">UNBLOCK</Button>
          </Box>
        </Box>
      )}
    </>
  );
};

const StudentManagement: React.FC = () => {
  const classes = useStyles();

  // /admin/getAllTeachers
  const { data, error, isLoading } = useGetAllStudents();

  const [filter, setFilter] = React.useState<FilterItemValue>();
  const [openAdd, setOpenAdd] = React.useState(false);

  if (isLoading) {
    return <>Loading...</>;
  }
  const rows: StudentTable[] =
    data?.map((d) => {
      return {
        _id: d._id,
        name: d.name,
        email: d.email,
        dob: Boolean(d.dob) ? moment(d.dob).format("DD/MM/YYYY") : "",
        phoneNumber: d.phoneNumber,
      };
    }) ?? [];
  const filters = (
    <Grid container alignItems={"center"}>
      <Grid item xs={12} sm={6} md={8} lg={10} xl={11}>
        <Filters
          value={filter!}
          onChange={setFilter}
          options={defaultOptions}
          label={
            keys(filter).length ? (
              <>Showing teachers filter by</>
            ) : (
              <>Showing all teacher</>
            )
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2} xl={1}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Sort By"
            >
              {Object.keys(sortLabelMap).map((key) => {
                return (
                  <>
                    <MenuItem value={key} key={key}>
                      {sortLabelMap[key]}
                    </MenuItem>
                  </>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        {/* <BasicSelect /> */}
      </Grid>
    </Grid>
  );
  return (
    <>
      {openAdd && (
        <InviteTeacherForm
          open={openAdd}
          onClose={() => {
            setOpenAdd(false);
          }}
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
              <H1>Students</H1>
              <H4>Manage all your students from here</H4>
            </Grid>
          </Grid>
        </div>
        {/* <Box>{filters}</Box> */}
        <Box m={1}>
          {Boolean(data?.length) ? (
            <EnhancedTable<StudentTable>
              headCells={headCells}
              rows={rows}
              SideDrawerComp={SideDrawerComponent}
            />
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
    </>
  );
};

export default StudentManagement;
