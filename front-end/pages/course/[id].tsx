import api from '@/api';
import CustomizedAccordions from '@/components/AppAcordion';
import AppRating from '@/components/AppRating';
import CourseCard from '@/components/card/CourseCard';
import { RemoteIcon } from '@/components/icons';
import AoTrinhIcon from '@/components/icons/AoTrinhIcon';
import SpentTimeIcon from '@/components/icons/SpentTimeIcon';
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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CourseDetail = () => {
  const router = useRouter();
  const course_id = router.query.id;
  const [course, setCourse] = useState(null);
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
  }, [course_id]);

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

          <Typography mt={2} variant="h5" color="secondary">
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
          gap="50px"
          xs={4}
        >
          <CourseCard
            src={course?.image_url}
            title={course?.name}
            course_id={course?.course_id}
            noPush
          />
          <Stack alignItems="center" gap="10px">
            <Button sx={{ border: '2px solid #121117' }} variant="contained">
              Đăng ký khóa học
            </Button>

            <Typography
              display="flex"
              alignItems="center"
              variant="h5"
              color="secondary"
              gap="10px"
            >
              <AoTrinhIcon /> Trình độ cơ bản
            </Typography>

            <Typography
              display="flex"
              alignItems="center"
              variant="h5"
              color="secondary"
              gap="10px"
            >
              <RemoteIcon /> Học mọi lúc, mọi nơi
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              variant="h5"
              color="secondary"
              gap="10px"
            >
              <SpentTimeIcon /> Thời lượng: {course?.spend_time}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetail;
CourseDetail.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
