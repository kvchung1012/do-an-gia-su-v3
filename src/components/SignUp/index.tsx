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
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit } = useForm();
  const handleRegister = async (data) => {
    console.log(data);
    // try {
    //   const response = await api.post('/auth/login', data);
    //   if (response.status === 200) {
    //     console.log('Thành công');
    //   }
    // } catch (error) {
    //   if (error.response.status === 500) {
    //     setWrongUserName(true);
    //     setWrongPassword(true);
    //   }
    // }
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
          noValidate
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Số điện thoại"
            {...register('last_name')}
          />
          <TextField
            margin="normal"
            required
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
          />
          <FormControl>
            <FormLabel>Giới tính</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
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
