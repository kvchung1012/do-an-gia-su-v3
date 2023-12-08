import { Stack, Typography } from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SubjectCard from '../card/SubjectCard';

const SubjectSection = () => {
  return (
    <Stack
      direction="column"
      spacing={2}
      height={450}
      p="10px"
      alignItems="center"
    >
      <Typography variant="h2">Môn học</Typography>
      <Typography variant="h5">
        Có đầy đủ các môn học từ mẫu giáo tới đại học
      </Typography>

      <Swiper
        // pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper"
        slidesPerView={4}
        spaceBetween={35}
        navigation={true}
        style={{
          userSelect: 'none',
          padding: '4px 33px '
        }}
      >
        {subjectList.map((item, i) => (
          <SwiperSlide key={i}>
            <SubjectCard name={item.name} src={item.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

export default SubjectSection;

const subjectList = [
  {
    img: 'https://i.imgur.com/vHdhOup.png',
    name: 'Toán học'
  },
  {
    img: 'https://i.imgur.com/7ya8smz.png',
    name: 'Vật Lý'
  },
  {
    img: 'https://i.imgur.com/pAedHwG.png',
    name: 'Hóa Học'
  },
  {
    img: 'https://i.imgur.com/sz1XIGD.png',
    name: 'Địa Lý'
  },
  {
    img: 'https://i.imgur.com/ecoSAH0.png',
    name: 'Ngoại ngữ'
  },
  {
    img: 'https://i.imgur.com/LO0piiO.png',
    name: 'Mỹ thuật'
  },
  {
    img: 'https://i.imgur.com/uvMFov8.png',
    name: 'Tin học'
  },
  {
    img: 'https://i.imgur.com/sz1XIGD.png',
    name: 'Ngữ văn'
  },
  {
    img: 'https://i.imgur.com/jbDBAoK.png',
    name: 'Môn học khác'
  }
];
