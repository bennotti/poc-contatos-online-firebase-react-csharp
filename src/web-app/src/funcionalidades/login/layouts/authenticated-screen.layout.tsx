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
      style={{ maxWidth: '100vw', overflow: 'hidden' }}
    >
      <Layout className="site-l1ayout" style={{ overflow: 'hidden' }}>
        <Content style={{ overflow: 'hidden' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
