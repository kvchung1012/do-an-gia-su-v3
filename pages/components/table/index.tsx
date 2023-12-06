import api from '@/api';
import ProTable from '@ant-design/pro-table';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

function MyTable({url,columns, title, rowKey, createText, onCreateData}) {

  const [dataRoot, setDataRoot] = useState([]);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    api.get(url).then((res) => {
      setData([...res?.data?.data])
      setDataRoot([...res?.data?.data])
    });
  }, []);
  
  const handleTableChange = (pagination, filters, sorter) => {
    let dataSort = [...data];
    setData([...dataSort.sort((a,b) => (a[sorter.field] > b[sorter.field]) ? 1 : ((b[sorter.field] > a[sorter.field]) ? -1 : 0))]);
  };

  return (
    <div>
      <ProTable
              headerTitle={title}
              dataSource={data}
              rowKey={rowKey}
              search={false}
              toolBarRender={() =>
                  [
                      createText && 
                      <Button key="primary" 
                              color="primary" 
                              type="button" 
                              variant="contained"
                              onClick={onCreateData}>
                        {createText}
                      </Button>
                  ]
              }
              onChange={handleTableChange}
              columns={columns}
              pagination={{
                total: data.length,
                pageSize: 2,
                pageSizeOptions: [10, 20, 50],
                showSizeChanger:true,
                responsive: true,
              }}
            />
    </div>
  )
}

export default MyTable