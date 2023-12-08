import Head from 'next/head';

import { Container , Box} from '@mui/material';

import BaseLayout from '@/layouts/BaseLayout';
import ProfileTutor from '@/components/MyProfile/Tutor/ProfileTutor';
import ProfileStudent from '@/components/MyProfile/Student/ProfileStudent';
import { FormikProvider } from 'formik';

function MyProfile() {

  const isTutor = true;

  const handleBlur = ()=>{

  }

  return (
    <>
      <Container maxWidth="xl" sx={{
        mt:10,
        background:'#dde3e9',
      }} >
        <Container maxWidth='md' 
          sx={{
            mb: 10 
          }}>
        {
          isTutor
          ?<ProfileTutor/>
          :<ProfileStudent/>
        }
       </Container> 
      </Container>
    </>
  );
}

MyProfile.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default MyProfile;
