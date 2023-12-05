import api from '@/api';
import ProTable from '@ant-design/pro-table';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

function MyTable({url,columns, title, rowKey, createText, onCreateData}) {
  
  const [data, setData] = useState([]);
  
  useEffect(() => {
    api.get(url).then((res) => {
      setData(res.data?.data)
    });
  }, []);
  
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
              columns={columns}
              scroll={{ y: 600 }}
              pagination={{
                total: data.length,
                pageSize: 10,
                pageSizeOptions: [10, 20, 50]
              }}
            />
    </div>
  )
}

export default MyTable