import { Avatar, Card, CardContent, Typography } from '@mui/material';

const TutorCard = () => {
  return (
    <Card
      sx={{
        transition: 'transform .5s',
        borderRadius: '12px',
        width: '100%',
        height: 232,
        p: '16px',
        boxShadow: 'unset',
        border: '1px solid #DBDBDB',

        '&:hover': {
          boxShadow: '0px 0px 20px rgba(57,76,96,.15)',
          transform: 'translate(0, -4px)',
          cursor: 'pointer'
        }
      }}
    >
      <CardContent
        sx={{
          minWidth: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatars/2.jpg"
          sx={{ width: 112, height: 112 }}
        />
        <Typography
          width="100%"
          variant="h3"
          textAlign="center"
          color="text.secondary"
        >
          Nguyễn Văn A
        </Typography>

        <Typography
          width="100%"
          variant="h5"
          textAlign="center"
          color="text.secondary"
        >
          Toán, văn, sử, địa
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TutorCard;
