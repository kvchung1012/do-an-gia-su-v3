import Footer from '@/components/Footer';
import {
  LOGIN_PATH,
  LOGOUT_PATH,
  MY_PROFILE_PATH,
  REGISTER_PATH
} from '@/const';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Popover,
  Stack,
  Typography,
  styled
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FC, ReactNode, useEffect, useState } from 'react';
import Link from 'src/components/Link';

interface BaseLayoutProps {
  children?: ReactNode;
}

export const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const router = useRouter();
  const loginPath = router.asPath === LOGIN_PATH;
  const [isShowAvatar, setIsShowAvatar] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const avatar_url = localStorage.getItem('avatar_url');
    if (access_token) {
      setIsShowAvatar(avatar_url);
    }
  }, [router.asPath]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    router.push(LOGOUT_PATH);
  };

  return (
    <OverviewWrapper>
      <Head>
        <title>Ez Gia sư</title>
      </Head>
      <Stack justifyContent="space-between" mt="88px">
        <AppBar
          sx={{
            height: 88,
            backgroundColor: 'common.white',
            boxShadow: '0px 2px 4px -1px rgba(57,76,96,.15)',
            transition: 'top 0.3s ease-in-out, opacity 0.3s ease-in-out',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Container maxWidth="lg">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Image
                alt="ETH"
                src="https://i.imgur.com/frEuf3a.png"
                height={48}
                width={48}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/')}
              />
              {isShowAvatar ? (
                <>
                  <Avatar
                    alt="Remy Sharp"
                    src={'/static/images/avatars/2.jpg'}
                    sx={{ width: 48, height: 48, cursor: 'pointer' }}
                    onClick={handlePopoverOpen}
                  />
                  <Popover
                    id="mouse-over-popover"
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                    sx={{
                      marginTop: '8px',

                      '&& .MuiBackdrop-invisible ': {
                        backdropFilter: 'unset'
                      }
                    }}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    <Typography
                      sx={{
                        width: '186px',
                        height: '40px',
                        padding: '12px 0 12px 20px',
                        cursor: 'pointer',
                        '&&:hover': {
                          backgroundColor: '#fafafa'
                        }
                      }}
                      onClick={() => router.push(MY_PROFILE_PATH)}
                      variant="h4"
                    >
                      Tài khoản của tôi
                    </Typography>

                    <Typography
                      onClick={handleClickLogout}
                      variant="h4"
                      sx={{
                        cursor: 'pointer',
                        color: 'red',
                        width: '186px',
                        height: '40px',
                        padding: '12px 0 12px 20px',
                        '&&:hover': {
                          backgroundColor: '#fafafa'
                        }
                      }}
                    >
                      Đăng xuất
                    </Typography>
                  </Popover>
                </>
              ) : (
                <Button
                  component={Link}
                  href={loginPath ? REGISTER_PATH : LOGIN_PATH}
                  variant="contained"
                >
                  {loginPath ? 'Đăng ký' : 'Đăng nhập'}
                </Button>
              )}
            </Box>
          </Container>
        </AppBar>
        {children}
        <Footer />
      </Stack>
    </OverviewWrapper>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
