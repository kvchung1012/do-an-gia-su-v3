import api from '@/api';
import {
  LOGIN_PATH,
  REGISTER_PATH,
  ROLE_STUDENT_ID,
  ROLE_TEACHER_ID,
  STUDENT_REGISTER_PATH,
  TEACHER_REGISTER_PATH
} from '@/const';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import ControlTextField from '../ControlTextField';

type FormData = {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone_number: string;
  gender: string;
  stripe_account_id: string;
  description: string;
  avatar_url: string;
};

const defaultValues = {
  last_name: '',
  first_name: '',
  email: '',
  password: '',
  phone_number: '',
  gender: 'female',
  balance: '',
  stripe_account_id: '',
  description: '',
  confirmPassword: '',
  avatar_url: ''
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        Ez Gia sư
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const schema: ZodType = z
    .object({
      last_name: z.string(),
      gender: z.string(),
      description: z.string(),
      stripe_account_id: z.string(),
      avatar_url: z.string(),
      first_name: z.string().min(1, 'Vui lòng nhập tên'),
      phone_number: z
        .string()
        .min(10, { message: 'Số điện thoại có ít nhất mười số' })
        .regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
          message: 'Số điện thoại không đúng định dạng'
        }),
      email: z
        .string()
        .min(1, { message: 'Không được để trống email' })
        .email({ message: 'Không đúng dạng địa chỉ email' }),
      password: z
        .string()
        .min(1, { message: 'Không được để trống mật khẩu' })
        .min(4, { message: 'Mật khẩu ít nhất 4 ký tự' }),
      confirmPassword: z
        .string()
        .min(1, { message: 'Vui lòng xác nhận lại mật khẩu!' })
        .min(4, { message: 'Mật khẩu ít nhất 4 ký tự' })
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Mật khẩu không trùng khớp!',
      path: ['confirmPassword']
    });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues });

  const handleRegister = async (data) => {
    try {
      if (router.asPath === STUDENT_REGISTER_PATH) {
        data.role_id = ROLE_STUDENT_ID;
        data.type = '1';
        data.avatar_url = '';
        data.tutor_profile = {};
        const res = await api.post(REGISTER_PATH, data);
        if (res.status === 200) {
          enqueueSnackbar({
            message: 'Đăng ký thành công!',
            variant: 'success'
          });
          router.push(LOGIN_PATH);
        } else {
          enqueueSnackbar({
            message: 'Đăng ký thất bại!',
            variant: 'error'
          });
        }
      } else if (router.asPath === TEACHER_REGISTER_PATH) {
        const payload = {
          email: data.email,
          last_name: data.last_name,
          first_name: data.first_name,
          password: data.password,
          phone_number: data.phone_number,
          gender: data.gender,
          role_id: ROLE_TEACHER_ID,
          file: data.avatar_url,
          type: '0',
          tutor_profile: {
            stripe_account_id: data.stripe_account_id,
            description: data.description
          }
        };
        const res = await api.post(REGISTER_PATH, payload);
        if (res.status === 200) {
          enqueueSnackbar({
            message: 'Đăng ký thành công!',
            variant: 'success'
          });
          router.push(LOGIN_PATH);
        } else {
          enqueueSnackbar({
            message: 'Đăng ký thất bại!',
            variant: 'error'
          });
        }
      }
    } catch (error) {
      enqueueSnackbar({
        message: 'Đăng ký thất bại!',
        variant: 'error'
      });
    }
  };

  const isTutor = useMemo(() => {
    return router.asPath === TEACHER_REGISTER_PATH;
  }, [router.asPath]);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Image
          alt="ETH"
          src="https://i.imgur.com/frEuf3a.png"
          height={48}
          width={48}
        />
        <Typography component="h1" variant="h5">
          ez Gia sư
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleRegister)}
          encType="multipart/form-data"
          sx={{
            mt: 1,
            width: 400
          }}
        >
          <ControlTextField
            control={control}
            name="email"
            label="Email đăng nhập"
            required
            textfieldProps={{
              size: 'medium',
              error: Boolean(errors.email),
              helperText: errors.email?.message || ''
            }}
          />
          <ControlTextField
            control={control}
            name="password"
            label="Mật khẩu"
            required
            textfieldProps={{
              type: 'password',
              size: 'medium',
              error: Boolean(errors.password),
              helperText: errors.password?.message || ''
            }}
          />
          <ControlTextField
            control={control}
            name="confirmPassword"
            label="Xác Nhận Mật Khẩu"
            required
            textfieldProps={{
              type: 'password',
              size: 'medium',
              error: Boolean(errors.confirmPassword),
              helperText: errors.confirmPassword?.message || ''
            }}
          />
          <ControlTextField
            control={control}
            name="phone_number"
            label="Số điện thoại"
            required
            textfieldProps={{
              size: 'medium',
              error: Boolean(errors.phone_number),
              helperText: errors.phone_number?.message || ''
            }}
          />
          <ControlTextField
            control={control}
            name="first_name"
            label="Tên"
            required
            textfieldProps={{
              size: 'medium',
              error: Boolean(errors.first_name),
              helperText: errors.first_name?.message || ''
            }}
          />
          <ControlTextField
            control={control}
            name="last_name"
            label="Họ"
            textfieldProps={{
              size: 'medium'
            }}
          />

          {isTutor && (
            <ControlTextField
              control={control}
              name="stripe_account_id"
              label="Tài khoản ngân hàng"
              textfieldProps={{
                type: 'number'
              }}
            />
          )}

          {isTutor && (
            <ControlTextField
              control={control}
              name="description"
              label="Mô tả về bản thân"
              textfieldProps={{
                multiline: true,
                rows: 5
              }}
            />
          )}

          <FormControl>
            <FormLabel>Giới tính</FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              name="gender"
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Nữ"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Nam"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng ký
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
