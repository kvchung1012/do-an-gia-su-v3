import BaseLayout from '@/layouts/BaseLayout';
import { ReactElement } from 'react';

const Overview = () => {
  return <h1>Đây là trang chủ</h1>;
};

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
