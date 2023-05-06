import { Avatar, Button, Card, Col, List, Row, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { AuthenticatedScreenLayout } from '@modulos/login/layouts/authenticated-screen.layout';
import { Link, useNavigate } from 'react-router-dom';

import { AnyObject } from '@infra/types';
import { UserApiService } from '@infra/external-services/user-api.service';
import { TitleLoading } from '@componentes/title-loading.componente';
import { LoginApiService } from '@infra/external-services/login-api.service';
import { ContatoApiService } from '@infra/external-services/contato-api.service';

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
const _loginApiService = new LoginApiService;
const _contatoApiService = new ContatoApiService;

export const ContatosGlobalComponente: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [contatos, setContatos] = useState<Array<AnyObject>>([]);

  const obterContatosGlobal = async () => {
    setLoading(true);
    const response = await _contatoApiService.listarDisponiveis();

    setContatos(response?.records ?? []);

    console.log(response);

    setLoading(false);
    // const query = ref(db, `contatos`);
    // console.log(query);
    // return onValue(query, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log(data);
    //   if (snapshot.exists()) {
    //     Object.values(data).map((project) => {
    //       setContatos((projects) => [...projects, project as AnyObject]);
    //     });
    //   }
    // });
  };

  useEffect(() => {
    obterContatosGlobal().catch(console.error);
  }, []);

  return (
    <>
      <Title style={{ textAlign: 'center' }}>Global</Title>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={contatos}
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
    </>
  );
};
