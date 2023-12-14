import api from '@/api';
import { ROOT_PATH } from '@/const';
import BaseLayout from '@/layouts/BaseLayout';
import { Container } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';

const Payment = () => {
  const router = useRouter();
  const params = router.query;

  useEffect(() => {
    if (params) {
      const haha = async () => {
        const res = await api.get('/payment/checksum-payment', {
          params
        });
        if (res.status === 200) {
          if (res.data.data.code) {
            router.push(ROOT_PATH);
            enqueueSnackbar({
              message: 'Thanh toán thành công!',
              variant: 'success'
            });
            return;
          } else {
            enqueueSnackbar({
              message: getMessageError(res.data.data.code),
              variant: 'error'
            });
            router.push(ROOT_PATH);
            return;
          }
        }
      };
      haha();
    }
  }, [params]);

  return (
    <Container sx={{ height: '90vh' }}>
      <Image src="https://i.imgur.com/t3eTCd2.png" height={400} width="100%" />
    </Container>
  );
};

export default Payment;

Payment.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};

const getMessageError = (haha) => {
  switch (haha) {
    case '07':
      return 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).';

    case '09':
      return 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.';

    case '10':
      return 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần';

    case '11':
      return 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.';

    case '12':
      return 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.';

    case '13':
      return 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.';

    case '24':
      return 'Giao dịch không thành công do: Khách hàng hủy giao dịch';

    case '51':
      return 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.';

    case '65':
      return 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.';

    case '75':
      return 'Ngân hàng thanh toán đang bảo trì.';

    case '79':
      return 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch';

    default:
      return 'Lỗi không xác định';
  }
};
