import { Avatar, Button, Card, Col, List, Row, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { AuthenticatedScreenLayout } from '@modulos/login/layouts/authenticated-screen.layout';
import { Link, useNavigate } from 'react-router-dom';

import { db } from '@infra/firebase';
import { onValue, ref } from "firebase/database";
import { AnyObject } from '@infra/types';
import { UserApiService } from '@infra/external-services/user-api.service';
import { TitleLoading } from '@componentes/title-loading.componente';

const { Title } = Typography;

const data2 = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
];
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];


const _userApiService = new UserApiService;

export const InicioScreen: FC = () => {
  const navigate = useNavigate();
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [user, setUser] = useState<AnyObject | null>();
  const [contatos, setContatos] = useState<Array<AnyObject>>([]);
  // console.log('ok');

  const obterDadosUsuario = async () => {
    setLoadingUser(true);
    const response = await _userApiService.obterDados();

    setUser(response?.data);
    
    setLoadingUser(false);
  };

  const obterListaContatos = () => {
    const query = ref(db, `contatos`);
    console.log(query);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (snapshot.exists()) {
        Object.values(data).map((project) => {
          setContatos((projects) => [...projects, project as AnyObject]);
        });
      }
    });
  };

  useEffect(() => {
    obterListaContatos();
    obterDadosUsuario().catch(console.error);
  }, []);

  const sairOnClick = async () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <AuthenticatedScreenLayout>
      <Row gutter={8} justify='center' align='top'>
        <Col xs={24} sm={24} md={24} lg={8} className='site-layout-background' style={{ textAlign: 'center' }}>
          <TitleLoading loading={loadingUser}>Bem vindo, {user?.nome}!</TitleLoading>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} className='site-layout-background' style={{ textAlign: 'center' }}>
          <Button type="link" onClick={sairOnClick}>Sair</Button>
        </Col>
      </Row>
      <Row gutter={8} justify='center' align='top'>
        <Col xs={8} sm={8} md={8} lg={8} className='site-layout-background' style={{ paddingBottom: 20, height: 450, borderRight: '1px solid', overflowX: 'hidden', overflowY: 'auto' }}>
          <List
            itemLayout="horizontal"
            dataSource={data2}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language..."
                />
              </List.Item>
            )}
          />
        </Col>
        <Col xs={16} sm={16} md={16} lg={16} className='site-layout-background' style={{ paddingBottom: 20, height: 450, overflowY: 'auto', overflowX: 'hidden' }}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AuthenticatedScreenLayout>
  );
};
