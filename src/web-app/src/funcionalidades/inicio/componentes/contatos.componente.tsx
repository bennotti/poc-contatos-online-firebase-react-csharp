import { Avatar, Button, Card, Col, List, Row, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';
import { AuthenticatedScreenLayout } from '@modulos/login/layouts/authenticated-screen.layout';
import { Link, useNavigate } from 'react-router-dom';

import { AnyObject } from '@infra/types';
import { UserApiService } from '@infra/external-services/user-api.service';
import { TitleLoading } from '@componentes/title-loading.componente';
import { LoginApiService } from '@infra/external-services/login-api.service';
import { ContatoApiService } from '@infra/external-services/contato-api.service';
import { AvatarStatusContatoComponente } from './avatar-status-contato.componente';
import { StarFilled } from '@ant-design/icons';
import { onChildChanged, ref } from 'firebase/database';
import { db } from '@infra/firebase';

const { Title } = Typography;

const _userApiService = new UserApiService;
const _loginApiService = new LoginApiService;
const _contatoApiService = new ContatoApiService;

interface ContatosComponenteProps{
  user?: AnyObject | null;
}

export const ContatosComponente: FC<ContatosComponenteProps> = ({
  user,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [contatos, setContatos] = useState<Array<AnyObject>>([]);

  const obterListaContatos = async (showLoading: boolean = true) => {
    if (showLoading) setLoading(true);
    if (!user) {
      return;
    }
    const response = await _contatoApiService.favoritos();

    setContatos(response?.records ?? []);
    
    if (showLoading) setLoading(false);
  };

  if (user) {
    onChildChanged(ref(db, `${user.servidor}`), () => {
      obterListaContatos(false).catch(console.error);
    });
  }

  useEffect(() => {
    obterListaContatos().catch(console.error);
  }, [user]);

  const favoritarDesfavoritar = async (item: AnyObject) => {
    await _contatoApiService.favoritarDesfavoritar(item);
  };

  return (
    <>
      <Title style={{ textAlign: 'center' }}>Favoritos</Title>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={contatos}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                key="removerFavoritos"
                onClick={async () => favoritarDesfavoritar(item)}
              >
                <StarFilled />
              </Button>
            ]}
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
