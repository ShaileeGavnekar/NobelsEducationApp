import { Box, CircularProgress, Grid } from "@mui/material";
import React from "react";
import { H1, H4 } from "../../../components/common/typography";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import EnhancedTable, { HeadCell } from "../../../components/admin/table";
import Filters, {
  FilterItem,
  FilterItemValue,
} from "../../../components/common/Filters";
import moment from "moment";

import useGetAllLeads, { Lead } from "../../../lib/useGetAllLeads";

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
    label: "Lead Name",
  },
  {
    id: "phone-Number",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created At",
  },
];

type CourseTable = {
  courseName: string;
  discount: Number;
  _id: string;
  courseLevel: string;
  noOfClasses: string;
  price: Number;
};

const defaultOptions: FilterItem[] = [
  {
    key: "courseName",
    label: <> Course Name</>,
    type: "input",
  },
  {
    key: "startDate",
    label: <>Start Date</>,
    type: "input",
  },
  {
    key: "noOfClasses",
    label: <>No. of Classes</>,
    type: "input",
  },
  {
    key: "price",
    label: <>Price</>,
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

const Leads: React.FC = () => {
  const classes = useStyles();
  const { data, error, isLoading } = useGetAllLeads();

  if (isLoading) {
    return <>Loading...</>;
  }
  const rows: Lead[] = data ?? [];

  return (
    <>
      <Box className={classes.box}>
        <div className={classes.heading}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <H1>Quick Leads</H1>
              <H4>Manage all your quick leads from here</H4>
            </Grid>
          </Grid>
        </div>
        {/* <Box>{filters}</Box> */}
        <Box m={1}>
          {Boolean(data?.length) ? (
            <EnhancedTable<CourseTable>
              headCells={headCells}
              extendedProps={data}
              //@ts-ignore
              rows={rows.map((r) => {
                return {
                  name: r.name,
                  phoneNumber: r.phoneNumber,
                  //@ts-ignore
                  createdAt: moment(r.createdAt).format(
                    "MMMM Do YYYY, h:mm:ss"
                  ),
                  _id: r._id,
                };
              })}
              // SideDrawerComp={<></>}
            />
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Leads;
