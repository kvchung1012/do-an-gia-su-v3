import api from '@/api';
import ControlTextField from '@/components/ControlTextField';
import TutorDetailCard from '@/components/card/TutorDetailCard';
import BaseLayout from '@/layouts/BaseLayout';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
}

const defaultValues = {
  name: ''
};

const Tutor = () => {
  const { handleSubmit, watch, control } = useForm<FormData>({
    defaultValues
  });

  const searchKey = watch('name');
  const [tutorList, setTutorList] = useState([]);
  const [tutorListRoot, setTutorListRoot] = useState([]);

  const handleFilter = () => {
    let lists = [...tutorListRoot];
    if (searchKey) {
      console.log(searchKey);

      lists = lists.filter(
        (x) =>
          x?.user?.first_name?.includes(searchKey) ||
          x?.user?.last_name?.includes(searchKey) ||
          x?.user?.email?.includes(searchKey)
      );
      setTutorList(lists);
    } else {
      setTutorList(tutorListRoot);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [searchKey]);

  useEffect(() => {
    const getTutor = async () => {
      try {
        const res = await api.get('/tutor');
        if (res.status === 200) {
          setTutorList(res.data.data);
          setTutorListRoot(res.data.data);
        }
      } catch (error) {}
    };

    getTutor();
  }, []);

  return (
    <Container sx={{ minHeight: '100vh' }}>
      <Stack
        component="form"
        onSubmit={handleSubmit(handleFilter)}
        height="100%"
        mt={2}
        spacing={2}
      >
        <Typography variant="h1">Tất cả gia sư</Typography>
        <Grid container gap={2}>
          <Grid item xs={4}>
            <ControlTextField
              control={control}
              label="Tên gia sư"
              name="name"
              textfieldProps={{
                size: 'medium',
                placeholder: 'Tìm kiếm gia sư',
                autoComplete: 'off',
                margin: 'none'
              }}
            />
          </Grid>
          {/* <Grid item xs={4}>
            <Box>
              <InputLabel
                sx={{
                  '&': {
                    mb: 0.5
                  }
                }}
              >
                Chọn khóa học
              </InputLabel>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth placeholder="Khóa học" />
                )}
              />
            </Box>
          </Grid> */}
        </Grid>

        {tutorList.map((item) => (
          <TutorDetailCard key={item.tutor_profile_id} data={item} />
        ))}
      </Stack>
    </Container>
  );
};

export default Tutor;
Tutor.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

const top100Films = [
  { label: 'Tiếng việt', year: 1994 },
  { label: 'Tiếng anh', year: 1972 },
  { label: 'Toán Học', year: 1974 },
  { label: 'Ngữ Văn', year: 2008 },
  { label: 'Hóa Học', year: 1957 },
  { label: 'Địa Lý', year: 1993 },
  { label: 'Sinh Học', year: 1994 }
];
