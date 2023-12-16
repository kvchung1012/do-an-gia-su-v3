import api from '@/api';
import ControlTextField from '@/components/ControlTextField';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  content: string;
  overview_url: string;
};

const defaultValues = {
  name: '',
  content: '',
  overview_url: ''
};

function CoursePhaseFormAdd({ isOpen, onClose, data, setCount }) {
  const { control, handleSubmit, resetField } = useForm<FormData>({
    defaultValues
  });

  const onSave = async (value) => {
    const payload = {
      course_program_id: data.course_program_id,
      ...value
    };

    const res = await api.post('/course-program/phase/', payload);
    if (res.status === 200) {
      enqueueSnackbar({
        message: 'thêm chương thành công',
        variant: 'success'
      });
      setCount((prev) => prev + 1);
      onClose();
      resetField('name');
      resetField('content');
      resetField('overview_url');
    }
  };

  return (
    <Dialog
      component="form"
      open={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSave)}
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
        <ControlTextField control={control} name="name" label="Tiêu đề" />
        <ControlTextField control={control} name="content" label="Nội dung" />
        <ControlTextField
          control={control}
          name="overview_url"
          label="Link bài học"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button type="submit" color="primary" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CoursePhaseFormAdd;
