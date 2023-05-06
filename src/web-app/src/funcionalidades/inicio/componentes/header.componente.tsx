import { Button, Col, Row, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AnyObject } from '@infra/types';
import { UserApiService } from '@infra/external-services/user-api.service';
import { TitleLoading } from '@componentes/title-loading.componente';
import { LoginApiService } from '@infra/external-services/login-api.service';


const _loginApiService = new LoginApiService;

interface HeaderComponenteProps{
  user?: AnyObject | null;
  loading?: boolean;
}

export const HeaderComponente: FC<HeaderComponenteProps> = ({
  loading = false,
  user,
}) => {
  const navigate = useNavigate();
  const [loadingInterno, setLoadingInterno] = useState<boolean>(false);

  const sairOnClick = async () => {
    setLoadingInterno(true);
    await _loginApiService.endSession();
    localStorage.removeItem('access_token');
    navigate('/login');
    setLoadingInterno(false);
  };

  return (
    <Row gutter={8} justify='center' align='top'>
        <Col xs={24} sm={24} md={24} lg={8} className='site-layout-background' style={{ textAlign: 'center' }}>
          <TitleLoading loading={loading}>Bem vindo, {user?.nome}!</TitleLoading>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} className='site-layout-background' style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
          <Button type="primary" onClick={sairOnClick} disabled={loading || loadingInterno} loading={loading || loadingInterno}>Sair</Button>
        </Col>
    </Row>
  );
};
