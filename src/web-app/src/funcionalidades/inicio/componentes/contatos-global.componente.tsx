import { Avatar, Badge, Button, Card, Col, List, Row, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { AuthenticatedScreenLayout } from '@modulos/login/layouts/authenticated-screen.layout';
import { Link, useNavigate } from 'react-router-dom';

import { AnyObject } from '@infra/types';
import { UserApiService } from '@infra/external-services/user-api.service';
import { TitleLoading } from '@componentes/title-loading.componente';
import { LoginApiService } from '@infra/external-services/login-api.service';
import { ContatoApiService } from '@infra/external-services/contato-api.service';
import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { AvatarStatusContatoComponente } from './avatar-status-contato.componente';
import { onChildChanged, ref } from 'firebase/database';
import { db } from '@infra/firebase';

const { Title } = Typography;

const _userApiService = new UserApiService;
const _loginApiService = new LoginApiService;
const _contatoApiService = new ContatoApiService;

interface ContatosGlobalComponenteProps{
  user?: AnyObject | null;
}

export const ContatosGlobalComponente: FC<ContatosGlobalComponenteProps> = ({
  user,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [contatos, setContatos] = useState<Array<AnyObject>>([]);

  const obterContatosGlobal = async (showLoading: boolean = true) => {
    if (showLoading) setLoading(true);
    if (!user) {
      return;
    }

    const response = await _contatoApiService.listarDisponiveis();

    setContatos(response?.records ?? []);

    if (showLoading) setLoading(false);
  };

  if (user) {
    onChildChanged(ref(db, `${user.servidor}`), () => {
      obterContatosGlobal(false).catch(console.error);
    });
  }

  useEffect(() => {
    obterContatosGlobal().catch(console.error);
  }, [user]);


  const renderIcone = (item: AnyObject) => {
    if (!item.favorito) {
      return (
        <>
          <StarOutlined />
        </>
      );
    }
    return (
      <>
        <StarFilled />
      </>
    );
  };

  const favoritarDesfavoritar = async (item: AnyObject) => {
    await _contatoApiService.favoritarDesfavoritar(item);
  };

  const renderActions = (item: AnyObject) => {
    if (item.username == user?.username) {
      return []
    }
    return [
      <Button
        key="favoritar-desfavoritar"
        onClick={async () => favoritarDesfavoritar(item)}
        loading={item.loading ?? false}
      >
        {renderIcone(item)}
      </Button>];
  }

  return (
    <>
      <Title style={{ textAlign: 'center' }}>Global</Title>
      <List
        loading={!user || loading}
        itemLayout="horizontal"
        dataSource={contatos}
        renderItem={(item, index) => (
          <List.Item
            actions={renderActions(item)}
          >
            <List.Item.Meta
              avatar={<AvatarStatusContatoComponente item={item} />}
              title={item.nome}
              description={item.username}
            />
          </List.Item>
        )}
      />
    </>
  );
};
