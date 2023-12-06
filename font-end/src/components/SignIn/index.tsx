import api from '@/api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useState } from 'react';
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

export default function SignIn() {
  const { register, handleSubmit } = useForm();
  const [wrongUserName, setWrongUserName] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const handleLogin = async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      if (response.status === 200) {
        console.log('Thành công');
      }
    } catch (error) {
      if (error.response.status === 500) {
        setWrongUserName(true);
        setWrongPassword(true);
      }
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
          onSubmit={handleSubmit(handleLogin)}
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
            autoComplete="email"
            autoFocus
            {...register('email')}
            error={wrongUserName ? true : false}
            helperText={wrongUserName && ('Sai email đăng nhập' || '')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password')}
            error={wrongPassword ? true : false}
            helperText={wrongPassword && ('Sai mật khẩu đăng nhập' || '')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/authen/register" variant="body2">
                {'Chưa có tài khoản? Đăng ký'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
