import { TUTOR_DETAIL_PATH } from '@/const';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  HeartIcon,
  LangueTeachIcon,
  PersonIcon,
  SpeakLangueIcon,
  StarIcon
} from '../icons';

const TutorDetailCard = ({ data }: TutorDetailCardProps) => {
  const router = useRouter();

  return (
    <Stack
      border="2px solid #121117"
      p={3}
      borderRadius="4px"
      height={275}
      direction="row"
      spacing={3}
      justifyContent="space-between"
    >
      <>
        <Box
          sx={{
            height: 160,
            minWidth: 160,
            position: 'relative'
          }}
        >
          <Image
            src={data?.user?.avatar_url || '/static/images/avatars/3.jpg'}
            layout="fill"
            style={{ borderRadius: '4px' }}
          />
        </Box>

        <Stack width="100%" spacing={2}>
          <Typography variant="h2">
            {data?.user?.first_name || 'Gia sư ẩn danh'}
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

            <Typography mt={2} variant="h4">
              Chứng chỉ TOEIC 800+{' '}
            </Typography>
            <Typography
              variant="h4"
              fontWeight={400}
              className="text-ellipsis-2-row"
            >
              {data?.description ||
                `Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the ...`}
            </Typography>
          </Stack>
        </Stack>
      </>

      <Stack justifyContent="space-between" minWidth="25%">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" height={52} spacing={2}>
            <Stack width="fit-content" justifyContent="center">
              <Typography variant="h3">
                <StarIcon /> 5
              </Typography>
              <Typography variant="h5" color="secondary">
                9 Reviews
              </Typography>
            </Stack>
            <Stack width="fit-content" justifyContent="center">
              <Typography variant="h3">200k+</Typography>
              <Typography variant="h5" color="secondary">
                45p/1h
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="h2">
            <HeartIcon />
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Button
            sx={{ border: '2px solid #121117' }}
            variant="contained"
            onClick={() =>
              router.push({
                pathname: TUTOR_DETAIL_PATH,
                query: { id: data?.tutor_profile_id }
              })
            }
          >
            Đặt lịch học
          </Button>
          <Button variant="outlined">Gửi tin nhắn</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TutorDetailCard;

type TutorDetailCardProps = {
  data?: any;
};
