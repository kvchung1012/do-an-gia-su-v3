import api from '@/api';
import ControlTextField from '@/components/ControlTextField';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  phone_number: string;
  gender: string;
  balance: string;
  stripe_account_id: string;
  description: string;
};

const defaultValue = {
  last_name: '',
  first_name: '',
  email: '',
  password: '',
  phone_number: '',
  gender: 'female',
  balance: '',
  stripe_account_id: '',
  description: ''
};

function ProfileTutor() {
  const { handleSubmit, control, setValue } = useForm<FormData>({
    values: defaultValue
  });

  const [tab, setTab] = useState(0);
  const userId = 'e5a096df-b351-452c-a004-142b0ae7124b';

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const res = await api.get(`/user/get-user-info/${userId}`);

        if (res.status === 200) {
          const user = res.data.data;
          const tutor_profile = res.data.data.tutor_profiles[0];
          setValue('first_name', user.first_name);
          setValue('last_name', user.last_name || '');
          setValue('email', user.email);
          setValue('phone_number', user.phone_number || '');
          setValue('gender', user.gender || 'female');

          // tutor
          setValue('balance', tutor_profile.balance || '');
          setValue('stripe_account_id', tutor_profile.stripe_account_id || '');
          setValue('description', tutor_profile.description || '');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getInfoUser();
  }, []);

  const handleChange = (_, value) => {
    setTab(value);
  };

  const handleSaveInfo = async (data) => {
    try {
      const res = api.put(`/user/update-user-info/${userId}`, data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
    <Box
      component="form"
      // onSubmit={handleSubmit(handleSaveInfo)}
    >
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
            px: '3rem',
            width: '100%',
            height: '100vh'
          }}
        >
          <h3>Thông tin tài khoản</h3>
          <Box>
            <ControlTextField
              control={control}
              name="first_name"
              label="Tên gia sư"
            />
            <ControlTextField
              control={control}
              name="last_name"
              label="Họ gia sư"
            />
            <ControlTextField control={control} name="email" label="email" />
            <ControlTextField
              control={control}
              name="phone_number"
              label="Số điện thoại"
            />
            <Box sx={{ mt: 3 }}>
              <FormControl>
                <FormLabel>Giới tính</FormLabel>

                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="gender"
                  defaultValue="female"
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Nữ"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Nam"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Box>
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              <Button
                onClick={handleSubmit(handleSaveInfo)}
                color="primary"
                variant="contained"
              >
                Lưu
              </Button>
            </Box>
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
            {/* <TextField
              id="stripe_account_id"
              label="Tài khoản ngân hàng"
              variant="standard"
              fullWidth
              margin="normal"
              // {...formikProfile.getFieldProps('stripe_account_id')}
              // error={
              //   formikProfile.touched['stripe_account_id'] &&
              //   Boolean(formikProfile.errors['stripe_account_id'])
              // }
              // helperText={
              //   formikProfile.touched['stripe_account_id'] &&
              //   formikProfile.errors['stripe_account_id']
              // }
              // InputProps={{
              //   endAdornment: (
              //     <InputAdornment position="end">
              //       <CheckCircleIcon
              //         color={
              //           tutor?.tutor_profile?.is_stripe_verified
              //             ? 'success'
              //             : 'secondary'
              //         }
              //       />
              //     </InputAdornment>
              //   )
              // }}
            /> */}

            <ControlTextField
              control={control}
              name="stripe_account_id"
              label="Tài khoản ngân hàng"
            />

            <ControlTextField control={control} name="balance" label="Số dư" />

            <ControlTextField
              control={control}
              name="description"
              label="Mô tả về bản thân"
              textfieldProps={{
                multiline: true,
                rows: 5
              }}
            />

            {/* <TextField
              id="description"
              label="Mô tả về bản thân"
              variant="standard"
              fullWidth
              margin="normal"
              multiline
              rows={5}
              // {...formikProfile.getFieldProps('description')}
              // error={
              //   formikProfile.touched['description'] &&
              //   Boolean(formikProfile.errors['description'])
              // }
              // helperText={
              //   formikProfile.touched['description'] &&
              //   formikProfile.errors['description']
              // }
            /> */}

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit(handleSaveInfo)}
              >
                Lưu
              </Button>
            </Box>
          </Box>
        </Card>
      </CustomTabPanel>
    </Box>
  );
}

export default ProfileTutor;
