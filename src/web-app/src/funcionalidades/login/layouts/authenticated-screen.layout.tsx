import { Layout, Menu, FloatButton, Affix, Button, Typography, Image, Row, Col } from 'antd';
import { FC, ReactNode } from 'react';
import type { MenuProps } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const { Content, Sider, Footer, Header } = Layout;
const { Title } = Typography;

export interface AuthenticatedScreenLayoutProps {
  children: ReactNode;
  title?: string;
}

export const AuthenticatedScreenLayout: FC<AuthenticatedScreenLayoutProps> = ({ 
  children,
  title = ''
}) => {
  return (
    <Layout
      style={{ minHeight: '100vh', maxWidth: '100vw', overflowY: 'hidden' }}
      hasSider
    >
      <Layout className="site-l1ayout">
        <Content style={{ padding: '1em', background: '#fff', height: '100%', overflow: 'initial', overflowY: 'hidden' }}>
          <Affix offsetTop={0}>
            <Title level={2} style={{ marginTop: '0' }}>{title}</Title>
          </Affix>
          {children}
        </Content>
        <FloatButton.BackTop />
        <Affix offsetBottom={0}>
          <Footer style={{ background: '#fff', textAlign: 'center' }}>Poc Firebase React</Footer>
        </Affix>
      </Layout>
    </Layout>
  );
};
