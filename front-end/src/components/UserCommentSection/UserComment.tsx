import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import LikeIcon from '../icons/LikeIcon';
import ReplyIcon from '../icons/ReplyIcon';
import SendCommentTextFiled from './SendCommentTextFiled';
import AppRating from '../AppRating';

const UserComment = ({ data, onCommentReply, commentRely }) => {
  const { handleSubmit, control } = useForm();

  const handleSubmitForm = (comment) => {
    console.log(comment);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleSubmitForm)}
      width="100%"
    >
      <Stack direction="row" spacing={4} p="20px">
        <Avatar src="/static/images/avatars/3.jpg" />
        <Stack width="70%">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h4" fontWeight={500}>
              {data?.createdByName || 'Học sinh giỏi'}
            </Typography>
            <Typography variant="h5" fontWeight={500} color="secondary">
              đã đánh giá
            </Typography>
            <AppRating readOnly value={5} />
          </Stack>
          <Typography variant="h3" fontWeight={400} mt={2}>
            {data?.comment || 'Gia sư đẳng cấp quốc tế'}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
          color="text.secondary"
        >
          <Button
            sx={{ minHeight: '42px', minWidth: 120, p: 1 }}
            variant="outlined"
          >
            <LikeIcon />
            &nbsp; Hữu ích
          </Button>
          <Button
            sx={{ minHeight: '42px', minWidth: 120, p: 1 }}
            variant="outlined"
          >
            Bình luận
          </Button>
        </Stack>
      </Stack>
      {(Boolean(data?.children?.length) ||
        commentRely?.hasChildren === false) && (
        <Stack
          borderTop="1px solid"
          borderColor="grey.300"
          p="20px"
          spacing={5}
        >
          {data.id === commentRely?.id && (
            <Stack direction="row" pl={8} spacing={4}>
              <Stack direction="row" spacing={1}>
                <ReplyIcon sx={{ color: '#C0C0C0', fontSize: '16px' }} />
                <Avatar src="/static/images/avatars/2.jpg" />
              </Stack>
              <Stack alignItems="flex-end" width="100%">
                <SendCommentTextFiled
                  control={control}
                  name="comment"
                  variant="standard"
                />
                <IconButton
                  onClick={onCommentReply}
                  sx={{
                    mr: 2,
                    mt: 1
                  }}
                >
                  <Typography>hủy</Typography>
                </IconButton>
              </Stack>
            </Stack>
          )}
          {Boolean(data.children.length) &&
            data.children.map((item) => {
              return (
                <Stack key={item.id}>
                  <Stack direction="row" pl={8} spacing={4}>
                    <Stack direction="row" spacing={1}>
                      <ReplyIcon sx={{ color: '#C0C0C0', fontSize: '16px' }} />
                      <Avatar src="/static/images/avatars/3.jpg" />
                    </Stack>
                    <Stack width="70%">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="h4" fontWeight={500}>
                          {item.createdByName}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                          Haha
                        </Typography>
                      </Stack>
                      <Typography variant="h4" fontWeight={400} mt={2}>
                        {item.comment}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
        </Stack>
      )}
    </Box>
  );
};

export default memo(UserComment);
