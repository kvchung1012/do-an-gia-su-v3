import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        height: 370,
        width: '100%',
        backgroundColor: 'text.primary',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container
        sx={{
          mt: 2,
          height: '90%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column'
        }}
      >
        <Grid container>
          <Grid item xs={8.9}>
            <Image
              alt="ETH"
              src="https://i.imgur.com/frEuf3a.png"
              height={164}
              width={164}
              style={{ cursor: 'pointer' }}
              onClick={() => router.push('/')}
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="center" spacing={2}>
          <Typography color="white" variant="subtitle1">
            &copy; 2023 - eZ Gia Sư create by Khuất Chung, Khuất Việt, Khuất Phú
          </Typography>
          <Typography
            sx={{
              pt: { xs: 2, md: 0 }
            }}
            variant="subtitle1"
          >
            Crafted by{' '}
            <Link
              href="https://bloomui.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              BloomUI.com
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
