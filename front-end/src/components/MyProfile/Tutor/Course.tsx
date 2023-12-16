import api from '@/api';
import ControlTextField from '@/components/ControlTextField';
import ConfirmDeleteModal from '@/components/base/modal/ConfirmDeleteModal';
import CourseDetailCard from '@/components/card/CourseDetailCard';
import CourseFormAdd from '@/components/management/course/CourseFormAdd';
import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
}

const defaultValues = {
  name: ''
};

const CoursePanel = () => {
  const [courseList, setCourseList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [dataSelected, setDataSelected] = useState<any>();
  const [count, setCount] = useState<any>(0);

  const getTutor = () => {
    api.get('/course').then((res) => {
      setCourseList(res.data.data);
    });
  };

  useEffect(() => {
    getTutor();
  }, [count]);

  const handleSaveData = (body) => {
    const request = !body?.course_id
      ? api.post('course', body)
      : api.put(`course/${body.course_id}`, body);
    request
      .then((res) => {
        getTutor();
        setShowForm(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = () => {
    const { course_id } = dataSelected;

    api.delete(`course/${course_id}`).then(() => {
      getTutor();
      setShowConfirmDelete(false);
    });
  };

  return (
    <>
      <Stack height="100%" mt={2} spacing={2}>
        <Typography variant="h1">Tất cả khóa học</Typography>
        <Grid display="flex" alignItems="center" container columnSpacing={2}>
          <Grid item xs={4}>
            <TextField label="Tên Khóa học" name="search" />
          </Grid>
          <Button
            sx={{
              border: '2px solid #121117',
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
        {courseList.map((item, i) => (
          <CourseDetailCard
            key={i}
            data={item}
            setDataSelected={setDataSelected}
            setShowForm={setShowForm}
            setShowConfirmDelete={setShowConfirmDelete}
            setCount={setCount}
          />
        ))}
      </Stack>
      {showForm && (
        <CourseFormAdd
          data={dataSelected}
          isOpen={showForm}
          onSave={handleSaveData}
          onClose={() => setShowForm(false)}
          key={''}
        />
      )}
      {showConfirmDelete && (
        <ConfirmDeleteModal
          open={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default CoursePanel;
