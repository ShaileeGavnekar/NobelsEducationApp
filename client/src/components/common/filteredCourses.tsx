import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import CourseCard from '../students/dashboard/CourseCard';

const FilteredCourses: React.FC<{ courses: any[] }> = ({ courses }) => {
  return (
    <Box mt={10} mb={4}>
      <Container>
        <Grid container justifyContent='center' alignItems='center' spacing={3}>
          {courses.map((course, i) => {
            return (
              <Grid item xs={10} md={5} key={i}>
                <CourseCard course={course} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default FilteredCourses;
