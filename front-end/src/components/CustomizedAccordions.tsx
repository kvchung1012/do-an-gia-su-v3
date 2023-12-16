import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Button, Stack } from '@mui/material';
import CourseProgramFormAdd from './management/course/CourseProgramFormAdd';
import CourseProgramFormEdit from './management/course/CourseProgramFormEdit';
import api from '@/api';
import { enqueueSnackbar } from 'notistack';
import CoursePhaseFormAdd from './management/course/CoursePhaseFormAdd';
import CoursePhaseFormEdit from './management/course/CoursePhaseFormEdit';
import PhaseCourse from './management/course/PhaseCourse';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

interface ICustomizedAccordionsProps {
  keyExpand: string;
  title: string;
  childTitle: any[];
  setDataSelected: any;
  setShowForm?: any;
  setShowConfirmDelete: any;
  data: any;
  add?: boolean;
  control?: any;
  setCount?: number;
  setOpenEdit?: any;
}

function CustomizedAccordions({
  keyExpand,
  title,
  childTitle,
  data,
  add,
  setCount
}: ICustomizedAccordionsProps) {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openPhase, setOpenPhase] = React.useState(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleDelete = async (setCount) => {
    const res = await api.delete(`/course-program/${data.course_program_id}`);
    if (res.status === 200) {
      enqueueSnackbar({
        message: 'Xóa bài thành công',
        variant: 'success'
      });
    }
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === keyExpand}
        onChange={handleChange(keyExpand)}
        sx={{
          borderRadius: '8px'
        }}
      >
        <AccordionSummary>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Typography pt={1.3} pl={1.5} variant="h4">
              {title}
            </Typography>
            {add && (
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    minHeight: '100%'
                  }}
                  onClick={() => {
                    setOpenPhase(true);
                  }}
                >
                  Thêm Chương
                </Button>
                <Button
                  sx={{
                    minHeight: '100%'
                  }}
                  onClick={() => {
                    setOpenEdit(true);
                  }}
                >
                  Sửa bài
                </Button>
                <Button
                  sx={{
                    minHeight: '100%'
                  }}
                  variant="contained"
                  onClick={() => handleDelete(setCount)}
                >
                  Xóa bài
                </Button>
              </Box>
            )}
          </Stack>
        </AccordionSummary>
        {childTitle?.map((child, index) => {
          return (
            <AccordionDetails key={index}>
              <PhaseCourse
                add={add}
                child={child}
                number={index + 1}
                setCount={setCount}
              />
            </AccordionDetails>
          );
        })}
      </Accordion>

      <CourseProgramFormEdit
        data={data}
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        setCount={setCount}
      />

      <CoursePhaseFormAdd
        data={data}
        isOpen={openPhase}
        onClose={() => setOpenPhase(false)}
        setCount={setCount}
      />
    </div>
  );
}

export default CustomizedAccordions;
