import { Box, Button, Card, Container, styled } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FC, ReactNode } from 'react';
import Link from 'src/components/Link';

interface BaseLayoutProps {
  children?: ReactNode;
}

export const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
`
);

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
  const loginPath = router.asPath === '/authen/login';

  return (
    <OverviewWrapper>
      <Head>
        <title>Ez Gia sư</title>
      </Head>
      <HeaderWrapper>
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
            <Button
              component={Link}
              href={loginPath ? '/authen/register' : '/authen/login'}
              variant="contained"
            >
              {loginPath ? 'Đăng ký' : 'Đăng nhập'}
            </Button>
          </Box>
        </Container>
      </HeaderWrapper>
      <Container>{children}</Container>
    </OverviewWrapper>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export default BaseLayout;
