import TutorSection from '@/components/TutorSection';
import BaseLayout from '@/layouts/BaseLayout';
import { ReactElement } from 'react';

const Overview = () => {
  return <TutorSection />;
};

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
