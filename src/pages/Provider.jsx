import React, { useState, useMemo } from 'react';
import { Input, Row, Col, Card, Button, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const providersData = [
  {
    id: 'usb',
    title: 'USB (Mídia Física)',
    image: './src/assets/usb-image.png',
  },
];

const ProvidersList = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const navigate = useNavigate();

  // Filtra providers conforme search
  const filteredProviders = useMemo(() => {
    return providersData.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Items paginados
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProviders.slice(start, start + pageSize);
  }, [filteredProviders, currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const configureProvider = (item) => {
    navigate(`/provider/${item.id}`);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
      <Input
        placeholder="Filtrar providers"
        allowClear
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setCurrentPage(1); // Reseta paginação ao buscar
        }}
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[24, 24]} justify="center">
        {paginatedItems.map(item => (
          <Col key={item.title} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={item.title}
                  src={item.image}
                  style={{ height: 140, objectFit: 'cover' }}
                />
              }
            >
              <Meta title={item.title} />
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <Button type="primary" onClick={() => configureProvider(item)}>
                  Configurar Provider
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div
  style={{
    display: 'flex',
    justifyContent: 'center',
    marginTop: 24,
  }}
>
  <Pagination
    current={currentPage}
    pageSize={pageSize}
    total={filteredProviders.length}
    onChange={onPageChange}
  />
</div>
    </div>
  );
};

export default ProvidersList;
