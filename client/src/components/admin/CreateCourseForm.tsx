import React from "react";
import FormWrapper from "./Forms";
import * as yup from "yup";
import { Field, FieldProps } from "formik";
import {
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import useCustomSnackbar from "../../hooks/useSnackbar";
import { isUndefined, values } from "lodash";
import useGetAllTeachers from "../../lib/useGetAllTeachers";
import { CreateCourseMutation } from "../../lib/mutations/adminMutations/CreateCourseMutation";
import { H5 } from "../common/typography";
import { AddCircleRounded, Delete } from "@mui/icons-material";

const StyledTextField = styled(TextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

type CreateCourseFormFields = {
  name: string;
  description: string;
  numberOfClasses: number;
  price: number;
  teacherIds: Array<string>;
  tags: Array<string>;
  subHeader: string;
  discount: number;
  courseLevel: string;
  ageGroup: string;
  courseProgress: string;
  starred: boolean;
  curriculum: Array<string>;
};

const initialValues = {
  name: "",
  description: "",
  numberOfClasses: 0,
  subHeader: "",
  price: 0,
  teacherIds: [],
  curriculum: [],
  tags: [],
  discount: 0,
  courseLevel: "",
  ageGroup: "",
  courseProgress: JSON.stringify([]),
  starred: true,
};

interface ICreateCourseForm {
  open: boolean;
  onClose: () => void;
}

const schema = yup.object({
  name: yup.string().required(),
  //   email: yup.string().email(),
});

const CreateCourseForm: React.FC<ICreateCourseForm> = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useCustomSnackbar();
  const { data, error, isLoading: queryLoading } = useGetAllTeachers();

  const { mutate, isLoading } = useMutation(CreateCourseMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-all-courses").then(() => {
        showSuccess("Course was created");
        onClose();
      });
    },
    onError: (e) => {
      showError("Something went rent");
    },
  });

  const options =
    queryLoading || isUndefined(data)
      ? []
      : data.map((d) => {
          return { label: d.name, id: d._id };
        });

  const progressRenderer = (
    values: Array<{ label: string; description: string }>,
    setValues: (
      field: string,
      value: string,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    const handleDelete = (i: number) => {
      const copy = [...values];
      copy.splice(i, 1);
      setValues("courseProgress", JSON.stringify(copy));
    };

    return (
      <>
        <Box>
          <Grid container>
            <Grid item xs={11}>
              <Box mt={1}>
                <H5>Add up progress details</H5>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Tooltip title="add">
                <IconButton
                  onClick={() => {
                    setValues(
                      "courseProgress",
                      JSON.stringify([
                        ...values,
                        { label: "", description: "" },
                      ])
                    );
                  }}
                >
                  <AddCircleRounded />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Box>
          {values.map((m, i) => {
            return (
              <>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <StyledTextField
                      fullWidth
                      id={`label-${i}`}
                      label="Label"
                      variant="outlined"
                      margin="normal"
                      value={m.label}
                      size="small"
                      onChange={(e) => {
                        let copy = [...values];
                        copy[i].label = e.target.value;
                        setValues("courseProgress", JSON.stringify(copy));
                      }}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <StyledTextField
                      fullWidth
                      id={`desc-${i}`}
                      label="Description"
                      variant="outlined"
                      margin="normal"
                      value={m.description}
                      size="small"
                      onChange={(e) => {
                        let copy = [...values];
                        copy[i].description = e.target.value;
                        setValues("courseProgress", JSON.stringify(copy));
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Box mt={1.5}>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(i)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Grid>
              </>
            );
          })}
        </Box>
      </>
    );
  };

  return (
    <>
      <FormWrapper<CreateCourseFormFields>
        open={open}
        handleClose={onClose}
        title={"Create Course"}
        initialValues={initialValues}
        confirmLabel={"CREATE"}
        dismissLabel={"CLOSE"}
        subHeader={
          "Create courses to schdule classes and allow students to buy the courses"
        }
        validationSchema={schema}
        handleSubmit={(v) => {
          mutate(v);
        }}
        render={(e) => {
          return (
            <>
              <div>
                <Field name="name">
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues["name"]>) => (
                    <StyledTextField
                      fullWidth
                      id="name"
                      label="Name"
                      required
                      {...field}
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched ? meta.error : ""}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                </Field>
                <Field name="subHeader">
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues["subHeader"]>) => (
                    <StyledTextField
                      fullWidth
                      id="shub-header-name"
                      label="Sub Header"
                      required
                      {...field}
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched ? meta.error : ""}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                </Field>
                <Field name="description">
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues["description"]>) => (
                    <StyledTextField
                      fullWidth
                      id="description"
                      multiline
                      rows={2}
                      maxRows={4}
                      label="Description"
                      required
                      {...field}
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched ? meta.error : ""}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                </Field>

                {isLoading || !Boolean(data) ? (
                  <Skeleton />
                ) : (
                  <Autocomplete
                    disablePortal
                    id="courses"
                    options={options}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <StyledTextField {...params} label="Teacher" required />
                    )}
                    value={
                      e.values.teacherIds.length > 0
                        ? {
                            label:
                              options.find(
                                (o) => o.id === e.values.teacherIds[0]
                              )?.label ?? "",
                            id: e.values.teacherIds[0],
                          }
                        : {
                            label: "",
                            id: "",
                          }
                    }
                    getOptionLabel={(o) => o.label}
                    onChange={(m, o) => {
                      e.setValues({ ...e.values, teacherIds: [o?.id!] });
                    }}
                  />
                )}

                <Field name="numberOfClasses">
                  {({
                    field,
                    meta,
                  }: FieldProps<typeof initialValues["numberOfClasses"]>) => (
                    <StyledTextField
                      fullWidth
                      id="numberOfClasses"
                      label="Number Of Classes"
                      type="number"
                      required
                      {...field}
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched ? meta.error : ""}
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                </Field>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field name="price">
                      {({
                        field,
                        meta,
                      }: FieldProps<typeof initialValues["price"]>) => (
                        <StyledTextField
                          fullWidth
                          id="price"
                          label="Price (in INR)"
                          type="number"
                          required
                          {...field}
                          error={!!(meta.touched && meta.error)}
                          helperText={meta.touched ? meta.error : ""}
                          variant="outlined"
                          margin="normal"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={6}>
                    <Field name="discount">
                      {({
                        field,
                        meta,
                      }: FieldProps<typeof initialValues["discount"]>) => (
                        <StyledTextField
                          fullWidth
                          id="discount"
                          label="Discount Percentage"
                          type="number"
                          required
                          {...field}
                          error={!!(meta.touched && meta.error)}
                          helperText={meta.touched ? meta.error : ""}
                          variant="outlined"
                          margin="normal"
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-proficeny">
                          Proficeny
                        </InputLabel>
                        <Select
                          labelId="proficeny"
                          id="demo-simple-select-proficeny"
                          value={e.values.courseLevel}
                          label=" Proficeny"
                          onChange={(eve) => {
                            e.setValues({
                              ...e.values,
                              courseLevel: eve.target.value,
                            });
                          }}
                        >
                          <MenuItem value={"Beginner"}>Beginner</MenuItem>
                          <MenuItem value={"Intermediate"}>
                            Intermediate
                          </MenuItem>
                          <MenuItem value={"Advanced"}>Advanced</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Age
                        </InputLabel>
                        <Select
                          labelId="courseLevel"
                          id="demo-simple-select-course-level"
                          value={e.values.ageGroup}
                          label="Age"
                          onChange={(eve) => {
                            e.setValues({
                              ...e.values,
                              ageGroup: eve.target.value,
                            });
                          }}
                        >
                          <MenuItem value={"3"}>3 Year's</MenuItem>
                          <MenuItem value={"4"}>4 Year's</MenuItem>
                          <MenuItem value={"5"}>5 Year's</MenuItem>
                          <MenuItem value={"6"}>6 Year's</MenuItem>
                          <MenuItem value={"7"}>7 Year's</MenuItem>
                          <MenuItem value={"8"}>8 Year's</MenuItem>
                          <MenuItem value={"9"}>9 Year's</MenuItem>
                          <MenuItem value={"10"}>10 Year's</MenuItem>
                          <MenuItem value={"All"}>All Year's</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>

                <Box mt={2} mb={0}>
                  <Divider />
                </Box>
                <Box display={"flex"}>
                  <Checkbox
                    checked={e.values.starred}
                    onChange={(ev, checked) => {
                      e.setValues({ ...e.values, starred: checked });
                    }}
                  />{" "}
                  <Box mt={1.25}>
                    <Typography> Show this course on main page</Typography>
                  </Box>
                </Box>
                <Box mt={0} mb={2}>
                  <Divider />
                </Box>
                <Box>
                  {progressRenderer(
                    JSON.parse(e.values.courseProgress),
                    e.setFieldValue
                  )}
                </Box>
              </div>
            </>
          );
        }}
      />
    </>
  );
};

export default CreateCourseForm;
