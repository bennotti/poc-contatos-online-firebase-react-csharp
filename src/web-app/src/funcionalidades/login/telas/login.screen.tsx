import { Button, Card, Col, Form, Input, Row, Tooltip, Typography } from 'antd';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FullScreenLayout } from '@layouts/full-screen.layout';
import { AnyObject } from '@infra/types';
import { LoginApiService } from '@infra/external-services/login-api.service';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ServidorSituacaoComponente } from '../componentes/servidor/servidor-situacao.componente';
import { UsuarioNomeComponente } from '../componentes/servidor/usuario-nome.componente';

const { Title } = Typography;

const _loginApiService = new LoginApiService;

export const LoginScreen: FC = () => {
  const [formValidado, setFormValidado] = useState<boolean>(false);
  const [servidorSlugname, setServidorSlugname] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: AnyObject) => {
    setLoading(true);
    console.log(values);
    const response = await _loginApiService.autenticar(values);

    localStorage.setItem('access_token', response?.data?.accessToken);

    console.log(response);
    navigate('/');
  };

  const onSlugnameChange = async (slugname: string) => {
    setServidorSlugname(slugname);

    validaForm(await form.validateFields());
  };

  const notNullOrEmpty = (value: string): boolean => {
    return !!value && value !== '';
  };

  const validaForm = (values: AnyObject): boolean => {
    const valido = values
      && notNullOrEmpty(values.nome)
      && notNullOrEmpty(values.username)
      && notNullOrEmpty(values.servidor);

    setFormValidado(valido);

    return valido;
  };

  const onFormValuesChange = (_changedValues: AnyObject, values: AnyObject) => {
    validaForm(values);
  };

  const onUsuarioNomeChange = async () => {
    validaForm(await form.validateFields());
  };

  return (
    <FullScreenLayout className='site-layout-background'>
      <Row gutter={8}  justify='center' align='top' style={{ marginBottom: 10 }}>
        <Col xs={24} sm={24} md={24} lg={8} className='site-layout-background' style={{ paddingBottom: 20, textAlign: 'center' }}>
          <Title data-testid="titulo-bem-vindo">Bem vindo!</Title>
        </Col>
      </Row>
      <Row gutter={8} justify='center' align='top' style={{ marginBottom: 10 }}>
        <Col xs={24} sm={24} md={24} lg={8} className='site-layout-background' style={{ paddingBottom: 20}}>
        <Form
          layout={'vertical'}
          form={form}
          initialValues={{ }}
          onFinish={onFinish}
          requiredMark={false}
          onValuesChange={onFormValuesChange}
        >
          <ServidorSituacaoComponente
            form={form}
            onSlugnameChange={onSlugnameChange}
          />
          <UsuarioNomeComponente
            servidorSlugname={servidorSlugname}
            form={form}
            onChange={onUsuarioNomeChange}
          />
          <Row gutter={8} justify='center' align='top'>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Form.Item>
                <Tooltip placement="bottom" title={'Informe os dados'} open={undefined}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={!formValidado}
                    block
                  >
                    Entrar
                  </Button>
                </Tooltip>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        </Col>
      </Row>
    </FullScreenLayout>
  );
};
