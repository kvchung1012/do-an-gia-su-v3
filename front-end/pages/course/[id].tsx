import api from '@/api';
import CustomizedAccordions from '@/components/AppAcordion';
import AppRating from '@/components/AppRating';
import ConfirmDeleteModal from '@/components/base/modal/ConfirmDeleteModal';
import CourseCard from '@/components/card/CourseCard';
import { RemoteIcon } from '@/components/icons';
import AoTrinhIcon from '@/components/icons/AoTrinhIcon';
import SpentTimeIcon from '@/components/icons/SpentTimeIcon';
import CourseProgramFormAdd from '@/components/management/course/CourseProgramFormAdd';
import BaseLayout from '@/layouts/BaseLayout';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CourseDetail = () => {
  const router = useRouter();
  const course_id = router.query.id;
  const [course, setCourse] = useState(null);

  const [showFormDetail, setShowFormDetail] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [dataSelected, setDataSelected] = useState<any>();

  const handleSaveData = (body) => {
    const request = !body?.course_program_id
      ? api.post('course-program', { course_id: course_id, ...body })
      : api.put(`course-program/${body.course_program_id}`, body);
    request
      .then((res) => {
        setShowFormDetail(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = () => {
    const { course_program_id } = dataSelected;
    api.delete(`course-program/${course_program_id}`).then(() => {
      setShowConfirmDelete(false);
    });
  };
  useEffect(() => {
    if (course_id) {
      const getCourse = async () => {
        try {
          const res = await api.get(`/course/${course_id}`);
          if (res.status === 200) {
            setCourse(res.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getCourse();
    }
  }, [course_id, showConfirmDelete, showFormDetail]);

  // const token = localStorage.getItem('access_token');
  // const decoded = jwtDecode<any>(token);

  // const checkOut = ()=>{
  //   const body = {
  //     course_id,
  //     student_id: decoded.user_id
  //   }

  //   console.log(body);
  // }
  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Grid mt={5} container>
        <Grid item xs={8}>
          <Typography variant="h1">{course?.name}</Typography>
          <Typography mt={2} color="secondary" variant="h4">
            {course?.description}
          </Typography>

          <Divider sx={{ mt: 2 }} />
          <Typography mt={2} variant="h3">
            Thông tin khóa học
          </Typography>
          <Typography mt={2} variant="h5" color="secondary">
            Giá tiền : {course?.price}đ
          </Typography>
          <Typography mt={2} variant="h5" color="secondary">
            Đánh giá : <AppRating value={Number(course?.ratting)} />
          </Typography>
          <Typography mt={2} variant="h5" color="secondary">
            Tổng thời lượng của khóa học : {course?.spend_time}
          </Typography>

          <Divider sx={{ mt: 2 }} />
          <Typography mt={2} variant="h3">
            Nội dung khóa học
          </Typography>

          <Typography my={2} variant="h5" color="secondary">
            {course?.course_programs?.length} chương •{' '}
            {course?.course_program_phases?.length} bài học • thời lượng{' '}
            {course?.spend_time}
          </Typography>

          <Stack spacing={1}>
            {course?.course_programs?.map((course) => {
              return (
                <CustomizedAccordions
                  key={course.course_program_id}
                  keyExpand={course.course_program_id}
                  title={course.tittle}
                  childTitle={course.course_program_phases}
                  data={course}
                  setDataSelected={setDataSelected}
                  setShowForm={setShowFormDetail}
                  setShowConfirmDelete={setShowConfirmDelete}
                />
              );
            })}
          </Stack>
        </Grid>
        <Grid
          display="flex"
          flexDirection="column"
          alignItems="center"
          item
          gap="20px"
          xs={4}
        >
          <CourseCard
            src={course?.image_url}
            title={course?.name}
            course_id={course?.course_id}
            noPush
          />
          <Stack alignItems="center" gap="10px">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: '12px'
              }}
            >
              <Typography
                display="flex"
                alignItems="center"
                variant="h6"
                color="secondary"
              >
                <AoTrinhIcon /> Cơ bản
              </Typography>

              <Typography
                display="flex"
                alignItems="center"
                variant="h6"
                color="secondary"
              >
                <RemoteIcon /> Tiện ích
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                variant="h6"
                color="secondary"
              >
                <SpentTimeIcon /> Thời lượng: {course?.spend_time}
              </Typography>
            </Box>

            <Button
              sx={{ border: '2px solid #121117' }}
              variant="contained"
              // onClick={checkOut}
            >
              Đăng ký khóa học
            </Button>
            <Button
              sx={{ border: '2px solid #121117' }}
              variant="contained"
              onClick={() => {
                setDataSelected({});
                setShowFormDetail(true);
              }}
            >
              Thêm khóa học
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {showFormDetail && (
        <CourseProgramFormAdd
          data={dataSelected}
          isOpen={showFormDetail}
          onSave={handleSaveData}
          onClose={() => setShowFormDetail(false)}
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
    </Container>
  );
};

export default CourseDetail;
CourseDetail.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
