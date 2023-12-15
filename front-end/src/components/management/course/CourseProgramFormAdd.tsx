import ControlTextField from '@/components/ControlTextField';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  TextField,
  Box
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Tên danh mục không được trống'),
  description: yup.string().nullable()
});

type FormData = {
  title: string;
  description: string;
};

const defaultValues = {
  title: '',
  description: ''
};

function CourseProgramFormAdd({ isOpen, onClose, data, control }) {
  // const formik = useFormik({
  //   initialValues: {
  //     ...data
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     console.log('ss');

  //     // const a = onSave({ ...data, ...values });
  //     console.log(values);
  //   }
  // });

  // const { control, handleSubmit } = useForm<FormData>({ defaultValues });

  const onSave = (data) => {
    console.log(data);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      // onSubmit={handleSubmit(onSave)}
      maxWidth={'lg'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {data?.course_program_id
          ? 'Chỉnh sửa chương học'
          : 'Thêm mới chương học'}
      </DialogTitle>
      <DialogContent
        sx={{
          width: '572px'
        }}
      >
        <ControlTextField control={control} name="tittle" label="Tiêu đề" />

        <ControlTextField control={control} name="description" label="Mô tả" />
        {/* <FormGroup sx={{ mt: 2, mb: 1 }}>
            <TextField
              id="tittle"
              label="Tiêu đề"
              variant="standard"
              fullWidth
              margin="normal"
              // {...formik.getFieldProps('tittle')}
              // error={formik.touched.tittle && Boolean(formik.errors.tittle)}
              // helperText={formik.touched.tittle && formik.errors.tittle}
            />

            <TextField
              id="description"
              label="Mô tả"
              variant="standard"
              fullWidth
              margin="normal"
              // {...formik.getFieldProps('description')}
            />
          </FormGroup> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          // onClick={formik.submitForm}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CourseProgramFormAdd;
