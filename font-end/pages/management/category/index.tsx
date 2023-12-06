import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid, Container, Box, IconButton , Checkbox} from '@mui/material';

import { ProColumns } from '@ant-design/pro-table';
import MyTable from 'pages/components/table';
import { useState } from 'react';
import CategoryForm from '@/components/management/category/CategoryForm';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

function ApplicationsTransactions() {

  const[isOpenForm, setIsOpenForm] = useState(false)

  const columns: ProColumns<any>[] = [
    {
      width: 20,
      fixed: 'left',
      align:'center',
      render:(_,row)=><Checkbox size='small'/>
    },
    {
      title: 'Danh mục',
      dataIndex: 'name',
      width: 200,
      fixed: 'left',
      sorter: true,
      render: (dom, entity) => { // dom là field name (dataIndex), entity là cả row
        return <a style={{ fontWeight: '500' }}>{dom}</a>;
      }
    },
    {
      width: 150,
      title: 'Hình ảnh',
      dataIndex: 'image_url',
      fixed: 'left',
    },
    {
      width: 300,
      title:'Mô tả',
      dataIndex: 'description',
      sorter: true,
    },
    {
      width: 100,
      title:'Action',
      align:'right',
      dataIndex: 'Action',
      fixed:'right',
      render:(_,row)=><>
        <Box sx={{display:'flex', justifyContent:'end'}}>
          <IconButton aria-label="delete" color='secondary' size='small'>
            <EditIcon fontSize='small' />
          </IconButton>
          <IconButton aria-label="delete" color='error' size='small'>
            <DeleteOutlineIcon fontSize='small' />
          </IconButton>
        </Box>
      </>
    }
  ];

  const handleSaveData = (e)=>{
    console.log(e)
  }

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
              rowKey="category_id"
              url={'category'}
              columns={columns}
              createText={'Thêm mới'}
              onCreateData={()=>setIsOpenForm(true)}
            />
          </Grid>
        </Grid>
      </Container>

      {
        isOpenForm &&
        <CategoryForm data={null} isOpen={isOpenForm} onClose={()=>setIsOpenForm(false)} onSave={handleSaveData} key={''}/>
      }
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
