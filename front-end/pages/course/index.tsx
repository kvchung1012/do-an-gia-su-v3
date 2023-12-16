import api from '@/api';
import ControlTextField from '@/components/ControlTextField';
import ConfirmDeleteModal from '@/components/base/modal/ConfirmDeleteModal';
import CourseDetailCard from '@/components/card/CourseDetailCard';
import CourseFormAdd from '@/components/management/course/CourseFormAdd';
import BaseLayout from '@/layouts/BaseLayout';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
}

const defaultValues = {
  name: ''
};

const Course = () => {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues
  });

  const [courseList, setCourseList] = useState([]);
  const [courseListRoot, setCourseListRoot] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [dataSelected, setDataSelected] = useState<any>();

  const handleFilter = () => {
    console.log('');
  };
  useEffect(() => {
    const getTutor = async () => {
      try {
        api.get('/course').then((res) => {
          setCourseList(res.data.data);
          setCourseListRoot(res.data.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getTutor();
  }, []);

  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Stack
        component="form"
        onSubmit={handleSubmit(handleFilter)}
        height="100%"
        mt={2}
        spacing={2}
      >
        <Typography variant="h1">Tất cả khóa học</Typography>
        <Grid container columnSpacing={2}>
          <Grid item xs={4}>
            <ControlTextField
              control={control}
              label="Tên Khóa học"
              name="name"
              textfieldProps={{
                size: 'medium',
                placeholder: 'Tìm kiếm khóa học',
                autoComplete: 'off',
                margin: 'none'
              }}
            />
          </Grid>
          <Button
            sx={{
              border: '2px solid #121117',
              marginTop: '25px',
              marginLeft: '8px',
              height: '50px'
            }}
            variant="contained"
            onClick={() => {
              setDataSelected({});
              setShowForm(true);
            }}
          >
            Thêm khóa học
          </Button>
        </Grid>
        {courseList.map((item) => (
          <CourseDetailCard
            key={item.tutor_profile_id}
            data={item}
            setDataSelected={setDataSelected}
            setShowForm={setShowForm}
            setShowConfirmDelete={setShowConfirmDelete}
          />
        ))}
      </Stack>
    </Container>
  );
};

export default Course;
Course.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
