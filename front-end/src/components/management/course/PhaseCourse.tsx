import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CoursePhaseFormEdit from './CoursePhaseFormEdit';
import api from '@/api';
import { enqueueSnackbar } from 'notistack';

const PhaseCourse = ({ child, setCount, number }) => {
  const [openPhaseEdit, setOpenPhaseEdit] = useState(false);

  const handleDelete = async () => {
    const res = await api.delete(
      `/course-program/phase/${child.course_program_phase_id}`
    );
    if (res.status === 200) {
      enqueueSnackbar({
        message: 'Xoá chương thành công',
        variant: 'success'
      });
      setCount((prev) => prev + 1);
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" mb={1}>
          {number}. {child.name}
        </Typography>
        <Box>
          <Button onClick={() => setOpenPhaseEdit(true)}>Sửa Chương</Button>
          <Button variant="contained" onClick={handleDelete}>
            Xoá Chương
          </Button>
        </Box>
      </Stack>
      <Typography fontSize={14} mb={1} color="secondary">
        {child.content}
      </Typography>

      <video controls src={child.overview_url}></video>

      <CoursePhaseFormEdit
        data={child}
        isOpen={openPhaseEdit}
        onClose={() => setOpenPhaseEdit(false)}
        setCount={setCount}
      />
    </>
  );
};

export default PhaseCourse;
