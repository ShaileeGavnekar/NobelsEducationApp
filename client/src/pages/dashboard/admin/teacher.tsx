import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { H1, H4 } from "../../../components/common/typography";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import EnhancedTable, { HeadCell } from "../../../components/admin/table";
import Filters, {
  FilterItem,
  FilterItemValue,
} from "../../../components/common/Filters";
import { keys } from "lodash";
import AddIcon from "@mui/icons-material/Add";
import InviteTeacherForm from "../../../components/admin/InviteTeacherForm";
import useGetAllTeachers from "../../../lib/useGetAllTeachers";
import moment from "moment";
import { blue, green, purple, red } from "@mui/material/colors";
import useGetTeacherDetails from "../../../lib/useGetTeacherDetails";

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
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  const colors = [red[500], blue[500], green[500], purple[500]];
  const { data } = useGetTeacherDetails(_id);

  return (
    <>
      <Box>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: colors[getRandomInt(4)] }}>N</Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={email} />
        </ListItem>
      </Box>
      <Divider />
      {initialized ? (
        <Box ml={4} mt={4}>
          <Paper>
            <Box p={2}>
              <Typography>Teachers Info</Typography>
              <Typography color={"textSecondary"}>
                Basic Information about the teacher which he have saved in the
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
              <Typography>Courses Assigned</Typography>
              <Typography color={"textSecondary"}>
                Assigned Courses to the teacher which he/she will be teaching.
              </Typography>
              <Box mt={2} ml={2}>
                <Grid container direction="row" spacing={1}>
                  {data?.coursesEnrolled?.map((d, index) => {
                    return (
                      <>
                        {" "}
                        <Grid item xs={6}>
                          {" "}
                          <Typography variant="body2">
                            {index + 1}. {d.courseName}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          {" "}
                          <Typography variant="body2">₹ {d.price}</Typography>
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
            Teacher is not signed up yet. Please ask him to set his password and
            login to assign courses.
          </Typography>
          <Box mt={2}>
            <Button variant="contained">Resend Set Password Mail</Button>
          </Box>
        </Box>
      )}
    </>
  );
};

type TeacherTable = {
  _id: string;
  name: string;
  dob: string;
  email: string;
  phoneNumber: string;
};
const TeacherManagement: React.FC = () => {
  const classes = useStyles();

  // /admin/getAllTeachers
  const { data, error, isLoading } = useGetAllTeachers();
  const [filter, setFilter] = React.useState<FilterItemValue>();
  const [openAdd, setOpenAdd] = React.useState(false);

  if (isLoading) {
    return <>Loading...</>;
  }
  const rows =
    data?.map((d) => {
      return {
        name: d.name,
        email: d.email,
        _id: d._id,
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
              <H1>Teachers</H1>
              <H4>Manage all your teachers from here</H4>
            </Grid>
            <Grid item>
              <Tooltip title="Invite Teacher">
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
            <EnhancedTable<TeacherTable>
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

export default TeacherManagement;
