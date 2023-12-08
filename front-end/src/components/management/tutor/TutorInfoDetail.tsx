import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  Typography,
  TextField
} from '@mui/material';
import React from 'react';

function TutorInfoDetail({ isOpen, onClose, data }) {
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
          <DialogTitle
            sx={{
              justifyContent: 'center',
              display: 'flex'
            }}
          >
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '700'
              }}
            >
              Gia sư {data?.user?.first_name}
              {data?.user?.last_name}
            </Typography>
          </DialogTitle>
          <DialogContent
            sx={{
              width: '572px'
            }}
          >
            <FormGroup>
              <Typography>
                {data?.user?.first_name} {data?.user?.last_name}
              </Typography>
              <Typography>{data?.user?.email}</Typography>
              <Typography>{data?.user?.phone_number}</Typography>
              <Typography>{data?.user?.gender === 1 ? 'Nữ' : 'Nam'}</Typography>
              <Typography>{data?.user?.first_name}</Typography>
            </FormGroup>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
}

export default TutorInfoDetail;
