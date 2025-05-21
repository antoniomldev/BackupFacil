import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  FileProtectOutlined,
  ApiOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

const { Header, Content } = Layout;

const menuItems = [
  {
    key: '/home',
    icon: <HomeOutlined />,
    label: 'Início',
  },
  {
    key: '/logs',
    icon: <FileProtectOutlined />,
    label: 'Logs',
  },
  {
    key: '/provider',
    icon: <ApiOutlined />,
    label: 'Providers',
  },
  {
    key: '/config',
    icon: <SettingOutlined />,
    label: 'Configuração',
  },
];

const LayoutBase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  const handleClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <Menu
          mode="horizontal"
          selectedKeys={[current]}
          items={menuItems}
          onClick={handleClick}
        />
      </Header>
      <Content style={{ paddingTop: 24, paddingInline: 24 }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LayoutBase;
