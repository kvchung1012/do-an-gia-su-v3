import api from '@/api';
import BannerSection from '@/components/BannerSection';
import TutorSection from '@/components/TutorSection';
import BaseLayout from '@/layouts/BaseLayout';
import { Stack } from '@mui/material';
import { ReactElement, useEffect } from 'react';

const Overview = () => {
  // useEffect(() => {
  //   const getTutor = async () => {
  //     try {
  //       const res = await api.get('/tutor');
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getTutor();
  // }, []);

  return (
    <Stack minHeight="200vh">
      <BannerSection />
      <TutorSection />
    </Stack>
  );
};

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
