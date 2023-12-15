import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';

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
}

export default function CustomizedAccordions({
  keyExpand,
  title,
  childTitle,
  setDataSelected,
  setShowForm,
  setShowConfirmDelete,
  data
}: ICustomizedAccordionsProps) {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
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
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant="h4">{title}</Typography>
        </AccordionSummary>
        <Stack spacing={1}>
          {/* <Button
            sx={{ border: '2px solid #121117' }}
            variant="contained"
            onClick={() => {
              setDataSelected(data);
              setShowForm(true);
            }}
          >
            Sửa bài học học
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setDataSelected(data);
              setShowConfirmDelete(true);
            }}
          >
            Xóa bài học học
          </Button> */}
        </Stack>
        {childTitle?.map((child, index) => {
          return (
            <AccordionDetails key={index}>
              <Typography variant="h4" mb={1}>
                {index + 1}. {child.name}
              </Typography>
              <Typography fontSize={14} mb={1} color="secondary">
                {child.content}
              </Typography>

              <video controls src={child.overview_url}></video>
            </AccordionDetails>
          );
        })}
      </Accordion>
    </div>
  );
}
