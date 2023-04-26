import { Card, Col, Row, Typography } from 'antd';
import { FC } from 'react';
import { AuthenticatedScreenLayout } from '@modulos/login/layouts/authenticated-screen.layout';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export const InicioScreen: FC = () => {
  return (
    <AuthenticatedScreenLayout>
      <Row gutter={8} justify='center' align='top' style={{ marginBottom: 10 }}>
        <Col xs={24} sm={24} md={24} lg={8} className='site-layout-background' style={{ paddingBottom: 20, textAlign: 'center' }}>
          <Title data-testid="titulo-bem-vindo">Bem vindo!</Title>
        </Col>
      </Row>
      <Row gutter={8} justify='center' align='top' style={{ marginBottom: 10 }}>
        <Col xs={24} sm={24} md={24} lg={8} className='site-layout-background' style={{ paddingBottom: 20}}>
          
        </Col>
      </Row>
    </AuthenticatedScreenLayout>
  );
};
