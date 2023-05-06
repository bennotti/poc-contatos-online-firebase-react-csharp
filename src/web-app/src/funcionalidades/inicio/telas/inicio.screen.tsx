import { Col, Row } from 'antd';
import { FC } from 'react';
import { AuthenticatedScreenLayout } from '@modulos/login/layouts/authenticated-screen.layout';

import { HeaderComponente } from '../componentes/header.componente';
import { ContatosGlobalComponente } from '../componentes/contatos-global.componente';
import { ContatosComponente } from '../componentes/contatos.componente';


export const InicioScreen: FC = () => {
  return (
    <AuthenticatedScreenLayout>
      <HeaderComponente/>
      <Row gutter={8} justify='center' align='top'>
        <Col xs={12} sm={12} md={12} lg={12} className='site-layout-background' style={{ paddingBottom: 20, height: 450, borderRight: '1px solid', overflowX: 'hidden', overflowY: 'auto' }}>
          <ContatosGlobalComponente/>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className='site-layout-background' style={{ paddingBottom: 20, height: 450, overflowY: 'auto', overflowX: 'hidden' }}>
          <ContatosComponente />
        </Col>
      </Row>
    </AuthenticatedScreenLayout>
  );
};
