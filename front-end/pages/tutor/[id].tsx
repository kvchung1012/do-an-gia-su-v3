import api from '@/api';
import AppLinearProgress from '@/components/AppLinearProgress';
import AppRating from '@/components/AppRating';
import DateCalendarValue from '@/components/Calendar';
import UserCommentSection from '@/components/UserCommentSection';
import {
  ArrowIcon,
  HeartIcon,
  LangueTeachIcon,
  PersonIcon,
  SpeakLangueIcon,
  VerifyIcon
} from '@/components/icons';
import SendMessageIcon from '@/components/icons/SendMessageIcon';
import TryTutorIcon from '@/components/icons/TryTutorIcon';
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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DetailTutor = () => {
  const router = useRouter();
  const id = router.query.id;
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    if (id) {
      const getDetailTutor = async () => {
        try {
          const res = await api.get(`/tutor/${id}`);
          if (res.status === 200) {
            setTutor(res.data.data);
          }
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      };

      getDetailTutor();
    }
  }, [id]);

  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Stack direction="row" spacing={2} mt={4} justifyContent="space-between">
        <Box
          sx={{
            height: 160,
            minWidth: 160,
            width: 160,
            position: 'relative'
          }}
        >
          <Image
            src={tutor?.user?.avatar_url || '/static/images/avatars/3.jpg'}
            layout="fill"
            style={{ borderRadius: '4px' }}
          />
        </Box>

        <Box width="100%">
          <Stack justifyContent="space-between" spacing={1}>
            <Typography
              display="flex"
              variant="h1"
              alignItems="center"
              gap="8px"
            >
              {tutor?.user.first_name || 'Gia sư ẩn danh'}{' '}
              <VerifyIcon sx={{ fontSize: 18, color: '#4caf50' }} />
            </Typography>
            <Typography variant="h5" color="secondary">
              Có kinh nghiệm 4 năm trong nghề gia sư
            </Typography>

            <Stack spacing={1}>
              <Stack>
                <Typography
                  display="flex"
                  variant="h5"
                  color="secondary"
                  alignItems="center"
                  gap="8px"
                >
                  <LangueTeachIcon /> Tiếng việt
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
                  <PersonIcon /> 20 học sinh đang theo học
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

        <Stack minWidth={250} spacing={1}>
          <Button
            sx={{ border: '2px solid #121117' }}
            startIcon={<TryTutorIcon />}
            variant="contained"
          >
            Đặt lịch học thử
          </Button>
          <Button startIcon={<SendMessageIcon />} variant="outlined">
            Gửi tin nhắn
          </Button>
          <Button startIcon={<HeartIcon />} variant="outlined">
            Yêu thích gia sư
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ mt: 2 }} />
      <Stack mt={2} width="70%" gap="8px">
        <Typography variant="h3">Thời gian rảnh trong tuần</Typography>
        <DateCalendarValue />
      </Stack>

      <Divider sx={{ mt: 2 }} />
      <Stack mt={2} width="70%" gap="8px">
        <Typography variant="h3">Mô tả gia sư</Typography>
        <Typography variant="h4" fontWeight={400}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>
      </Stack>

      <Divider sx={{ mt: 2 }} />
      <Stack mt={2} gap="8px">
        <Typography variant="h3">Tổng đánh giá gia sư</Typography>
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
    </Container>
  );
};

export default DetailTutor;

DetailTutor.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
