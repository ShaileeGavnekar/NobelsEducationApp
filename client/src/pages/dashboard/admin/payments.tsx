import {
  Avatar,
  Box,
  Button,
  Checkbox,
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(2),
    },
    box: {
      margin: theme.spacing(4),
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
    id: "calories",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Date of Birth",
  },
  {
    id: "fat",
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
}> = ({ initialized, name, email }) => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <>
      <Box>
        <ListItem>
          <ListItemAvatar>
            <Avatar>N</Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={email} />
        </ListItem>
      </Box>
      <Divider />
      {initialized ? (
        <Box ml={4} mt={4}>
          <Paper>
            <Box p={2}>
              <H4>ASSIGNED COURSES</H4>
              <Box>
                <List
                  sx={{
                    width: "100%",
                    // maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                      <ListItem key={value} disablePadding>
                        <ListItemButton
                          role={undefined}
                          onClick={handleToggle(value)}
                          dense
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={`Line item ${value + 1}`}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
            {/* Table */}
            <Box
              p={2}
              style={{
                marginLeft: "auto",
                // marginRight: "auto",
                width: "fit-content",
              }}
            >
              <Button variant="contained">SAVE</Button>
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

const Payments: React.FC = () => {
  const classes = useStyles();

  // /admin/getAllTeachers
  const { data, error, isLoading } = useGetAllTeachers();

  const [filter, setFilter] = React.useState<FilterItemValue>();
  const [openAdd, setOpenAdd] = React.useState(false);

  if (isLoading) {
    return <>Loading...</>;
  }
  const rows: Teacher[] = data ?? [];
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
        <Box>{filters}</Box>
        <Box m={1}>
          {Boolean(data?.length) ? (
            <EnhancedTable<Teacher>
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

export default Payments;
