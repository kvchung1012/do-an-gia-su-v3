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
import { LockOpen, Mail, Person, Phone, VpnKey } from '@mui/icons-material';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

type FormData = {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone_number: string;
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
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleRegister = async (data) => {
    if (router.asPath === STUDENT_REGISTER_PATH) {
      data.role_id = ROLE_STUDENT_ID;
    } else if (router.asPath === TEACHER_REGISTER_PATH) {
      data.role_id = ROLE_TEACHER_ID;
    }

    try {
      const res = await api.post(REGISTER_PATH, data);

      if (res.status === 200) {
        enqueueSnackbar({
          message: 'Đăng ký thành công!',
          variant: 'success'
        });
        router.push(LOGIN_PATH);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
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
          // noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email đăng nhập"
            name="email"
            autoFocus
            error={!!errors['email']}
            autoComplete="off"
            helperText={errors['email'] ? errors['email'].message : ''}
            {...register('email')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            {...register('password')}
            error={!!errors['password']}
            helperText={errors['password'] ? errors['password'].message : ''}
          />
          <TextField
            label="Xác Nhận Mật Khẩu"
            fullWidth
            required
            margin="normal"
            type="password"
            {...register('confirmPassword')}
            error={!!errors['confirmPassword']}
            helperText={
              errors['confirmPassword'] ? errors['confirmPassword'].message : ''
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Số điện thoại"
            {...register('phone_number')}
            error={!!errors['phone_number']}
            helperText={
              errors['phone_number'] ? errors['phone_number'].message : ''
            }
          />
          <TextField
            margin="normal"
            fullWidth
            label="Họ"
            {...register('last_name')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Tên"
            {...register('first_name')}
            helperText={
              errors['first_name'] ? errors['first_name'].message : ''
            }
            error={!!errors['first_name']}
          />
          <FormControl>
            <FormLabel>Giới tính</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio />} label="Nữ" />
              <FormControlLabel value="male" control={<Radio />} label="Nam" />
            </RadioGroup>
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
