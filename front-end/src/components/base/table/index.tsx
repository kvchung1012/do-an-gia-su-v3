import ProTable from '@ant-design/pro-table';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

function MyTable({dataRows,columns, title, rowKey, createText, onCreateData}) {

  const [data, setData] = useState(dataRows);
  
  const handleTableChange = (pagination, filters, sorter) => {
    let dataSort = [...data];
    setData([...dataSort.sort((a,b) => (a[sorter.field] > b[sorter.field]) ? 1 : ((b[sorter.field] > a[sorter.field]) ? -1 : 0))]);
  };

  useEffect(()=>{
    setData(dataRows)
  },[dataRows])

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
                pageSize: 10,
                pageSizeOptions: [10, 20, 50],
                showSizeChanger:true,
                responsive: true,
                showTotal: (total, range) => (
                  <div>{`Showing ${range[0]}-${range[1]} of ${total} total items`}</div>
                ),
              }}
            />
    </div>
  )
}

export default MyTable