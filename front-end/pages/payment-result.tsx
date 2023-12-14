import api from '@/api';
import BaseLayout from '@/layouts/BaseLayout';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Payment = () => {
  const router = useRouter();
  const params = router.query;

  const paramstr = Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');
  useEffect(() => {
    if (params) {
      console.log(params);

      const haha = async () => {
        const res = await api.post('/payment/checksum-payment?' + paramstr);
        console.log(res);
      };
      haha();
    }
  }, [params]);

  return <Container></Container>;
};

export default Payment;

Payment.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
