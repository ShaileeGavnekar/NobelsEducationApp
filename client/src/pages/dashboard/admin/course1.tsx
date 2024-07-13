import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { H1, H4 } from "../../../components/common/typography";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import EnhancedTable, { HeadCell } from "../../../components/admin/table";
import Filters, {
  FilterItem,
  FilterItemValue,
} from "../../../components/common/Filters";
import { isEqual, isUndefined, keys, orderBy } from "lodash";
import AddIcon from "@mui/icons-material/Add";
import CreateCourseForm from "../../../components/admin/CreateCourseForm";
import useGetAllCourses, { Course } from "../../../lib/useGetAllCourses";
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
    id: "cname",
    numeric: false,
    disablePadding: true,
    label: "Course Name",
  },
  {
    id: "noOfClasses",
    numeric: true,
    disablePadding: false,
    label: "No. Of Classes",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price (in INR)",
  },
  {
    id: "discount",
    numeric: true,
    disablePadding: false,
    label: "Discount",
  },
  {
    id: "courseLevel",
    numeric: true,
    disablePadding: false,
    label: "Course Level",
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

const SideDrawerComponent: React.FC<{
  desription: string;
  name: string;
  extendedProps: Course[];
  index: number;
}> = ({ extendedProps, index }) => {
  const currentCourse = extendedProps[index];
  const { data, error, isLoading: queryLoading } = useGetAllTeachers();
  const { showError, showSuccess } = useCustomSnackbar();
  const queryClient = useQueryClient();
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openUploader, setOpenUploader] = React.useState(false);
  const [textFieldValue, setTextFieldValue] = React.useState("");
  const [textFieldValue2, setTextFieldValue2] = React.useState("");
  const [timelineField, setTimelineField] = React.useState<any>();
  const [tags, setTags] = React.useState(orderBy(currentCourse.tags));
  const [curriculum, setCurriculum] = React.useState(
    orderBy(currentCourse.curriculum)
  );
  let parsedTimeline;
  try {
    parsedTimeline = JSON.parse(currentCourse.courseTimeline);
  } catch (e) {
    parsedTimeline = [];
  }
  const [timeline, setTimeline] = React.useState(parsedTimeline);
  const [teacher, setTeacher] = React.useState<Teacher | null>();
  React.useEffect(() => {
    if (Boolean(data)) {
      const t = data?.find((m) => m._id === extendedProps[index].teacherIds[0]);
      setTeacher(t);
    }
  }, [data]);
  const { mutate, isLoading } = useMutation(DeleteCourseMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-courses").then(() => {
        showSuccess("Course was successfully deleted");
        setOpenDelete(false);
      });
    },
    onError: (e) => {
      showError("Something went wrong");
    },
  });
  const { mutate: updateMutation, isLoading: updateLoading } = useMutation(
    UpdateCourseMutation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("get-all-courses").then(() => {
          showSuccess("Tags were saved successfully ");
        });
      },
      onError: (e) => {
        showError("Something went wrong");
      },
    }
  );

  const handleDelete = () => {
    mutate(currentCourse._id);
  };

  return (
    <>
      {openUploader && (
        <>
          <Uploader
            entity="COURSE"
            endpoint="/admin/addCourseAvatar"
            allowedExtensions={["image/*", ".jpg", ".jpeg", ".png", ".gif"]}
            onComplete={async () => {
              await queryClient.invalidateQueries("get-all-courses");
              setOpenUploader(false);
            }}
            open={openUploader}
            onClose={() => setOpenUploader(false)}
            id={currentCourse._id}
            fieldName={"avatar"}
          />
        </>
      )}
      {openDelete && (
        <DeleteDialogWrapper
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          header={"Delete Course"}
          subheader={
            "Deleting this course will delete all the classes associated with this course.Are you sure , you want to delete the course?"
          }
          confirmLabel={"Delete"}
          handleSubmit={handleDelete}
        />
      )}
      {openUpdate && (
        <UpdateCourseForm
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          initialValues={{ ...currentCourse } as any}
        />
      )}
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={10}>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "#5148A6",
                    borderRadius: "10%",
                  }}
                  variant="square"
                  src={
                    currentCourse?.avatar
                      ? `${process.env.NEXT_PUBLIC_BACKEND}/student/getCourseAvatar?key=${currentCourse.avatar}`
                      : "https://houseofsoftskills.com/assets/img/speaking.jpg"
                  }
                >
                  {currentCourse.name[0]}
                </Avatar>
                {/* <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND}/student/getCourseAvatar?key=${currentCourse.avatar}`}
                ></img> */}
              </ListItemAvatar>
              <ListItemText
                primary={currentCourse.name}
                secondary={
                  <>
                    {currentCourse.description}
                    <Box>
                      <Link
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setOpenUploader(true);
                        }}
                      >
                        Edit Image
                      </Link>
                    </Box>
                  </>
                }
              />
            </ListItem>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Update Course">
              <IconButton onClick={() => setOpenUpdate(true)}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Course">
              <IconButton onClick={() => setOpenDelete(true)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box m={4}>
        <Typography variant="body2" color={"textSecondary"}>
          Basic Info
        </Typography>
        <Paper elevation={1} style={{ padding: "16px", marginTop: "8px" }}>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={5}>
              {" "}
              <Typography variant="body2">
                <b>Course Prince (in INR) </b>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">
                <b> :</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Typography variant="body2">{currentCourse.price}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2">
                <b>Number of Classes </b>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">
                <b> :</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {currentCourse.numberOfClasses}
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2">
                <b>Age Group </b>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">
                <b> :</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {currentCourse.ageGroup}
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2">
                <b>Profiency </b>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">
                <b> :</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {currentCourse.courseLevel}
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2">
                <b>Discount % </b>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">
                <b> :</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {currentCourse.discount}
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2">
                <b>Teacher </b>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">
                <b> :</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {queryLoading ? (
                <Skeleton />
              ) : (
                `${teacher?.name} (${teacher?.email})`
              )}
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body2">
                <b>Batches</b>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="body2">
                <b> :</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {currentCourse.batches.length > 0 ? (
                <>{currentCourse.batches.map((b) => b.name).toString()}</>
              ) : (
                "No batches are there for this course"
              )}
            </Grid>
          </Grid>
        </Paper>
        <Box mt={4}>
          <Typography variant="body2" color={"textSecondary"}>
            Tags
          </Typography>
          <Paper elevation={1} style={{ padding: "16px", marginTop: "8px" }}>
            <Box display="flex">
              {isUndefined(tags) || tags?.length === 0
                ? "No tags added for this course, Please add the tags"
                : tags.map((tag, index) => {
                    return (
                      <>
                        <Chip
                          label={tag}
                          deleteIcon={<DeleteIcon />}
                          onDelete={() => {
                            let tagCopy = [...tags];
                            tagCopy.splice(index, 1);
                            setTags(tagCopy);
                          }}
                          variant="outlined"
                          sx={{ mx: "8px" }}
                        />
                      </>
                    );
                  })}
            </Box>
            <Box mt={2}>
              <TextField
                size="small"
                placeholder="Add Tags"
                helperText={"Press enter after typing the tag to add it"}
                value={textFieldValue}
                onChange={(e) => {
                  setTextFieldValue(e.target.value);
                }}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter" && Boolean(textFieldValue)) {
                    ev.preventDefault();
                    setTags([...tags, textFieldValue]);
                    setTextFieldValue("");
                  }
                }}
              />
            </Box>
            <Collapse in={!isEqual(tags, currentCourse.tags)}>
              <Box my={1}>
                <Divider />
                <Box mt={1}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      updateMutation({ ...currentCourse, tags: tags });
                    }}
                  >
                    SAVE
                  </Button>
                </Box>
              </Box>
            </Collapse>
          </Paper>
        </Box>
        <Box mt={4}>
          <Typography variant="body2" color={"textSecondary"}>
            Curriculum
          </Typography>
          <Paper elevation={1} style={{ padding: "16px", marginTop: "8px" }}>
            <Box display="flex">
              {isUndefined(curriculum) || curriculum?.length === 0 ? (
                "No  curriculam for this course, Please add it to display on main page."
              ) : (
                <>
                  <List dense>
                    {curriculum.map((cur, index) => {
                      return (
                        <>
                          <ListItem
                            sx={{ width: "100%" }}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                  let cirCopy = [...curriculum];
                                  cirCopy.splice(index, 1);
                                  setCurriculum(cirCopy);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemIcon>
                              <span
                                style={{
                                  height: "8px",
                                  width: "8px",
                                  backgroundColor: "#757575",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                }}
                              ></span>
                            </ListItemIcon>
                            <ListItemText primary={cur} />
                          </ListItem>
                        </>
                      );
                    })}
                  </List>
                </>
              )}
            </Box>
            <Box mt={2}>
              <TextField
                size="small"
                placeholder="Add Curriculam Points"
                helperText={"Press enter after typing the point to add it"}
                value={textFieldValue2}
                onChange={(e) => {
                  setTextFieldValue2(e.target.value);
                }}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter" && Boolean(textFieldValue2)) {
                    ev.preventDefault();
                    setCurriculum([...curriculum, textFieldValue2]);
                    setTextFieldValue2("");
                  }
                }}
              />
            </Box>
            <Collapse in={!isEqual(curriculum, currentCourse.curriculum)}>
              <Box my={1}>
                <Divider />
                <Box mt={1}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      updateMutation({
                        ...currentCourse,
                        curriculum: curriculum,
                      });
                    }}
                  >
                    SAVE
                  </Button>
                </Box>
              </Box>
            </Collapse>
          </Paper>
        </Box>
        <Box mt={4}>
          <Typography variant="body2" color={"textSecondary"}>
            Course Timeline
          </Typography>
          <Paper elevation={1} style={{ padding: "16px", marginTop: "8px" }}>
            <Box display="flex">
              {isUndefined(curriculum) || curriculum?.length === 0 ? (
                "No  timeline for this course, Please add it to display on main page."
              ) : (
                <>
                  <List dense>
                    {timeline.map((cur: any, index: number) => {
                      return (
                        <>
                          <ListItem
                            sx={{ width: "100%" }}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                  let timelineCopy = [...timeline];
                                  timelineCopy.splice(index, 1);
                                  setTimeline(timelineCopy);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemIcon>
                              <span
                                style={{
                                  height: "8px",
                                  width: "8px",
                                  backgroundColor: "#757575",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                }}
                              ></span>
                            </ListItemIcon>
                            <Grid container spacing={2}>
                              <Grid item xs={2}>
                                {" "}
                                <ListItemText primary={cur.sno} />
                              </Grid>
                              <Grid item xs={5}>
                                <ListItemText primary={cur.header} />
                              </Grid>
                              <Grid item xs={5}>
                                <ListItemText primary={cur.subheader} />
                              </Grid>
                            </Grid>
                          </ListItem>
                        </>
                      );
                    })}
                  </List>
                </>
              )}
            </Box>
            <Box mt={2}>
              <Grid container spacing={4}>
                <Grid item xs={2}>
                  <TextField
                    size="small"
                    placeholder="Serial No."
                    style={{ width: "100%" }}
                    // helperText={"Press enter after typing the point to add it"}
                    value={timelineField?.sno}
                    onChange={(e) => {
                      let timelineFieldCopy = {
                        ...timelineField,
                        sno: e.target.value,
                      };
                      setTimelineField(timelineFieldCopy);
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    placeholder="Header"
                    style={{ width: "100%" }}
                    value={timelineField?.header}
                    onChange={(e) => {
                      let timelineFieldCopy = {
                        ...timelineField,
                        header: e.target.value,
                      };
                      setTimelineField(timelineFieldCopy);
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    placeholder="Subheader"
                    style={{ width: "100%" }}
                    value={timelineField?.subheader}
                    onChange={(e) => {
                      let timelineFieldCopy = {
                        ...timelineField,
                        subheader: e.target.value,
                      };
                      setTimelineField(timelineFieldCopy);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      let timelineCopy = [...timeline];
                      timelineCopy.push(timelineField);
                      setTimeline(timelineCopy);
                      setTimelineField({ sno: "", header: "", subheader: "" });
                    }}
                  >
                    ADD
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Collapse in={!isEqual(timeline, currentCourse.courseTimeline)}>
              <Box my={1}>
                <Divider />
                <Box mt={1}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      updateMutation({
                        ...currentCourse,
                        courseTimeline: JSON.stringify(timeline),
                      });
                    }}
                  >
                    SAVE
                  </Button>
                </Box>
              </Box>
            </Collapse>
          </Paper>
        </Box>
        <Box mt={4}>
          <Typography variant="body2" color={"textSecondary"}>
            Course Progress
          </Typography>
          <Paper elevation={1} style={{ padding: "16px", marginTop: "8px" }}>
            <CourseProgressCard
              courseName={currentCourse.name}
              progressItems={JSON.parse(currentCourse.courseProgress)}
              wrapped
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
};

const CourseManagement: React.FC = () => {
  const classes = useStyles();
  const { data, error, isLoading } = useGetAllCourses();

  const [filter, setFilter] = React.useState<FilterItemValue>();
  const [openAdd, setOpenAdd] = React.useState(false);

  if (isLoading) {
    return <>Loading...</>;
  }
  const rows: Course[] = data ?? [];
  const filters = (
    <Grid container alignItems={"center"}>
      <Grid item xs={12} sm={6} md={8} lg={10} xl={11}>
        <Filters
          value={filter!}
          onChange={setFilter}
          options={defaultOptions}
          label={
            keys(filter).length ? (
              <>Showing courses filter by</>
            ) : (
              <>Showing all course</>
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
        <CreateCourseForm
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
              <H1>Courses</H1>
              <H4>Manage all your courses from here</H4>
            </Grid>
            <Grid item>
              <Tooltip title="Create Class">
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
            <EnhancedTable<CourseTable>
              headCells={headCells}
              extendedProps={data}
              //@ts-ignore
              rows={rows.map((r) => {
                return {
                  courseName: r.name,
                  noOfClasses: r.numberOfClasses,

                  price: `₹ ${r.price}`,
                  discount: `${r.discount} %`,
                  courseLevel: r.courseLevel,
                  _id: r._id,
                };
              })}
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

export default CourseManagement;
