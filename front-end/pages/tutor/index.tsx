import api from '@/api';
import ControlTextField from '@/components/ControlTextField';
import FormControlDatePicker from '@/components/Date-picker/FormControlDatePicker';
import TutorDetailCard from '@/components/card/TutorDetailCard';
import BaseLayout from '@/layouts/BaseLayout';
import {
  Autocomplete,
  Box,
  Container,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
}

const defaultValues = {
  name: ''
};

const Tutor = () => {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues
  });

  const [tutorList, setTutorList] = useState([]);

  const handleFilter = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const getTutor = async () => {
      try {
        const res = await api.get('/tutor');
        if (res.status === 200) {
          setTutorList(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
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
        <Grid container columnSpacing={2}>
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
          <Grid item xs={4}>
            <FormControlDatePicker
              label="Thời gian rảnh"
              name="available_date"
              control={control}
            />
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
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
