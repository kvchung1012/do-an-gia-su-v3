import api from '@/api';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  TextField,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { Typography } from 'antd';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Tên danh mục không được trống'),
  description: yup.string().nullable()
});

function CourseFormAdd({ isOpen, onClose, data, onSave }) {
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [fileUrl, setFileUrl] = useState(data?.image_url);
  const getCategory = () => {
    api.get('/category').then((res) => {
      setCategoryList(res.data.data);
    });
  };
  useEffect(() => {
    getCategory();
  }, []);

  const formik = useFormik({
    initialValues: {
      ...data,
      image_url: fileUrl
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!formik.isValid) {
        return;
      }
      onSave({ ...data, ...values, image_url: fileUrl });
    }
  });

  const handleUploadFile = async (e) => {
    var formData = new FormData();
    formData.append('file', e.target.files[0]);
    const res = await api.post('upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    enqueueSnackbar({
      message: 'Tải file thành công!',
      variant: 'success'
    });

    setFileUrl(res.data?.data?.file);
  };

  return (
    <div>
      <form>
        <Dialog
          open={isOpen}
          onClose={onClose}
          maxWidth={'lg'}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {data?.category_id ? 'Chỉnh sửa khóa học' : 'Thêm mới khóa học'}
          </DialogTitle>
          <DialogContent
            sx={{
              width: '572px'
            }}
          >
            <FormGroup sx={{ mt: 2, mb: 1 }}>
              <TextField
                id="name"
                label="Tiêu đề"
                variant="standard"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('name')}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <Box mt={2}>
                <input type="file" onChange={(e) => handleUploadFile(e)} />
              </Box>

              <TextField
                id="description"
                label="Mô tả"
                variant="standard"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('description')}
              />
              <TextField
                id="price"
                label="Học phí"
                variant="standard"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('price')}
              />
              <TextField
                id="spend_time"
                label="Số giờ/buổi"
                variant="standard"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('spend_time')}
              />
              <Typography>Loại danh mục</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Loại danh mục"
                {...formik.getFieldProps('category_id')}
              >
                {categoryList?.map((item) => {
                  return (
                    <MenuItem key={item.category_id} value={item.category_id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Hủy
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={formik.submitForm}
            >
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}

export default CourseFormAdd;
