import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import { ProColumns } from '@ant-design/pro-table';
import { useEffect, useState } from 'react';
import api from '@/api';
import MyTable from 'pages/components/table';

function ApplicationsTransactions() {
  const [data, setData] = useState([]);

  const columns: ProColumns<any>[] = [
    {
      title: 'Danh mục',
      dataIndex: 'name',
      width: 250,
      fixed: 'left',
      render: (dom, entity) => { // dom là field name (dataIndex), entity là cả row
        return <a style={{ fontWeight: '500' }}>{dom}</a>;
      }
    },
    {
      width: 250,
      title: 'Demo',
      dataIndex: 'desc',
      valueType: 'textarea'
    },
    {
      width: 250,
      title:'Mô tả',
      dataIndex: 'description',
      sorter: true,
    },
    {
      width: 250,
      title:'Mô tả',
      dataIndex: 'Action',
      sorter: true,
    }
  ];

  useEffect(() => {
    api.get('category').then((res) => {
      setData(res.data?.data)
    });
  }, []);

  return (
    <>
      <Head>
        <title>Transactions - Applications</title>
      </Head>
      <Container
        maxWidth="lg"
        sx={{
          mt: 3
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <MyTable
              title={'Danh sách danh mục'}
              rowKey="id"
              url={'category'}
              columns={columns}
              createText={'Thêm mới'}
              onCreateData={()=>console.log('create popup')}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
