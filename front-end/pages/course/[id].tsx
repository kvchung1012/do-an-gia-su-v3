import api from '@/api';
import CustomizedAccordions from '@/components/AppAcordion';
import AppRating from '@/components/AppRating';
import CourseCard from '@/components/card/CourseCard';
import { RemoteIcon } from '@/components/icons';
import AoTrinhIcon from '@/components/icons/AoTrinhIcon';
import SpentTimeIcon from '@/components/icons/SpentTimeIcon';
import BaseLayout from '@/layouts/BaseLayout';
import DateCalendarValue from '@/components/Calendar';
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { chooseAllTimeAvailable, findDayHightLight } from 'pages/tutor/[id]';
import { useEffect, useRef, useState } from 'react';

const CourseDetail = () => {
  const router = useRouter();
  const course_id = router.query.id;
  const [course, setCourse] = useState(null);
  const ref = useRef<AbortController | null>(null);

  const [availableDay, setAvailableDay] = useState(null);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [timeAvaiLableDay, setTimeAvailableDay] = useState([]);
  const [payload, setPayload] = useState<any>({ tutor_available_date: [] });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const decoded = jwtDecode<any>(token);

    if (course_id) {
      const getCourse = async () => {
        try {
          const res = await api.get(`/course/${course_id}`);
          if (res.status === 200) {
            setCourse(res.data.data);
            const availableTime = await api.get(
              `/tutor-available-date/find-by-userid/${res.data.data.tutor_profile.user_id}`
            );
            setPayload((prev) => {
              return {
                ...prev,
                tutor_id: res.data.data.tutor_profile.user_id,
                student_id: decoded.user_id,
                course_id: res.data.data.course_id
              };
            });
            setAvailableDay(availableTime.data.data);
            setHighlightedDays(findDayHightLight(availableTime.data.data));
            setTimeAvailableDay(
              chooseAllTimeAvailable(
                dayjs().format('DD'),
                availableTime.data.data
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      };
      getCourse();
    }
  }, [course_id]);
  const [open, setOpen] = useState(false);

  // const () => = () => {
  //   // const body = {
  //   //   course_id,
  //   //   student_id: decoded.user_id
  //   // }

  //   // console.log(body);
  //   setOpen(true);
  // };

  const handleMonthChange = (date: Dayjs) => {
    if (ref.current) {
      ref.current.abort();
    }
    // setHighlightedDays([]);
    // fetchHighlightedDays(date);
  };

  const handleChangeDay = (value) => {
    const day = value.format('DD/MM/YYYY');
    setTimeAvailableDay(chooseAllTimeAvailable(day, availableDay));
  };

  const handleClickChip = (id) => {
    setPayload((prev) => ({
      ...prev,
      tutor_available_date: prev.tutor_available_date.concat(id)
    }));
  };

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
              onClick={checkOut}
            >
              Đăng ký khóa học
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>
          <Typography variant="h1">Chọn lịch học</Typography>
        </DialogTitle>
        <Divider />
        <Stack p={3} width="100%" gap="8px">
          <Typography variant="h3">Thời gian rảnh trong tuần</Typography>
          <Stack direction="row" spacing={6}>
            <DateCalendarValue
              highlightedDays={highlightedDays}
              handleMonthChange={handleMonthChange}
              onChangeDay={handleChangeDay}
            />
            <Stack pt={2} spacing={2}>
              <Typography variant="h4">
                Thời gian có thể dạy trong ngày
              </Typography>
              <Stack direction="row" spacing={1}>
                {timeAvaiLableDay?.length ? (
                  timeAvaiLableDay
                    .sort(function (a, b) {
                      return a.start_time.localeCompare(b.start_time);
                    })
                    ?.map((item, i) => (
                      <Chip
                        key={i}
                        label={`${item.start_time} : ${item.end_time}`}
                        onClick={() => handleClickChip(item.id)}
                      />
                    ))
                ) : (
                  <Typography>
                    Không có thời gian rảnh trong ngày này!
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" color="secondary">
              Đã học {payload?.tutor_available_date?.length} buổi
            </Typography>
            <Button
              onClick={() => {
                console.log(payload);
              }}
              variant="contained"
            >
              Mua
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </Container>
  );
};

export default CourseDetail;
CourseDetail.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
