import api from '@/api';
import {
  Box,
  Button,
  Card,
  FormGroup,
  InputAdornment,
  Switch,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import jwt_decode from 'jwt-decode';

const validationSchema = yup.object({
  // name: yup.string().required('Tên danh mục không được trống'),
  // description: yup.string().nullable()
});

function ProfileTutor() {
  const userId = '5cb003c7-5133-47a7-bc28-0c4598fae73c';
  const [tutor, setTutor] = useState<any>();

  const [tab, setTab] = useState(0);

  const formik = useFormik({
    initialValues: {
      ...tutor
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!formik.isValid) {
        return;
      }

      // onSave({...data,...values})
    }
  });

  const formikProfile = useFormik({
    initialValues: {
      ...tutor?.tutor_profile
    },
    onSubmit: (values) => {
      if (!formikProfile.isValid) {
        return;
      }

      // onSave({...data,...values})
    }
  });

  useEffect(() => {
    api.get(`/tutor/get-tutor-by-userId/${userId}`).then((res) => {
      setTutor(res.data.data);
      formik.setValues(res.data.data);
      formikProfile.setValues({...res.data.data?.tutor_profiles[0]});
    });
  }, []);

  const handleChange = (_ , value) => {
    setTab(value);
  };

  function CustomTabPanel(props: any) {
    const { children, index, ...other } = props;

    return (
      <Box role="tabpanel" hidden={tab !== index} {...other}>
        {tab === index && <Box>{children}</Box>}
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Thông tin tài khoản" />
          <Tab label="Thông tin gia sư" />
        </Tabs>
      </Box>

      {/* thông tin tài khoản */}
      <CustomTabPanel index={0}>
        <Card
          sx={{
            background: 'white',
            py: '1rem',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            px: '3rem'
          }}
        >
          <h3>Thông tin tài khoản</h3>
          <Box>
            <form>
              <FormGroup>
                <TextField
                  id="firstName"
                  label="Tên gia sư"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps('first_name')}
                  error={
                    formik.touched['first_name'] &&
                    Boolean(formik.errors['first_name'])
                  }
                  helperText={
                    formik.touched['first_name'] && formik.errors['first_name']
                  }
                />

                <TextField
                  id="firstName"
                  label="Tên gia sư"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps('last_name')}
                  error={
                    formik.touched['last_name'] &&
                    Boolean(formik.errors['last_name'])
                  }
                  helperText={
                    formik.touched['last_name'] && formik.errors['last_name']
                  }
                />

                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps('email')}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <Box sx={{ mt: 3 }}>
                  <label>Giới tính:</label>
                  <Switch
                    {...formik.getFieldProps('gender')}
                    onChange={(e) =>
                      formik.setFieldValue('gender', e.target.value)
                    }
                  />
                  {formik.getFieldProps('gender').value == '1' ? 'Nam' : 'Nữ'}
                </Box>

                <TextField
                  id="phone"
                  label="Phone"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...formik.getFieldProps('phone')}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </FormGroup>

              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'end'
                }}
              >
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={formik.submitForm}
                >
                  Lưu
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      </CustomTabPanel>

      {/* thông tin gia sư */}
      <CustomTabPanel index={1}>
        <Card
          sx={{
            background: 'white',
            py: '1rem',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            px: '3rem'
          }}
        >
          <h3>Thông tin gia sư</h3>
          <Box>
            <form>
              <FormGroup>
              <TextField
                  id="stripe_account_id"
                  label="Tài khoản ngân hàng"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...formikProfile.getFieldProps('stripe_account_id')}
                  error={
                    formikProfile.touched['stripe_account_id'] &&
                    Boolean(formikProfile.errors['stripe_account_id'])
                  }
                  helperText={
                    formikProfile.touched['stripe_account_id'] && formikProfile.errors['stripe_account_id']
                  }

                  InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <CheckCircleIcon color={tutor?.tutor_profile?.is_stripe_verified?'success':'secondary'} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  id="balance"
                  label="Số dư"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  {...formikProfile.getFieldProps('balance')}
                  
                  disabled
                />

                <TextField
                  id="description"
                  label="Mô tả về bản thân"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={5}
                  {...formikProfile.getFieldProps('description')}
                  error={
                    formikProfile.touched['description'] &&
                    Boolean(formikProfile.errors['description'])
                  }
                  helperText={
                    formikProfile.touched['description'] && formikProfile.errors['description']
                  }
                />
              </FormGroup>

              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'end'
                }}
              >
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={formik.submitForm}
                >
                  Lưu
                </Button>
              </Box>
            </form>
          </Box>
        </Card>
      </CustomTabPanel>
    </>
  );
}

export default ProfileTutor;
