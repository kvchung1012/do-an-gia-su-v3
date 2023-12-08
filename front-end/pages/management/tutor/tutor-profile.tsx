import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid, Container, Box, IconButton, Avatar } from '@mui/material';

import { ProColumns } from '@ant-design/pro-table';
import MyTable from '@/components/base/table';
import React, { useEffect, useState } from 'react';
import CategoryForm from '@/components/management/category/CategoryForm';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDeleteModal from '@/components/base/modal/ConfirmDeleteModal';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import api from '@/api';
import Image from 'next/image';

function TutorProfile() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [dataSelected, setDataSelected] = useState<any>();

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ProColumns<any>[] = [
    {
      width: 15,
      fixed: 'left',
      align: 'center',
      render: (_, row) => (
        <IconButton
          aria-label="delete"
          color="secondary"
          size="small"
          onClick={() => {
            setDataSelected(row);
            setShowForm(true);
          }}
        >
          <RemoveRedEyeIcon fontSize="small" />
        </IconButton>
      )
    },
    {
      title: 'Gia Sư',
      width: 200,
      fixed: 'left',
      sorter: true,
      render: (_, row) => <p>{row.user?.last_name}</p>
    },
    {
      width: 150,
      title: 'Ảnh đại diện',
      fixed: 'left',
      render: (_, row) =>
        row.user?.avatar_url ? (
          <Image width={20} height={20} src={row.user.avatar_url}></Image>
        ) : (
          <Avatar></Avatar>
        )
    },
    {
      width: 300,
      title: 'Mô tả',
      dataIndex: 'description',
      sorter: true
    },
    {
      width: 60,
      title: 'Action',
      align: 'center',
      dataIndex: 'Action',
      fixed: 'right',
      render: (_, row) => (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton
              aria-label="delete"
              color="secondary"
              size="small"
              onClick={() => {
                setDataSelected(row);
                setShowForm(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              aria-label="delete"
              color="error"
              size="small"
              onClick={() => {
                setDataSelected(row);
                setShowConfirmDelete(true);
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
        </>
      )
    }
  ];
  console.log(data);

  const fetchData = () => {
    api.get('tutor').then((res) => {
      setData([...res?.data?.data]);
    });
  };

  const handleDelete = () => {
    const { tutor_id } = dataSelected;
    api.delete(`tutor/${tutor_id}`).then((res) => {
      fetchData();
      setShowConfirmDelete(false);
    });
  };

  const handleSaveData = (body) => {
    const request = !body?.tutor_id
      ? api.post('tutor', body)
      : api.put(`tutor/${body.tutor_id}`, body);

    request
      .then((res) => {
        console.log(res);
        fetchData();
        setShowForm(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Quản lý Profile gia sư</title>
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
              title={'Danh sách gia sư'}
              rowKey="category_id"
              dataRows={data}
              columns={columns}
            />
          </Grid>
        </Grid>
      </Container>

      {showForm && (
        <CategoryForm
          data={dataSelected}
          isOpen={showForm}
          onSave={handleSaveData}
          onClose={() => setShowForm(false)}
          key={''}
        />
      )}

      {showConfirmDelete && (
        <ConfirmDeleteModal
          open={showConfirmDelete}
          onClose={() => setShowConfirmDelete(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

TutorProfile.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default TutorProfile;
