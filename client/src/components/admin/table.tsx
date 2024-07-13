import * as React from "react";
import { alpha, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import SideDrawer from "./sideDrawer";
import { makeStyles, createStyles } from "@mui/styles";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useTheme } from "@emotion/react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(2),
    },
    box: {
      padding: 0,
      marginLeft: theme.spacing(12),
      "&. MuiCardHeader-content": {
        width: "100px",
        "&. MuiTypography-root": { width: "fit-content" },
      },
    },
    text: { width: "fit-content" },
  })
);

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  headCells: HeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell) => (
          <TableCell key={headCell.id} align={"center"} padding={"normal"}>
            <b>{headCell.label}</b>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      (
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Nutrition
      </Typography>
      )
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
interface TableProps<T> {
  headCells: HeadCell[];
  SideDrawerComp: any;
  rows: Array<T & { _id: string }>;
  extendedProps?: any;
}

function EnhancedTable<T>(props: TableProps<T>) {
  const { headCells, SideDrawerComp, rows } = props;
  const theme = useTheme();
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [drawerRow, setDrawerRow] = React.useState<T>();
  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleClick = (
    event: React.MouseEvent<unknown>,
    name: string,
    row: T,
    index: number
  ) => {
    console.log(index);
    setSelectedIndex(index as any);
    setOpenDrawer(true);
    setDrawerRow(row);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {Boolean(SideDrawerComp) && (
        <SideDrawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <SideDrawerComp
            {...drawerRow}
            initialized={true}
            extendedProps={props.extendedProps}
            index={selectedIndex}
          />
        </SideDrawer>
      )}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table stickyHeader aria-labelledby="tableTitle" size={"medium"}>
            <EnhancedTableHead headCells={headCells} />
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id, row, index)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                    selected={selectedIndex === index}
                  >
                    {Object.keys(rows[0]).map((k) => {
                      if (k === "_id" || k === "description") {
                        return <></>;
                      } else if (k === "avatar") {
                        return (
                          <>
                            <TableCell align="center" size="small">
                              <ListItem className={classes.box}>
                                <ListItemAvatar>
                                  <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: "#5148A6" }}>
                                      {/* @ts-ignore */}
                                      {row["name"][0]}
                                    </Avatar>
                                  </ListItemAvatar>
                                </ListItemAvatar>
                              </ListItem>
                            </TableCell>
                          </>
                        );
                      } else {
                        return (
                          //@ts-ignore
                          <TableCell align="center">{row[k]}</TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default EnhancedTable;
