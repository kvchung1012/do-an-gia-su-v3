import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
});

function CategoryForm({ isOpen, onSave, onClose, data }) {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: ''
    },
    
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log('Form submitted with values:', values);
    }
  });
 
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Dialog
          open={isOpen}
          onClose={onClose}
          maxWidth={'lg'}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {data?.category_id ? 'Chỉnh sửa danh mục' : 'Thêm mới danh mục'}
          </DialogTitle>
          <DialogContent sx={{
            width:'572px'
          }}>
            <FormGroup>
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('firstName')}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />

              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('lastName')}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />

              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Hủy
            </Button>
            <Button
              type='submit'
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

export default CategoryForm;
