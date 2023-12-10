import { Avatar, Grid, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import SendCommentTextFiled from './SendCommentTextFiled';
import UserComment from './UserComment';

const UserCommentSection = () => {
  // const router = useRouter();
  // const { commentList } = useAppSelector((state) => state.commentReducer);
  // const { userInfo } = useAppSelector((state) => state.loginReducer);
  // const { categoryId } = useAppSelector((state) => state.bookReducer);
  // const documentId = takeLastSlug(router.query.id);
  const { handleSubmit, control } = useForm();
  const [commentRely, setCommentRely] = useState<any>(null);

  const handleSubmitForm = (comment) => {
    console.log(comment);
  };

  const handleCommentReply = useCallback(
    (comment?: any) => {
      if (comment) {
        if (commentRely?.id === comment?.id) {
          setCommentRely(null);
        } else {
          setCommentRely(comment);
        }
        return;
      }
      setCommentRely(null);
    },
    [commentRely]
  );

  return (
    <Grid container mt={10}>
      <Grid
        borderBottom="1px solid "
        borderColor="grey.300"
        item
        xs={12}
        display="flex"
        justifyContent="space-between"
      >
        <Typography pb={1} variant="h2" lineHeight="32px">
          Bình luận
        </Typography>
      </Grid>
      <Grid
        component="form"
        onSubmit={handleSubmit(handleSubmitForm)}
        display="flex"
        flexDirection="row"
        gap="30px"
        alignItems="center"
        item
        xs={12}
        mt={2.8}
        mb={2.8}
        pl={2.8}
      >
        <Avatar src="/static/images/avatars/1.jpg" />

        <SendCommentTextFiled
          control={control}
          name="comment"
          variant="outlined"
        />
      </Grid>

      <Grid
        item
        xs={12}
        display="flex"
        flexDirection="row"
        gap="64px"
        border="1px solid"
        borderColor="grey.300"
        borderRadius="12px"
        mb={2.8}
      >
        <UserComment
          data={{}}
          commentRely={commentRely}
          onCommentReply={handleCommentReply}
        />
      </Grid>
    </Grid>
  );
};

export default UserCommentSection;