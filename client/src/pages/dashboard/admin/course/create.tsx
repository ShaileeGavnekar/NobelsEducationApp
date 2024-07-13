import { NextPage } from 'next';
import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Autocomplete, Box, Button, Grid, Icon, Paper, styled, TextField, Theme, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import AdminLayout from '../../../../components/admin/AdminLayout/AdminLayout';
import { Span } from '../../../../components/common/typography';
import { CreateCourseInput, CreateCourseMutation } from '../../../../lib/mutations/adminMutations/CreateCourseMutation';
import useGetAllTeachers from '../../../../queries/useGetAllTeachers';
import { isUndefined } from "lodash"

import { createStyles, makeStyles } from "@mui/styles"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      padding: theme.spacing(2),
      marginLeft: theme.spacing(6),
      marginTop: theme.spacing(2),
      fontWeight: "bold",
      fontSize: theme.spacing(4)
    },
    button: {
      marginLeft: "auto",
      marginRight: 0
    },
    paper: {
      width: "50%",
      marginLeft: "120px",
    }

  })
);

const StyledTextField = styled(TextField)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const initialValues = {
  name: '',
  description: '',
  numberOfClasses: 0,
  price: 0,
  teacherIds: []
};
const validationSchema = yup.object({
  name: yup.string().required('Course name is required'),
  description: yup.string(),
  numberOfClasses: yup.number().required('Number of classes is required'),
  price: yup.number().required('Price is required'),
  // teacherIds:yup.array({})
});

const CreateCourse: NextPage = () => {
  const [formValues, setFormValues] =
    React.useState<CreateCourseInput>(initialValues);
  const classes = useStyles()
  const { data, error, isLoading: queryLoading } = useGetAllTeachers()
  const [teachers, setTeachers] = React.useState([])
  const { mutate, isLoading } = useMutation(CreateCourseMutation, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Box>
      <Box>
        <Typography variant="h6" className={classes.heading}>
          Create Course
        </Typography>
        <Box><Typography></Typography><span></span></Box>
      </Box>
      <Paper elevation={1} className={classes.paper}>
        <Box p={4} ml={4} mr={4}>
          <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <StyledTextField
                  fullWidth
                  id='name'
                  name='name'
                  label='Name of Course'
                  value={values.name}
                  onChange={handleChange}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  variant='standard'
                />
                <StyledTextField
                  fullWidth
                  id='description'
                  name='description'
                  label='Description of Course'
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  variant='standard'
                />
                <Autocomplete
                  disablePortal
                  id="teacher"
                  options={!isUndefined(data) && data?.length > 0 ? data.map((a) => a._id)! : []}
                  // sx={{ width: 300 }}
                  renderInput={(params) => <StyledTextField {...params}
                    name='teacherIds'
                    label='Teacher(s)'
                    value={values.teacherIds}
                    onChange={handleChange}
                    error={touched.teacherIds && Boolean(errors.teacherIds)}
                    helperText={touched.teacherIds && errors.teacherIds}
                    variant='standard'
                  />}
                />
                <StyledTextField
                  fullWidth
                  id='numberOfClasses'
                  name='numberOfClasses'
                  label='Number of Classes'
                  type='number'
                  value={values.numberOfClasses}
                  onChange={handleChange}
                  error={touched.numberOfClasses && Boolean(errors.numberOfClasses)}
                  helperText={touched.numberOfClasses && errors.numberOfClasses}
                  variant='standard'
                />
                <StyledTextField
                  sx={{ mb: 4 }}
                  fullWidth
                  id='price'
                  name='price'
                  label='Price of Course'
                  type='number'
                  value={values.price}
                  onChange={handleChange}
                  error={touched.price && Boolean(errors.price)}
                  helperText={touched.price && errors.price}
                  variant='standard'
                />
              </Grid>
            </Grid>
            <Box display="flex">
              <Button color='primary' variant='contained' type='submit' className={classes.button}>
                <Span sx={{ textTransform: 'capitalize' }}>Submit</Span>
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>

    </Box>

  );
};

export default CreateCourse;
