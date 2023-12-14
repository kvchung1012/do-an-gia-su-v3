import api from '@/api';
import BaseLayout from '@/layouts/BaseLayout';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Payment = () => {
  const router = useRouter();
  const params = router.query;

  // useEffect(() => {
  //   if (params) {
  //     const haha = async () => {
  //       const res = await api.post('/payment/checksum-payment', null, {
  //         params
  //       });
  //       console.log(res);
  //     };
  //     haha();
  //   }
  // }, [params]);

  return <Container></Container>;
};

export default Payment;

Payment.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
