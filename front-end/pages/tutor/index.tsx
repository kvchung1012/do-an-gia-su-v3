import BaseLayout from '@/layouts/BaseLayout';
import { Container, Stack } from '@mui/material';

const Tutor = () => {
  return (
    <Container>
      <Stack height="100%">trang list tutor</Stack>
    </Container>
  );
};

export default Tutor;
Tutor.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
