import { COURSE_DETAIL_PATH } from '@/const';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';

const CourseCard = ({ src, title, course_id }) => {
  const router = useRouter();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        onClick={() =>
          router.push({
            pathname: COURSE_DETAIL_PATH,
            query: { id: course_id }
          })
        }
      >
        <CardMedia sx={{ height: 240 }} image={src || ''} title="haha" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;
