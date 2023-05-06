import { Button, Col, Row, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AnyObject } from '@infra/types';
import { UserApiService } from '@infra/external-services/user-api.service';
import { TitleLoading } from '@componentes/title-loading.componente';
import { LoginApiService } from '@infra/external-services/login-api.service';


const _userApiService = new UserApiService;
const _loginApiService = new LoginApiService;

export const HeaderComponente: FC = () => {
  const navigate = useNavigate();
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

  const sairOnClick = async () => {
    await _loginApiService.endSession();
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <Row gutter={8} justify='center' align='top'>
        <Col xs={24} sm={24} md={24} lg={8} className='site-layout-background' style={{ textAlign: 'center' }}>
          <TitleLoading loading={loadingUser}>Bem vindo, {user?.nome}!</TitleLoading>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} className='site-layout-background' style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
          <Button type="primary" onClick={sairOnClick}>Sair</Button>
        </Col>
    </Row>
  );
};
