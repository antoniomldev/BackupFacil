import React, { useState } from 'react';
import { Table, Empty } from 'antd';

const columns = [
  {
    title: 'Nome do Arquivo',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Data e Horário',
    dataIndex: 'backupDate',
    key: 'backupDate',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

const LogsTable = () => {
  const [files, setFiles] = useState([]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 16px 0',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth: 900 }}>
        <Table
          dataSource={files}
          columns={columns}
          rowKey="path"
          scroll={{ x: 'max-content' }}
          locale={{
                      emptyText: (
                        <Empty
                          description={<h3 style={{ marginBottom: 0 }}>Sem dados ainda</h3>}
                        />
                      ),
        }}
        />
      </div>
    </div>
  );
};

export default LogsTable;
