import BaseLayout from '@/layouts/BaseLayout';
import { Container, Stack } from '@mui/material';
import { ReactElement } from 'react';

const Student = () => {
  return (
    <Container>
      <Stack height="100%">trang list student</Stack>
    </Container>
  );
};

export default Student;

Student.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
