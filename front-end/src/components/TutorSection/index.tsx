import { Container, Stack, Typography } from '@mui/material';

const TutorSection = () => {
  return (
    <Stack mt={3} height="80vh" width="100%" bgcolor="#fafafa">
      <Container sx={{ height: '100%' }}>
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          height="100%"
          bgcolor="green"
        >
          <Typography variant="h1">Gặp gỡ gia sư của chúng tôi</Typography>
          <Typography variant="h4">
            Chúng tôi có các gia sư hàng đầu để dạy cho bạn
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
};

export default TutorSection;
