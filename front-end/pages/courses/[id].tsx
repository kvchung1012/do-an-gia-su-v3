import api from '@/api';
import CustomizedAccordions from '@/components/AppAcordion';
import AppLinearProgress from '@/components/AppLinearProgress';
import AppRating from '@/components/AppRating';
import UserCommentSection from '@/components/UserCommentSection';
import {
  LangueTeachIcon,
  PersonIcon,
  SpeakLangueIcon,
  VerifyIcon
} from '@/components/icons';
import CourseForm from '@/components/management/course/CouresActionForm';
import BaseLayout from '@/layouts/BaseLayout';
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DetailCourse = () => {
  const router = useRouter();
  const id = router.query.id;
  const [dataCourse, setDataCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [dataSelected, setDataSelected] = useState<any>();

  const handleSaveData = (body) => {
    const request = !body?.course_id
      ? api.post('course', body)
      : api.put(`course/${body.course_id}`, body);

    request
      .then((res) => {
        console.log(res);
        getDetailTutor();
        setShowForm(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDetailTutor = async () => {
    try {
      const courseDetail = await api.get(`/course/${id}`);
      if (courseDetail.status === 200) {
        setDataCourse(courseDetail.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getDetailTutor();
    }
  }, [id]);

  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Stack direction="row" spacing={2} mt={4} justifyContent="center">
        <Box
          sx={{
            height: 160,
            minWidth: 160,
            width: 400,
            position: 'relative'
          }}
        >
          <Image
            src={dataCourse?.image_url || '/static/images/avatars/3.jpg'}
            layout="fill"
            style={{ borderRadius: '4px' }}
          />
        </Box>
        <Box width="100%">
          <Stack justifyContent="space-between" spacing={1}>
            <Stack spacing={1}>
              <Stack>
                <Typography
                  display="flex"
                  variant="h5"
                  color="secondary"
                  alignItems="center"
                  gap="8px"
                >
                  <LangueTeachIcon />
                  {dataCourse?.number_of_phase_required} bài học
                </Typography>
              </Stack>
              <Stack direction="row">
                <PersonIcon />
                Gia sư:
                <Link
                  href={`/tutor/${dataCourse?.tutor_profile?.tutor_profile_id}`}
                  passHref
                >
                  <Typography
                    display="flex"
                    variant="h5"
                    color="primary"
                    alignItems="center"
                    marginLeft="5px"
                    sx={{
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    {dataCourse?.tutor_profile?.user?.last_name}{' '}
                    {dataCourse?.tutor_profile?.user?.first_name}
                  </Typography>
                </Link>
              </Stack>
              <Stack>
                <Typography
                  display="flex"
                  variant="h5"
                  color="secondary"
                  alignItems="center"
                  gap="8px"
                >
                  <PersonIcon /> Thuộc loại: {dataCourse?.category?.name}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  display="flex"
                  variant="h5"
                  color="secondary"
                  alignItems="center"
                  gap="8px"
                >
                  <VerifyIcon /> Học phí: {dataCourse?.price}đ/buổi
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  display="flex"
                  variant="h5"
                  color="secondary"
                  alignItems="center"
                  gap="8px"
                >
                  <SpeakLangueIcon /> ngoại ngữ: Tiếng Anh
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Divider sx={{ mt: 2 }} />

      <Button variant="contained" onClick={() => setShowForm(true)}>
        Thêm Khóa học
      </Button>

      <Stack mt={2} width="70%" gap="8px">
        <Typography variant="h3">Các bài học</Typography>
        <Stack direction="row" spacing={6}>
          <Stack minWidth={250} spacing={1}>
            {dataCourse?.course_programs?.map((course) => {
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
        </Stack>
      </Stack>

      <Divider sx={{ mt: 2 }} />

      <Stack mt={2} width="70%" gap="8px">
        <Typography variant="h3">Mô tả khóa học</Typography>
        <Typography variant="h6" fontWeight={400}>
          {dataCourse?.description}
        </Typography>
      </Stack>
      <Divider sx={{ mt: 2 }} />
      <Stack mt={2} gap="8px">
        <Typography variant="h3">Tổng đánh giá khóa học</Typography>
        <Stack flexDirection="row" alignItems="center" gap="8px">
          <AppRating
            sx={{
              fontSize: '28px'
            }}
            value={5}
            readOnly
          />
          <AppLinearProgress
            sx={{
              width: '50%'
            }}
            value={80}
          />
          <Typography variant="h6" color="text.secondary">
            8
          </Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap="8px">
          <AppRating
            sx={{
              fontSize: '28px'
            }}
            value={4}
            readOnly
          />
          <AppLinearProgress
            sx={{
              width: '50%'
            }}
            value={10}
          />
          <Typography variant="h6" color="text.secondary">
            1
          </Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap="8px">
          <AppRating
            sx={{
              fontSize: '28px'
            }}
            value={3}
            readOnly
          />
          <AppLinearProgress
            sx={{
              width: '50%'
            }}
            value={10}
          />
          <Typography variant="h6" color="text.secondary">
            1
          </Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap="8px">
          <AppRating
            sx={{
              fontSize: '28px'
            }}
            value={2}
            readOnly
          />
          <AppLinearProgress
            sx={{
              width: '50%'
            }}
            value={0}
          />
          <Typography variant="h6" color="text.secondary">
            0
          </Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap="8px">
          <AppRating
            sx={{
              fontSize: '28px'
            }}
            value={1}
            readOnly
          />
          <AppLinearProgress
            sx={{
              width: '50%'
            }}
            value={0}
          />
          <Typography variant="h6" color="text.secondary">
            0
          </Typography>
        </Stack>
      </Stack>

      <UserCommentSection />
      {showForm && (
        <CourseForm
          data={dataSelected}
          isOpen={showForm}
          onSave={handleSaveData}
          onClose={() => setShowForm(false)}
          key={''}
        />
      )}
    </Container>
  );
};

export default DetailCourse;

DetailCourse.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
