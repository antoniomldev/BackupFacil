import React, { useState, useEffect } from 'react';
import { Button, Table, Empty } from 'antd';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [dado, setDado] = useState()
  

  const columns = [
    {
      title: 'Nome do Arquivo',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Caminho',
      dataIndex: 'path',
      key: 'path',
    },
  ];


  return (
    <>
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 16px 0',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth: 900 }}>
        <Button
          type="primary"
          onClick={chooseDirectory}
          style={{ marginBottom: 16, height: 50, width: '100%' }}
        >
          Selecione um diretório
        </Button>

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
    </>
  );
};

export default Home;
