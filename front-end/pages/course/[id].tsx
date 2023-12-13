import api from '@/api';
import BaseLayout from '@/layouts/BaseLayout';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CourseDetail = () => {
  const router = useRouter();
  const course_id = router.query.id;

  useEffect(() => {
    if (course_id) {
      const getCourse = async () => {
        try {
          const res = await api.get(`/course/${course_id}`);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      };

      getCourse();
    }
  }, [course_id]);

  return <Container sx={{ minHeight: '100vh' }}></Container>;
};

export default CourseDetail;
CourseDetail.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
