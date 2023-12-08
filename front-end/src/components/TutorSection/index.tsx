import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import TutorCard from '../card/TutorCard';
import { ArrowIcon } from '../icons';

const TutorSection = () => {
  return (
    <Stack mt={3} height="80vh" width="100%">
      <Container sx={{ height: '100%' }}>
        <Stack direction="column" spacing={2} alignItems="center" height="100%">
          <Typography variant="h1">Gặp gỡ gia sư của chúng tôi</Typography>
          <Typography variant="h4">
            Chúng tôi có các gia sư hàng đầu để dạy cho bạn
          </Typography>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TutorCard />
              </Grid>
              <Grid item xs={4}>
                <TutorCard />
              </Grid>
              <Grid item xs={4}>
                <TutorCard />
              </Grid>
              <Grid item xs={4}>
                <TutorCard />
              </Grid>
              <Grid item xs={4}>
                <TutorCard />
              </Grid>
              <Grid item xs={4}>
                <TutorCard />
              </Grid>
            </Grid>
          </Box>

          <Button
            sx={{
              minWidth: 300,
              border: '2px solid #14398a',
              borderRadius: '20px',
              height: 48,

              '&:hover': {
                color: 'white',
                backgroundColor: 'primary.main',
                transition: 'all .2s linear'
              }
            }}
            endIcon={<ArrowIcon />}
            variant="outlined"
          >
            Xem tất cả gia sư
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};

export default TutorSection;
