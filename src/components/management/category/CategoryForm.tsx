import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box
} from '@mui/material';
import React from 'react';

function CategoryForm({ isOpen, onSave, onClose, data }) {

  const handleSubmit = (e)=>{
    console.log(e)
  }
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth={'lg'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {data?.category_id?"Chỉnh sửa danh mục":"Thêm mới danh mục"}
        </DialogTitle>
        <DialogContent>
          <Box>
            
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='secondary'>Disagree</Button>
          <Button onClick={handleSubmit} color='primary' variant='contained' autoFocus>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CategoryForm;
