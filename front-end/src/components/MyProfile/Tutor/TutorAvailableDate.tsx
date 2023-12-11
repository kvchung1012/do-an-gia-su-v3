import api from '@/api';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { DatePicker } from '@mui/x-date-pickers';

function TutorAvailableDate({ userId }) {
  const [availableDate, setAvailableDate] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [itemSelected, setItemSelected] = useState<any>({});

  const schema: ZodType = z.object({
    email: z
      .string()
      .min(1, { message: 'Không được để trống email' })
      .email({ message: 'Không đúng dạng địa chỉ email' }),
    password: z
      .string()
      .min(1, { message: 'Không được để trống mật khẩu' })
      .min(4, { message: 'Mật khẩu ít nhất 4 ký tự' })
  });

  useEffect(() => {
    fetchData(userId);
  }, []);

  const fetchData = async (userId) => {
    var res = await api.get(`tutor-available-date/find-by-userid/${userId}`);
    setAvailableDate(res.data?.data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <><Card
      sx={{
        background: 'white',
        py: '1rem',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        px: '3rem'
      }}
    >
      <Box display={'flex'} justifyContent={'space-between'}>
        <h3>Thời gian dạy</h3>
        <Button variant="contained" onClick={()=>{setShowForm(true)}}>Thêm mới</Button>
      </Box>
      <Box>
        {availableDate?.map((x, index) => (
          <Box key={index}>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>{x.date}</Typography>
              <Box display={'flex'}>
                <Box
                  sx={{
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    marginTop: '8px'
                  }}
                >
                  <Box>
                    {x.start_time} - {x.end_time}
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
          </Box>
        ))}
      </Box>
    </Card>
      </> 

  );
}

export default TutorAvailableDate;
