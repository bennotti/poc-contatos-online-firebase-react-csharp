import { Col, Row } from 'antd';
import { FC, useEffect, useState } from 'react';
import { AuthenticatedScreenLayout } from '@modulos/login/layouts/authenticated-screen.layout';

import { HeaderComponente } from '../componentes/header.componente';
import { ContatosGlobalComponente } from '../componentes/contatos-global.componente';
import { ContatosComponente } from '../componentes/contatos.componente';
import { AnyObject } from '@infra/types';
import { UserApiService } from '@infra/external-services/user-api.service';

const _userApiService = new UserApiService;

export const InicioScreen: FC = () => {
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [user, setUser] = useState<AnyObject | null>();
  // const [contatos, setContatos] = useState<Array<AnyObject>>([]);
  // console.log('ok');

  const obterDadosUsuario = async () => {
    setLoadingUser(true);
    const response = await _userApiService.obterDados();

    setUser(response?.data);
    
    setLoadingUser(false);
  };

  useEffect(() => {
    obterDadosUsuario().catch(console.error);
  }, []);

  return (
    <AuthenticatedScreenLayout>
      <HeaderComponente user={user} loading={loadingUser}/>
      <Row gutter={8} justify='center' align='top' style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Col xs={12} sm={12} md={12} lg={12} className='site-layout-background' style={{ paddingBottom: 20, height: 450, borderRight: '1px solid', overflowX: 'hidden', overflowY: 'auto' }}>
          <ContatosGlobalComponente user={user}/>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className='site-layout-background' style={{ paddingBottom: 20, height: 450, overflowY: 'auto', overflowX: 'hidden' }}>
          <ContatosComponente user={user}/>
        </Col>
      </Row>
    </AuthenticatedScreenLayout>
  );
};
