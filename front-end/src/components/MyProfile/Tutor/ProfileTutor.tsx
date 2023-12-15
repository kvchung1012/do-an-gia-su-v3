import api from '@/api';
import ControlTextField from '@/components/ControlTextField';
import { ArrowIcon, VerifyIcon } from '@/components/icons';
import { ROLE_TEACHER_ID } from '@/const';
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import TutorAvailableDate from './TutorAvailableDate';
import ControlSelect from '@/components/ControlSelect';
import CoursePanel from './Course';

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

  start_time: string;
  end_time: string;
  organization: string;
  position: string;
  description_tutor_experiences: string;

  school_name: string;
  score_url: string;
  from_year: string;
  to_year: string;
  favorite_subject: string;

  certification_name: string;
  organization_certification: string;
  award_url: string;
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
  description: '',

  start_time: '',
  end_time: '',
  organization: '',
  position: '',
  description_tutor_experiences: '',

  school_name: '',
  score_url: '',
  from_year: '',
  to_year: '',
  favorite_subject: '',

  certification_name: '',
  organization_certification: '',
  award_url: ''
};

function ProfileTutor() {
  const { handleSubmit, control, setValue, resetField } = useForm<FormData>({
    values: defaultValue
  });
  const [tutorId, setTutorId] = useState(0);
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  const [tab, setTab] = useState(0);
  const userId = router.query.id;

  const [tutorEdu, setTutorEdu] = useState<any>([]);
  const [tutorExp, setTutorExp] = useState<any>([]);
  const [tutorCer, setTutorCer] = useState<any>([]);
  const [school, setSchool] = useState<any>([]);
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    const getInfoUser = async () => {
      const token = localStorage.getItem('access_token');
      const decoded = jwtDecode<any>(token);
      try {
        const res = await api.get(`/user/get-user-info/${decoded?.user_id}`);
        const resSchool = await api.get('/school');

        setSchool(
          resSchool.data.data.map((item) => {
            return { name: item.name, id: item.school_id };
          })
        );

        if (res.status === 200) {
          setUser(res.data.data);
          const user = res.data.data;
          const tutor_profile = res.data.data.tutor_profiles[0];
          setValue('first_name', user.first_name);
          setValue('last_name', user.last_name || '');
          setValue('email', user.email);
          setValue('phone_number', user.phone_number || '');
          setValue('gender', user.gender || 'female');

          // tutor
          if (user.role_id === ROLE_TEACHER_ID) {
            setValue('balance', tutor_profile.balance || '');
            setValue(
              'stripe_account_id',
              tutor_profile.stripe_account_id || ''
            );
            setValue('description', tutor_profile.description || '');
            setTutorId(tutor_profile.tutor_profile_id);
            setVerified(
              Boolean(Number(tutor_profile.is_stripe_verified)) || false
            );

            setValue(
              'start_time',
              tutor_profile.tutor_experiences.start_time || ''
            );
            setValue(
              'end_time',
              tutor_profile.tutor_experiences.end_time || ''
            );
            setValue(
              'organization',
              tutor_profile.tutor_experiences.organization || ''
            );
            setValue(
              'position',
              tutor_profile.tutor_experiences.position || ''
            );
            setTutorEdu(tutor_profile?.tutor_educations);
            setTutorExp(
              tutor_profile?.tutor_experiences?.map((item) => {
                return {
                  organization: item.organization,
                  start_time: item.start_time,
                  end_time: item.end_time,
                  position: item.position,
                  description: item.description,
                  tutor_profile_id: tutorId
                };
              })
            );

            setTutorCer(
              tutor_profile?.tutor_certifications?.map((item) => {
                return {
                  name: item.name,
                  organization: item.organization,
                  award_url: item.award_url,
                  tutor_profile_id: tutorId
                };
              })
            );
          }
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
      const res = await api.put(`/user/update-user-info/${userId}`, data);
      if (res.status === 200) {
        enqueueSnackbar({
          message: 'Cập nhật thông tin tài khoản thành công',
          variant: 'success'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveTutorInfo = async (data) => {
    try {
      const payload = {
        stripe_account_id: data.stripe_account_id,
        balance: data.balance,
        description: data.description
      };
      const res = await api.put(`/tutor/${tutorId}`, payload);
      if (res.status === 200) {
        enqueueSnackbar({
          message: 'Cập nhật thông tin gia sư thành công',
          variant: 'success'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveExperience = async () => {
    try {
      const res = await api.put(
        `/tutor/update-tutor-experience/${tutorId}`,
        tutorExp
      );
      if (res.status === 200) {
        enqueueSnackbar({
          message: 'Cập nhật kinh nghiệm thành công',
          variant: 'success'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addCer = (data) => {
    const payload = {
      name: data.certification_name,
      organization: data.organization_certification,
      award_url: data.award_url,
      tutor_profile_id: tutorId
    };
    setTutorCer((prev) => [payload, ...prev]);
    resetField('award_url');
    resetField('organization_certification');
    resetField('certification_name');
  };

  const addExp = (data) => {
    const payload = {
      organization: data.organization,
      position: data.position,
      start_time: data.start_time,
      end_time: data.end_time,
      description: data.description_tutor_experiences,
      tutor_profile_id: tutorId
    };
    setTutorExp((prev) => [payload, ...prev]);
    resetField('organization');
    resetField('position');
    resetField('start_time');
    resetField('end_time');
    resetField('description_tutor_experiences');
  };

  const addEdu = (data) => {
    const payload = {
      school_id: data.school_name,
      from_year: data.from_year,
      to_year: data.to_year,
      score_url: data.score_url,
      favorite_subject: data.favorite_subject
    };
    setTutorEdu((prev) => [payload, ...prev]);
    resetField('school_name');
    resetField('from_year');
    resetField('to_year');
    resetField('score_url');
    resetField('favorite_subject');
  };

  const handleSaveCertificate = async () => {
    try {
      const res = await api.put(
        `/tutor/update-tutor-certifications/${tutorId}`,
        tutorCer
      );
      if (res.status === 200) {
        enqueueSnackbar({
          message: 'Cập nhật chứng chỉ gia sư thành công',
          variant: 'success'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveEdu = async () => {
    try {
      const res = await api.put(
        `/tutor/update-tutor-educations/${tutorId}`,
        tutorEdu
      );
      if (res.status === 200) {
        enqueueSnackbar({
          message: 'Cập nhật học vấn gia sư thành công',
          variant: 'success'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCer = (index) => {
    const newArray = [...tutorCer];
    newArray.splice(index, 1);
    setTutorCer(newArray);
  };

  const deleteExp = (index) => {
    const newArray = [...tutorExp];
    newArray.splice(index, 1);
    setTutorExp(newArray);
  };

  const deleteEdu = (index) => {
    const newArray = [...tutorEdu];
    newArray.splice(index, 1);
    setTutorEdu(newArray);
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
      sx={{
        minHeight: '600px'
      }}
    >
      <Box sx={{ my: 3 }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Thông tin tài khoản" />
          {Boolean(tutorId) === true && <Tab label="Thông tin gia sư" />}
          {Boolean(tutorId) === true && <Tab label="Kinh nghiệm - học vấn" />}
          {Boolean(tutorId) === true && <Tab label="Thời gian dạy" />}
          {Boolean(tutorId) === true && <Tab label="Khóa học" />}
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
            <ControlTextField
              control={control}
              name="stripe_account_id"
              label="Tài khoản ngân hàng"
              textfieldProps={{
                InputProps: {
                  endAdornment: (
                    <InputAdornment sx={{ mx: 0 }} position="start">
                      {verified && (
                        <VerifyIcon
                          sx={{
                            color: '#4caf50'
                          }}
                        />
                      )}
                    </InputAdornment>
                  )
                }
              }}
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
                onClick={handleSubmit(handleSaveTutorInfo)}
              >
                Lưu
              </Button>
            </Box>
          </Box>
        </Card>
      </CustomTabPanel>

      <CustomTabPanel index={2}>
        <Card
          sx={{
            background: 'white',
            py: '1rem',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            px: '3rem',
            mb: 3
          }}
        >
          <h3>Thông tin kinh nghiệm</h3>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ControlTextField
                control={control}
                name="organization"
                label="Công ty đang làm việc"
              />
            </Grid>
            <Grid item xs={12}>
              <ControlTextField
                control={control}
                name="position"
                label="Vị trí"
              />
            </Grid>

            <Grid item xs={6}>
              <ControlTextField
                control={control}
                name="start_time"
                label="Thời gian bắt đầu"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlTextField
                control={control}
                name="end_time"
                label="Thời gian kết thúc"
              />
            </Grid>

            <Grid item xs={12}>
              <ControlTextField
                control={control}
                name="description_tutor_experiences"
                label="Mô tả công việc"
              />
            </Grid>
          </Grid>
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
              onClick={handleSubmit(addExp)}
            >
              Thêm mới
            </Button>
          </Box>

          {tutorExp?.map((x, i) => (
            <Box mt={2} key={i}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography variant="h4">{x?.organization}</Typography>
                  <Typography variant="h6">
                    {x?.start_time} - {x?.end_time || 'Hiện tại'}
                  </Typography>
                  <Typography variant="subtitle2">{x?.position}</Typography>
                  <Typography variant="subtitle2">{x?.description}</Typography>
                </Box>
                <Button onClick={() => deleteExp(i)}>Xoá</Button>
              </Stack>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}

          {Boolean(tutorExp.length) && (
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
                onClick={handleSaveExperience}
              >
                Lưu
              </Button>
            </Box>
          )}
        </Card>

        <Card
          sx={{
            background: 'white',
            py: '1rem',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            px: '3rem',
            mb: 3
          }}
        >
          <h3>Thông tin học vấn</h3>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ControlSelect
                label="Quyền truy cập"
                control={control}
                name="school_name"
                list={school}
              />
            </Grid>

            <Grid item xs={12}>
              <ControlTextField
                control={control}
                name="score_url"
                label="Bằng tốt nghiệp"
              />
            </Grid>

            <Grid item xs={6}>
              <ControlTextField
                control={control}
                name="from_year"
                label="Năm bắt đầu"
              />
            </Grid>
            <Grid item xs={6}>
              <ControlTextField
                control={control}
                name="to_year"
                label="Năm kết thúc"
              />
            </Grid>

            <Grid item xs={12}>
              <ControlTextField
                control={control}
                name="favorite_subject"
                label="Môn học yêu thích"
              />
            </Grid>
          </Grid>
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
              onClick={handleSubmit(addEdu)}
            >
              thêm mới
            </Button>
          </Box>

          {tutorEdu?.map((x, i) => (
            <Box mt={2} key={i}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography variant="h6">
                    {x?.from_year} - {x?.to_year || 'Hiện tại'}
                  </Typography>
                  <Box marginLeft={3}>
                    <Typography variant="h4">
                      {x?.school?.name || 'THPT Duy Tân'}
                    </Typography>

                    <Typography variant="subtitle2">{x?.score_url}</Typography>

                    <Typography variant="subtitle2">
                      {x?.favorite_subject}
                    </Typography>
                  </Box>
                </Box>
                <Button onClick={() => deleteEdu(i)}>Xoá</Button>
              </Stack>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}

          {Boolean(tutorEdu.length) && (
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
                onClick={handleSaveEdu}
              >
                Lưu
              </Button>
            </Box>
          )}
        </Card>

        <Card
          sx={{
            background: 'white',
            py: '1rem',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            px: '3rem',
            mb: 3
          }}
        >
          <h3>Thông tin chứng chỉ</h3>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ControlTextField
                control={control}
                name="certification_name"
                label="Chứng chỉ"
              />
            </Grid>

            <Grid item xs={12}>
              <ControlTextField
                control={control}
                name="organization_certification"
                label="Năm"
              />
            </Grid>
            <Grid item xs={12}>
              <ControlTextField
                control={control}
                name="award_url"
                label="Đường dẫn chứng chỉ"
              />
            </Grid>
          </Grid>

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
              onClick={handleSubmit(addCer)}
            >
              Thêm mới
            </Button>
          </Box>

          <Divider sx={{ mt: 4 }} />
          {tutorCer.map((x, i) => (
            <Box mt={2} key={i}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Box>
                  <Typography variant="h4">{x?.name}</Typography>
                  <Typography variant="subtitle2">{x?.organization}</Typography>
                  <Typography variant="subtitle2">{x?.award_url}</Typography>
                </Box>
                <Button onClick={() => deleteCer(i)}>Xoá</Button>
              </Stack>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}

          {Boolean(tutorCer.length) && (
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
                onClick={handleSaveCertificate}
              >
                Lưu
              </Button>
            </Box>
          )}
        </Card>
      </CustomTabPanel>

      <CustomTabPanel index={3}>
        <TutorAvailableDate userId={user.user_id} />
      </CustomTabPanel>

      <CustomTabPanel index={4}>
        <Card
          sx={{
            background: 'white',
            py: '1rem',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            px: '3rem',
            mb: 3
          }}
        >
          <CoursePanel />
        </Card>
      </CustomTabPanel>
    </Box>
  );
}

export default ProfileTutor;
